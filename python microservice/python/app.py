import os
import json
from flask import Flask, request, jsonify
import spacy
from telethon import TelegramClient
from telethon.tl.functions.channels import GetFullChannelRequest

# Initialize Flask app
app = Flask(__name__)

# Load pre-trained NLP model
nlp = spacy.load("en_core_web_sm")

# Example drug-related keywords (can be expanded)
DRUG_KEYWORDS = ["drug", "cocaine", "heroin", "marijuana", "meth", "weed","opioid","pills","pill","methadone","schizophrenia","Cannabis","Ecstasy","Methamphetamine"]

api_id=""
api_hash=""
# Function to check for drug-related activity in message text
def is_drug_related(text):
    doc = nlp(text)
    for token in doc:
        if token.lemma_.lower() in DRUG_KEYWORDS:
            return True
    return False

# Route to scrape multiple channels and analyze them
@app.route('/scrape_channels', methods=['POST'])
async def scrape_channels():
    data = request.get_json()

    # Extract API credentials and list of channels from the request
    # api_id = data.get('api_id')
    # api_hash = data.get('api_hash')
    channels = data.get('channels')

    if not api_id or not api_hash or not channels:
        return jsonify({"error": "API ID, API Hash, and a list of channels are required"}), 400
    
    try:
        # Connect to Telegram client
        client = TelegramClient('session_name', api_id, api_hash)
        await client.start()

        # List to hold analyzed data
        analyzed_channels = []

        # Iterate over each channel to scrape and analyze messages
        for channel_name in channels:
            try:
                # Get channel info (including total users)
                full_channel = await client(GetFullChannelRequest(channel=channel_name))
                channel_info = full_channel.full_chat
                total_users = channel_info.participants_count

                # Analyze messages for drug-related content
                drug_related = False
                async for message in client.iter_messages(channel_name):
                    if message.text and is_drug_related(message.text):
                        drug_related = True
                        break

                # Append the result for this channel
                analyzed_channels.append({
                    "channel_name": channel_name,
                    "total_users": total_users,
                    "drug_related": "yes" if drug_related else "no"
                })

            except Exception as e:
                analyzed_channels.append({
                    "channel_name": channel_name,
                    "error": str(e)
                })

        # Send the scraped and analyzed data to backend
        return jsonify({"channels": analyzed_channels})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
