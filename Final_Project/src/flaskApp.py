from flask import Flask, render_template, url_for, redirect, request
from tweetClient import TweetClient

app = Flask(__name__)

@app.route('/', methods = ['GET', 'POST'])
def index():
    if request.method == 'POST':
        print("got here")
        ##grab results from query in search bar
        profile_handle = request.form['search_profiles']
        #print("searched for profile handle: ", profile_handle, flush=True)

        ##redirect user to list of profiles page
        return redirect(url_for('profiles', profile_name=profile_handle))
    #else:
     #   profile_handle = request.args.get('search_profiles')
      #  return redirect(url_for('profiles', profile_name=profile_handle))

    return render_template("index.html")

@app.route('/profiles/<profile_name>', methods = ['GET', 'POST'])
def profiles(profile_name):
    print(f'List of profiles for {profile_name}')
    t = TweetClient(f'{profile_name}')
    ##session['twit_client'] = t
    prof = t.getUser()
    popular_tweets = t.getPopularTweets()
    return render_template("search_results.html", name=profile_name, profile=prof, tweets=popular_tweets)


if __name__ == "__main__":
    app.run()
