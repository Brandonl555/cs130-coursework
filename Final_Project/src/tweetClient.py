from authClient import AuthClient
import tweepy
import webbrowser
import json


class TweetClient():
    user = None
    api = None
    a = None

    def __init__(self, profile_name):
        self.user = profile_name
        
        self.a = AuthClient(profile_name)
        self.api = self.a.twit_api

    def getPopularTweets(self):
        tweets = []
        ##print(self.user)
        for tweet in tweepy.Cursor(self.api.search, q=f'from:{self.user}',result_type='popular').items(5):
            tweets.append(tweet)
        #print(tweets)
        #results = self.processTweets(tweets)
        return tweets

    def getUser(self):
        print(self.user)
        profile = self.api.lookup_users(screen_name = self.a.me.screen_name, user_id = [f'{self.user}'])
        #profile_image = profile['profile_image_url']
        ##print(profile)
        return profile

    def processTweets(self, tl):
        tweet_texts = []
        for t in tl:
            tweet_texts.append(t['text'])
        return tweet_texts

###
### TEST
###
##t = TweetClient('iambeckyg')
##t.getUser()
##t.getPopularTweets()