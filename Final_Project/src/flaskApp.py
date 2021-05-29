from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")
    ##return "This is the hompage"
 
@app.route('/profile/<name>')
def profile(name):
    print(f'List of profiles for {name}')
    return render_template("search_results.html", name=name)



if __name__ == "__main__":
    app.run()