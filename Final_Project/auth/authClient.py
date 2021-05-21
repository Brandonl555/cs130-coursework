import tweepy
import webbrowser
import time

class AuthClient():
    consumerKey = 'NmMzyFs7OmrhGLtV36MBCbbXx'
    consumerSecret = 'bb81CKnyrL3iExmccaHP453wUBMGHKuWUwxLwNrgrmEtsS65DA'
    bearerToken = 'AAAAAAAAAAAAAAAAAAAAALEdPwEAAAAA68AVVBL2mnFCldhZkTIXhOflZR4%3DrJdUPwXfFY1AavCVKbFEIgOT5YbYr8F7193uZwDLkVdxn5EPXp'

    callback_uri = 'oob'
    redirect_url = None
    auth = None
    twit_api = None
    me = None

    def __init__(self):
        self.auth = tweepy.OAuthHandler(self.consumerKey, self.consumerSecret, self.callback_uri)
        try:
            self.redirect_url = self.auth.get_authorization_url()
            print(self.redirect_url)
            webbrowser.open(self.redirect_url)
        except tweepy.TweepError:
            print('Error! Failed to get request token.')

        user_pin_input = input("What's the pin value? ")
        self.auth.get_access_token(user_pin_input)
        #print(self.auth.access_token, self.auth.access_token_secret)

        self.twit_api = tweepy.API(self.auth)
        self.me = self.twit_api.me()
        print(self.me.screen_name)

    def getUser(self, user_id):
        profile = self.twit_api.lookup_users(screen_name = self.me.screen_name, user_id = ['user_id'])
        print(profile)       


###
### TEST
###
a = AuthClient()
a.getUser('Brandonl5551')