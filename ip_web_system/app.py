from flask import Flask, request, jsonify, send_from_directory, session, redirect
from flask_cors import CORS
from flask import render_template
import csv
import os

app = Flask(__name__, static_folder='static', template_folder='templates')
app.secret_key = 'your_secret_key'
CORS(app)

# 簡易帳密
USERNAME = 'admin'
PASSWORD = '1234'

@app.route('/')
def index():
    if not session.get("logged_in"):
        return redirect("/login")
    return render_template("index.html")

@app.route('/login', methods=["GET", "POST"])
def login():
    if request.method == "POST":
        data = request.get_json()
        if data["username"] == USERNAME and data["password"] == PASSWORD:
            session["logged_in"] = True
            return jsonify({"success": True})
        else:
            return jsonify({"success": False})
    return render_template("login.html")

@app.route('/logout')
def logout():
    session["logged_in"] = False
    return redirect("/login")

@app.route('/api/data')
def get_data():
    records = []
    with open("data.csv", newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            records.append(row)
    return jsonify(records)

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

if __name__ == '__main__':
    app.run(debug=True)
