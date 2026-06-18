from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import urllib.parse

app = Flask(__name__)
CORS(app)

def analyze_url(url):
    reasons = []
    is_suspicious = False

    # 1. Check for missing scheme
    if not url.startswith('http://') and not url.startswith('https://'):
        # For analysis purposes, we assume http if missing to check the rest,
        # but the lack of scheme is a red flag itself for user input.
        url = 'http://' + url

    parsed_url = urllib.parse.urlparse(url)

    # 2. Check for HTTP instead of HTTPS
    if parsed_url.scheme == 'http':
        is_suspicious = True
        reasons.append("Uses HTTP instead of HTTPS (unencrypted connection)")

    # 3. Check for '@' symbol in URL
    if '@' in url:
        is_suspicious = True
        reasons.append("Contains '@' symbol, which can hide the true destination")

    # 4. Check URL length
    if len(url) > 75:
        is_suspicious = True
        reasons.append("URL length is unusually long (>75 characters)")

    # 5. Check for suspicious keywords
    suspicious_keywords = ['login', 'verify', 'bank', 'secure', 'account', 'update', 'credential', 'auth']
    url_lower = url.lower()
    found_keywords = [kw for kw in suspicious_keywords if kw in url_lower]
    
    if found_keywords:
        is_suspicious = True
        reasons.append(f"Contains suspicious keywords: {', '.join(found_keywords)}")

    status = "suspicious" if is_suspicious else "safe"
    
    return {
        "status": status,
        "reasons": reasons
    }

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    url = data.get('url', '')
    
    if not url:
        return jsonify({"error": "No URL provided"}), 400
        
    result = analyze_url(url)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
