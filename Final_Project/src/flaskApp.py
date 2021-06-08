from flask import Flask, render_template, request, jsonify, url_for, redirect
##from flask.ext.session import Session --> , session
from tweetClient import TweetClient

app = Flask(__name__)
#SESSION_TYPE = 'redis'
#app.config.from_object(__name__)
#Session(app)

@app.route('/', methods = ['GET', 'POST'])
def index():
    if request.method == 'POST':
        print("got here")
        ##grab results from query in search bar
        profile_handle = request.form['search_profiles']
        print("searched for profile handle: ", profile_handle, flush=True)

        ##redirect user to list of profiles page
        return redirect(url_for('profiles', profile_name=profile_handle))

    return render_template("index.html")

@app.route('/profiles', methods = ['GET', 'POST'])
def profiles(profile_name):
    print(f'List of profiles for {profile_name}')
    t = TweetClient(f'{profile_name}')
    ##session['twit_client'] = t
    prof = t.getUser()
    return render_template("search_results.html", name=profile_name, profile=prof)

@app.route('/tweets', methods = ['GET', 'POST'])
def tweets():
    ##tc = session.get('twit_client', None)
    ##tc.getPopularTweets()
    return render_template("tweetDisplay.html")



if __name__ == "__main__":
    app.run()
