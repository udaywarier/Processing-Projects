from flask import Flask, render_template

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@app.route('/')
def home():
    return render_template('hello.html')

if __name__ == '__main__':
    app.run(debug=True)