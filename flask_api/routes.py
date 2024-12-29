from flask import Flask, jsonify, request
import nmap
import os
import json
import subprocess

app = Flask(__name__)

@app.route('/api/nmap', methods=['POST'])
def nmap_scan():
    # Recoit data de Express
    data = request.get_json()
    target = data.get("target")
    mode = data.get("mode")

    if not target:
        return jsonify({"error": "Target IP required"}), 400

    try:
        nmap_command = ["nmap", target, "-sT", "--reason", "-oJ", "-"] # TODO : argumements parametrables pour advanced

        process = subprocess.run(
            nmap_command,
            text=True,
            capture_output=True,
            check=True
        )

        # retourner output
        nmap_output = json.loads(process.stdout)
        return jsonify(nmap_output), 200

    except Exception as e:
        print(f"Error running Nmap: {e}")
        return jsonify({"error": f"Nmap failed: {e.stderr}"}), 500

@app.route('/api/crawling', methods=['POST'])
def crawling():
    # placeholder
    return jsonify({"status": "not implemented"})

@app.route('/api/sqlInjection', methods=['POST'])
def sqlInjection():
    # placeholder
    return jsonify({"status": "not implemented"})

@app.route('/api/xss', methods=['POST'])
def xss():
    # placeholder
    return jsonify({"status": "not implemented"})

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Runs on port 5001
