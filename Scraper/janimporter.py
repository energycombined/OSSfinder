import requests
import pandas as pd
import json

# Load the dataset
input_path = "final_updated_dataset.csv"
data = pd.read_csv(input_path, delimiter=';')

# Function to split text into chunks
def chunk_text(text, chunk_size=1000):
    words = text.split()
    chunks = []
    current_chunk = []

    for word in words:
        current_chunk.append(word)
        if len(' '.join(current_chunk)) > chunk_size:
            chunks.append(' '.join(current_chunk))
            current_chunk = []

    if current_chunk:
        chunks.append(' '.join(current_chunk))

    return chunks

# Function to analyze text using Jan.ai's API
def analyze_with_llm(chunk):
    url = "http://127.0.0.1:1337/v1/chat/completions"  # Jan.ai's local API endpoint
    headers = {
    }
    data = {
        "model": "llama3-hermes-8b",  # Specify the LLaMA model
        "messages": [
            {"role": "system", "content": "You are an assistant trained to analyze GitHub repositories."},
            {"role": "user", "content": f"Analyze the following README content and return the results as JSON with keys: 'Theme', 'Subtheme', 'Type of Company', and 'Typical Use Cases'. Each key should have a list of strings as its value.\n\nContent:\n{chunk}"}
        ]
    }

    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()
        return response.json()['choices'][0]['message']['content']
    except requests.RequestException as e:
        return f"Error analyzing chunk: {str(e)}"

# Prepare for analysis
chunked_readme_contents = {}
for _, row in data.iterrows():
    if pd.notna(row['description']) and row['description'] != "Unknown":
        chunked_readme_contents[row['url']] = chunk_text(row['description'])

# Analyze each chunk of each README
results = []
for url, chunks in chunked_readme_contents.items():
    combined_analysis = {
        "url": url,
        "Theme": [],
        "Subtheme": [],
        "Type of Company": [],
        "Typical Use Cases": []
    }
    for chunk in chunks:
        analysis = analyze_with_llm(chunk)
        try:
            analysis_json = json.loads(analysis)
            combined_analysis["Theme"].extend(analysis_json.get("Theme", []))
            combined_analysis["Subtheme"].extend(analysis_json.get("Subtheme", []))
            combined_analysis["Type of Company"].extend(analysis_json.get("Type of Company", []))
            combined_analysis["Typical Use Cases"].extend(analysis_json.get("Typical Use Cases", []))
        except json.JSONDecodeError:
            print(f"Failed to decode JSON for URL {url}: {analysis}")

    # Remove duplicates
    combined_analysis["Theme"] = list(set(combined_analysis["Theme"]))
    combined_analysis["Subtheme"] = list(set(combined_analysis["Subtheme"]))
    combined_analysis["Type of Company"] = list(set(combined_analysis["Type of Company"]))
    combined_analysis["Typical Use Cases"] = list(set(combined_analysis["Typical Use Cases"]))

    results.append(combined_analysis)

# Create a DataFrame with the structured results
analysis_df = pd.DataFrame(results)

# Merge structured results with original dataset
merged_data = pd.merge(data, analysis_df, on='url', how='left')

# Save the updated dataset
output_path = "github_analysis_with_readme_structured.csv"
merged_data.to_csv(output_path, index=False, sep=';')

print(f"Structured dataset saved to {output_path}")
