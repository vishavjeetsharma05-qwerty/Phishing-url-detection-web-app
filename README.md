🛡️ Phishing URL Detection Web App
![Cyber Security](https://img.shields.io/badge/Security-Phishing_Detection-blue)
![Python](https://img.shields.io/badge/Backend-Python_Flask-green)
![Frontend](https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-orange)
A web-based cybersecurity application that analyzes URLs to detect potential phishing threats. Built with a Python/Flask backend and a dynamic, glassmorphism UI using HTML/CSS/JS. It features rule-based detection for suspicious indicators (like length, missing HTTPS, and keywords) and tracks scan history with live light/dark themes.
## ✨ Features
- **URL Validation & Analysis**: Real-time checking of user-provided URLs.
- **Rule-Based Detection**: Flags suspicious URLs by analyzing:
  - Absence of secure connections (`http` vs `https`).
  - Presence of suspicious symbols (e.g., `@` symbol).
  - Unusually long URL lengths.
  - Phishing-associated keywords (e.g., `login`, `verify`, `bank`, `secure`).
- **Premium UI/UX**: Custom glassmorphism design with sleek animations.
- **Light & Dark Themes**: Toggle between custom designer backgrounds.
- **History Tracking**: Automatically saves your recent URL scans to local storage for quick access.
## 🛠️ Tech Stack
- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript
- **Backend**: Python, Flask
- **Deployment Ready**: Configured with `requirements.txt` and `Procfile` for easy hosting on Render or Railway.
## 🚀 Getting Started Locally
Follow these instructions to run the application on your local machine.
### Prerequisites
- Python 3.8+ installed on your system.
### Installation
1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/YOUR_USERNAME/phishing-url-detector.git
   cd phishing-url-detector
   ```
2. **Create a virtual environment**:
   ```bash
   python -m venv venv
   ```
3. **Activate the virtual environment**:
   - On Windows:
     ```bash
     .\venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
4. **Install the dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
5. **Run the Flask application**:
   ```bash
   python app.py
   ```
6. **Open your browser** and navigate to `http://127.0.0.1:5000`
## ☁️ Deployment
This project is configured for easy deployment on **Render.com**.
1. Create a new GitHub repository and push your code.
2. Log in to [Render.com](https://render.com/).
3. Create a new **Web Service** and link your GitHub repository.
4. Render will automatically detect the Python environment.
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
5. Deploy and get your live URL!
## 📁 Project Structure
```text
├── app.py                  # Main Flask application and detection logic
├── requirements.txt        # Python dependencies
├── Procfile                # Deployment configuration
├── .gitignore              # Git ignore file
├── templates/
│   └── index.html          # Main HTML structure
└── static/
    ├── css/
    │   └── style.css       # Premium Glassmorphism styling and themes
    ├── js/
    │   └── script.js       # Frontend logic, history, and API fetching
    └── assets/
        ├── bg_dark.png     # Dark theme background image
        └── bg_light.png    # Light theme background image
```
## 📝 License
This project is open-source and available for educational purposes.
