import json
import os
import subprocess

import nmap
from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route("/api/nmap", methods=["POST"])
def nmap_scan():
    data = request.get_json()
    target = data.get("target")
    mode = data.get("mode")

    if not target:
        return jsonify({"error": "Target IP required"}), 400

    try:
        nm = nmap.PortScanner()

        if mode == "advanced":
            arguments = "-sS -A --reason"
        else:
            arguments = "-sT --reason"

        nm.scan(hosts=target, arguments=arguments)

        scan_results = {host: nm[host] for host in nm.all_hosts()}

        return jsonify(scan_results), 200

    except Exception as e:
        print(f"Error running Nmap: {e}")
        return jsonify({"error": f"Nmap failed: {str(e)}"}), 500


@app.route("/api/crawling", methods=["POST"])
def web_crawler():
    data = request.get_json()
    print("Received data:", data)
    domain = data.get("domain")
    ports = data.get("ports", [])
    max_depth = 3  # peut-etre metre ces info dans le body.. a voire
    max_pages = 100

    if not domain:
        return jsonify({"error: Domain not found"}), 400

    crawler_script_path = os.path.join(
        os.path.dirname(__file__), "scripts", "crawler.js"
    )
    result = None

    try:
        result = subprocess.run(
            [
                "node",
                crawler_script_path,
                domain,
                json.dumps(ports),
                str(max_depth),
                str(max_pages),
            ],
            capture_output=True,
            text=True,
            timeout=300,
        )
        print("STDOUT:", result.stdout)  # Log standard output
        print("STDERR:", result.stderr)  # Log errors

        if result.returncode != 0:
            return jsonify({"error": "Crawler failed", "details": result.stderr}), 500

        output = json.loads(result.stdout)
        return jsonify(output)

    except subprocess.TimeoutExpired:
        return jsonify({"error": "Crawler timed out"}), 504
    except json.JSONDecodeError as e:

        print("JSONDecodeError:", e)
        print(
            "STDOUT that caused error:",
            result.stdout if result else "No output",
        )
        return (
            jsonify(
                {
                    "error": "Invalid JSON output",
                    "details": str(e),
                    "stdout": result.stdout.strip() if result else "No output",
                }
            ),
            500,
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/sqlInjection", methods=["POST"])
def sqlInjection():
    # placeholder
    return jsonify({"status": "not implemented"})


@app.route("/api/xss", methods=["POST"])
def xss():
    # placeholder
    return jsonify({"status": "not implemented"})


if __name__ == "__main__":
    app.run(debug=True, port=5001)  # Runs on port 5001
