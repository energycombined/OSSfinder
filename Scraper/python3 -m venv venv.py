import pandas as pd
import requests
from bs4 import BeautifulSoup
import json 
from datetime import datetime


# Load the CSV file
file_path = "listing_data.csv"  # Replace with your actual file path
data = pd.read_csv(file_path,on_bad_lines="skip",delimiter=';')
# columns = [';id;name;organisation;url;website;description;license;latest_update;language;last_commit;open_pull_requests;raw_details;master_branch;is_fork;forked_from']

# Define functions to classify themes and subthemes
def classify_theme(description):
    if pd.isna(description):
        return "Uncategorized"
    desc_lower = description.lower()
    if "simulation" in desc_lower or "modeling" in desc_lower:
        return "Simulation/Modeling"
    elif "analysis" in desc_lower or "assessment" in desc_lower:
        return "Analysis/Assessment"
    elif "tool" in desc_lower or "library" in desc_lower:
        return "Tools/Libraries"
    elif "extension" in desc_lower or "browser" in desc_lower:
        return "Extensions/Browsers"
    elif "package" in desc_lower or "framework" in desc_lower:
        return "Packages/Frameworks"
    elif "data" in desc_lower or "processing" in desc_lower:
        return "Data Processing"
    elif "visualization" in desc_lower or "graph" in desc_lower:
        return "Visualization"
    elif "climate" in desc_lower or "environment" in desc_lower:
        return "Climate/Environmental Science"
    elif "energy" in desc_lower or "grid" in desc_lower:
        return "Energy Systems"
    elif "security" in desc_lower or "iam" in desc_lower:
        return "Security/Identity"
    else:
        return "Other"

def classify_subtheme(description):
    if pd.isna(description):
        return "Unspecified"
    desc_lower = description.lower()
    if "wind" in desc_lower or "weather" in desc_lower:
        return "Meteorological Tools"
    elif "ai" in desc_lower or "machine learning" in desc_lower:
        return "AI/Machine Learning"
    elif "visualization" in desc_lower or "charts" in desc_lower:
        return "Data Visualization"
    elif "storage" in desc_lower or "database" in desc_lower:
        return "Data Storage/Databases"
    elif "security" in desc_lower or "identity" in desc_lower:
        return "Cybersecurity/Identity Management"
    elif "grid" in desc_lower or "energy" in desc_lower:
        return "Grid Management"
    elif "simulation" in desc_lower:
        return "Simulation Frameworks"
    elif "environment" in desc_lower or "climate" in desc_lower:
        return "Environmental Tools"
    else:
        return "General Tools"

# Apply classification to the dataset
data['theme'] = data['description'].apply(classify_theme)
data['subtheme'] = data['description'].apply(classify_subtheme)

# Save the updated dataset with themes and subthemes
output_path = "classified_dataset.csv"  # Replace with your desired output path
data.to_csv(output_path, index=False)

# print(f"Dataset with themes and subthemes saved to {output_path}")
# print(data.head())

# Function to infer theme and subtheme based on URL
def infer_theme_from_readme(url):
    if pd.isna(url):
        return "Uncategorized", "Unspecified"
    # Add logic here to process the URL and infer theme and subtheme
    if "climate" in url.lower():
        return "Climate/Environmental Science", "Environmental Tools"
    elif "grid" in url.lower():
        return "Energy Systems", "Grid Management Tools"
    elif "security" in url.lower():
        return "Security/Identity", "Identity Management"
    else:
        return "Uncategorized", "Unspecified"

# Apply the function to rows where the theme or subtheme is missing
missing_theme_data = data[
    (data['theme'] == "Uncategorized") | (data['subtheme'] == "Unspecified")
]
missing_theme_data[['theme', 'subtheme']] = missing_theme_data['url'].apply(
    lambda x: pd.Series(infer_theme_from_readme(x))
)

# Update the original dataset
data.update(missing_theme_data)

# # Save the updated dataset
# output_path = "updated_dataset.csv"  # Replace with your desired output path
# data.to_csv(output_path, index=False,sep=";")

# print(f"Updated dataset saved to {output_path}")

# Iterate over the list and scrape each repository
scraped_data = []

# Define scraping functions
def scrape_github_readme(url):
    """
    Scrape README content from a GitHub repository.
    """
    try:
        response = requests.get(url,timeout=60)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')

        # Scrape README content
        readme_section = soup.find('article', {'class': 'markdown-body entry-content container-lg'})
        readme_content = readme_section.get_text(strip=True) if readme_section else "No README content available"
    
        # Scrape total commits
        commits_element = soup.find('a', {'href': lambda x: x and '/commits' in x})
        if commits_element:
            # Extract only the numeric part
            total_commits = ''.join(filter(str.isdigit, commits_element.get_text(strip=True)))
        else:
            total_commits = "Unknown"
        # Scrape last commit date
        last_commit_date_element = soup.find('relative-time')
        last_commit_date = last_commit_date_element['datetime'] if last_commit_date_element else "Unknown"

        return {
            "README Content": readme_content,
            "Total Commits": total_commits,
            "Last Commit Date": last_commit_date
        }
    except requests.exceptions.Timeout:
        return f"Error: Request timed out for {url}"
    except Exception as e:
        return f"Error scraping GitHub URL: {url}. Error: {str(e)}"

