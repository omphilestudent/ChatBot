import os

from flask import Flask, jsonify, request
from flask_cors import CORS
import ollama

app = Flask(__name__)

frontend_origin = os.getenv('CORS_ORIGIN', 'http://localhost:5173')
CORS(app, resources={r"/*": {"origins": [frontend_origin]}})

OLLAMA_MODEL = os.getenv('OLLAMA_MODEL', 'llama3')


@app.get('/health')
def health() -> tuple[dict[str, str], int]:
    return {'status': 'ok', 'model': OLLAMA_MODEL}, 200


@app.post('/chat')
def chat() -> tuple[dict[str, str], int]:
    payload = request.get_json(silent=True) or {}
    user_input = str(payload.get('message', '')).strip()

    if not user_input:
        return {'response': 'Please provide a message.'}, 400

    try:
        response = ollama.chat(
            model=OLLAMA_MODEL,
            messages=[{'role': 'user', 'content': user_input}],
        )
        content = response.get('message', {}).get('content', '')
        return {'response': content or 'No response returned by model.'}, 200
    except Exception:
        return {'response': 'Oops! Backend could not reach Ollama.'}, 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv('FLASK_PORT', '5000')))
