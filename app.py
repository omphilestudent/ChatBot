from flask import Flask, request, jsonify
import ollama  # install with: pip install ollama

app = Flask(__name__)

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json['message']
    try:
        response = ollama.chat(
            model='llama3',  # or 'mistral', 'llama2', etc.
            messages=[{"role": "user", "content": user_input}]
        )
        return jsonify({'response': response['message']['content']})
    except Exception as e:
        return jsonify({'response': "Oops! Something went wrong."}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000);