def scrape_gitlab_readme(url):
    """
    Scrape README content from a GitLab repository.
    """
    try:
        response = requests.get(url, timeout=60)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        possible_classes = [
            'home-panel-description-markdown read-more-container',  # Identified by you
            'readme-holder',  # Common for GitLab README sections
            'description',  # Fallback for repository description
            'file-holder limited-width-container readme-holder',
        ]
        # Search for README content using possible classes
        readme_content = None
        for class_name in possible_classes:
            readme_section = soup.find('div', {'class': class_name})
            if readme_section:
                readme_content = readme_section.get_text(strip=True)
                break
                
        if not readme_content:
            readme_content = "No README content available"

             # Scrape total commits
        commits_block = soup.find('div', {'class': 'project-page-sidebar-block gl-py-4 gl-border-b gl-border-b-subtle'})
        if commits_block:
            commits_element = commits_block.find('a', {'href': lambda x: x and '/commits/' in x})
            if commits_element:
                # Extract only the numeric part
                total_commits = ''.join(filter(str.isdigit, commits_element.get_text(strip=True)))
            else:
                total_commits = "Unknown"
        else:
            total_commits = "Unknown"


    # Locate the tree-holder and navigate to the specific nested structure
        last_commit_date = "Unknown"
        commit_content_div = soup.find('div', {'data-testid': 'commit-content', 'class': 'commit-content gl-inline-flex gl-w-full gl-flex-wrap gl-items-baseline'})
        if commit_content_div:
            committer_div = commit_content_div.find('div', {'data-testid': 'committer', 'class': 'committer gl-basis-full gl-truncate gl-text-sm'})
            if committer_div:
                time_element = committer_div.find('time')
                if time_element and time_element.get('datetime'):
                    last_commit_date = time_element['datetime']

        return {
            "README Content": readme_content,
            "Total Commits": total_commits,
            "Last Commit Date": last_commit_date
        }
    
    except requests.exceptions.Timeout:
        return f"Error: Request timed out for {url}"    
    except Exception as e:
        return f"Error scraping GitLab URL: {url}. Error: {str(e)}"

def scrape_repository(url):
    """
    Scrape a repository (GitHub or GitLab) for README content.
    """
    if "github" in url:
        return scrape_github_readme(url)
    elif "gitlab" in url:
        return scrape_gitlab_readme(url)
    else:
        return "Unsupported repository platform"

# List of URLs
github_gitlab_urls = data['url'].dropna().tolist()
top_10_urls = github_gitlab_urls[60:70]
github_gitlab_urls = top_10_urls
# github_gitlab_urls = ['https://gitlab.awi.de/sicopolis/sicopolis','https://github.com/FlexMeasures/flexmeasures','https://gitlab.com/SmartGridToolbox/SmartGridToolbox','https://github.com/Deltares/pyflwdir']

total_urls = len(github_gitlab_urls)

for index, url in enumerate(github_gitlab_urls, start=1):
    # Display progress in the terminal
    print(f"Scraping {index}/{total_urls}: {url}")
    
    # Call the scraping function
    content = scrape_repository(url)
    scraped_data.append({
        "url": url,
        "README Content": content.get("README Content", "Unknown"),
        "Total Commits": content.get("Total Commits", "Unknown"),
        "Last Commit Date": content.get("Last Commit Date", "Unknown")
    })

# if index % 100 == 0:
#         with open("progress.json", "w") as f:
#             json.dump(scraped_data, f)
#         print(f"Progress saved up to index {index}")
#         time.sleep(1)  # Avoid overwhelming the server

# Display or process the results
for repo in scraped_data:
    print(f"url: {repo['url']}")
    print(f"README Content:\n{repo['README Content']}")
    # print(f"Total Commits: {repo['Total Commits']}")
    # print(f"Last Commit Date: {repo['Last Commit Date']}\n")


# Ensure the scraped data is a DataFrame
scraped_data_df = pd.DataFrame(scraped_data)

# Align the scraped data with the existing dataset
# Merge scraped_data_df with data using the "URL" column
aligned_data = data.merge(scraped_data_df, on="url", how="left")

data['README Content'] = aligned_data['README Content']
data['Total Commits'] = aligned_data['Total Commits']
data['Last Commit Date'] = aligned_data['Last Commit Date']

# Save the updated dataset with all new data
output_path = "final_updated_dataset.csv"
data.to_csv(output_path, index=False, sep=';')

print(f"Dataset with scraped data added and saved to {output_path}")
