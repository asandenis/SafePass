from flask import Flask, request, redirect, url_for
from passwordGen import generate_password

app = Flask(__name__)
app.secret_key = 'mysecretkey'

@app.route('/input', methods=['POST'])
def process_input():
    input_data = request.json
    input_text = input_data['inputText']
    global length
    length = int(input_text)
    return redirect(url_for('generator'))

@app.route('/generator')
def generator():
    global length
    generatedPassword = generate_password(length)
    return generatedPassword

if __name__ == '__main__':
    app.run(debug=True)