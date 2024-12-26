from flask import Flask, jsonify, request
import nmap

app = Flask(__name__)

@app.route('/api/nmap', methods=['POST'])
def process_data():
    # recoit data de express
    data = request.get_json()
    target = data.get("target")

    if not target:
        return jsonify({"error": "Target IP required"}), 400

    # creer nmap scanner
    nm = nmap.PortScanner()

    try:
        # Run scan
        scan_result = nm.scan(hosts=target, arguments="-sS")  # faire des arguments parametrables (later)

        # get open ports dans le output
        host_data = scan_result.get("scan", {}).get(target, {})
        open_ports = host_data.get("tcp", {})

        # formater reponse
        formatted_ports = []
        for port, details in open_ports.items():
            formatted_ports.append({str(port): details.get("name", "unknown")})

        # reponse finale
        response = {
            "domain": target,
            "ports": formatted_ports
        }

        return jsonify(response)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

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
