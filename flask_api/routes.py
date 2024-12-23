from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/api/nmap', methods=['POST'])
def process_data():
    # Get the data sent from the Express server
    data = request.get_json()
    print("Received data:", data)

    # Process the data (example: echo it back with a new message)
    processed_data = {
        "received": data,
        "status": "Processed successfully",
        "new_message": "Hello from Flask API!"
    }

    return jsonify(processed_data)

# @app.route('/api/crawling', methods=['POST'])
# def process_data():
#     return jsonify(processed_data)

# @app.route('/api/sqlInjection', methods=['POST'])
# def process_data():
#     return jsonify(processed_data)

# @app.route('/api/xss', methods=['POST'])
# def process_data():
#     return jsonify(processed_data)


if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Runs on port 5001
