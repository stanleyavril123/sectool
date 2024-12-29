from flask import Flask, jsonify, request
import nmap

app = Flask(__name__)

@app.route('/api/nmap', methods=['POST'])
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

        scan_results = {
            host: nm[host]
            for host in nm.all_hosts()
        }

        return jsonify(scan_results), 200

    except Exception as e:
        print(f"Error running Nmap: {e}")
        return jsonify({"error": f"Nmap failed: {str(e)}"}), 500

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
