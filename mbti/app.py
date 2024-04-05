from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins='*', allow_headers=['Content-Type'])

@app.route('/', methods=['POST'])
def index():
    form_data = request.json
    option_counts = {'Energy': {'A': 0, 'B': 0}, 'Mind': {'A': 0, 'B': 0}, 'Nature': {'A': 0, 'B': 0}, 'Tactics': {'A': 0, 'B': 0}}
    energy_list = []
    mind_list = []
    nature_list = []
    tactics_list = []
    
    for n in range(1,8):
        for i in range(10):
            nbr = n+7*i
            if n == 1:
                energy_list.append(nbr)
            elif n == 2 or n == 3:
                mind_list.append(nbr)
            elif n == 4 or n == 5:
                nature_list.append(nbr)
            else:
                tactics_list.append(nbr)

    for obj in form_data['data']:
        key, value = next(iter(obj.items()))
        if int(key) in energy_list:
            option_counts['Energy'][value] += 1
        elif int(key) in mind_list:
            option_counts['Mind'][value] += 1
        elif int(key) in nature_list:
            option_counts['Nature'][value] += 1
        elif int(key) in tactics_list:
            option_counts['Tactics'][value] += 1
    
    results = ""
    for category, counts in option_counts.items():
        if counts['A'] > counts['B']:
            result = 'E' if category == 'Energy' else 'S' if category == 'Mind' else 'T' if category == 'Nature' else 'J'
        else:
            result = 'I' if category == 'Energy' else 'N' if category == 'Mind' else 'F' if category == 'Nature' else 'P'
        
        results += result

    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)