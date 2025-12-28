from flask import Flask, request, jsonify, render_template
from groq import Groq

app = Flask(__name__)

client = Groq(api_key="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")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "You are a helpful beginner chatbot."},
            {"role": "user", "content": user_message}
        ]
    )

    reply = completion.choices[0].message.content
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True)
