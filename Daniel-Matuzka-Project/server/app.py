from flask import Flask, request, jsonify
import spotipy
from flask_cors import CORS
import requests
import base64
import random

app = Flask(__name__)
CORS(app)

CLIENT_ID = '52421b5b26f5475c9a5a1697daa59bf3'
CLIENT_SECRET = 'f3f6952b56534cd6809b5fb416e75dd9'

def get_access_token():
    # Base64 encode the client ID and client secret
    client_credentials = f"{CLIENT_ID}:{CLIENT_SECRET}"
    client_credentials_base64 = base64.b64encode(client_credentials.encode()).decode()

    # Request the access token
    token_url = 'https://accounts.spotify.com/api/token'
    headers = {
        'Authorization': f'Basic {client_credentials_base64}'
    }
    data = {
        'grant_type': 'client_credentials'
    }
    
    response = requests.post(token_url, data=data, headers=headers)

    if response.status_code == 200:
        return response.json()['access_token']
    else:
        print("Error obtaining access token:", response.json())
        return None

@app.route('/', methods=['POST'])
def get_recommendations():
    try:
        data = request.json
        mood = data['mood']

        # Get valence and energy values for the given mood
        mood_attributes = {
            'happy': {'valence': 0.8, 'energy': 0.7, 'target_mode': 1, 'target_loudness': -8.0, 'target_acousticness': 0.3},
            'sad': {'valence': 0.2, 'energy': 0.3, 'target_mode': 0, 'target_loudness': -15.0, 'target_acousticness': 0.8},
            'angry': {'valence': 0.3, 'energy': 0.9, 'target_mode': 1, 'target_loudness': -5.0, 'target_acousticness': 0.1 },
        }
        attributes = mood_attributes.get(mood, {'valence': 0.5, 'energy': 0.5})

        # Get the access token
        access_token = get_access_token()
        if not access_token:
            return jsonify({'error': 'Failed to obtain access token'}), 500
          
        # Initialize Spotify API with the access token
        sp = spotipy.Spotify(auth=access_token)

        try:
            recommendations = sp.recommendations(
                seed_genres=['pop', 'rock', 'hip-hop', 'alternative', 'r-n-b'],  # Provide a default genre
                limit=50,  # Fetch more songs to increase randomness
                target_valence=attributes['valence'],
                target_energy=attributes['energy'],
                target_mode=attributes['target_mode'],
                target_loudness=attributes['target_loudness'],
                target_acousticness=attributes['target_acousticness']
            )
        except Exception as e:
            print("Error fetching recommendations:", e)
            return jsonify({'error': str(e)}), 500
        
        if not recommendations or 'tracks' not in recommendations:
            return jsonify({'error': 'No recommendations found'}), 404

        unique_songs = []
        track_ids = set()
        for track in recommendations['tracks']:
            song_info = {
                'name': track['name'],
                'artist': track['artists'][0]['name'],
                'image': track['album']['images'][0]['url']
            }
            track_ids.add(track['id'])
            unique_songs.append(song_info)

        # Ensure we only select 5 unique songs
        random.shuffle(unique_songs)  # Shuffle to ensure randomness
        selected_songs = unique_songs[:5]

        return jsonify({'songs': selected_songs})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
