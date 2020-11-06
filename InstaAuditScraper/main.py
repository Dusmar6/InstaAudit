from Instagram import Instagram
from Account import Account
from GetPost import GetPost
import random
import requests
import time

# The amount of time to wait in between requests plus a random number between 0 and this number divided by 2
SLEEP_BETWEEN_REQUESTS = 20

ig = Instagram(SLEEP_BETWEEN_REQUESTS)
sesh = requests.session()
accounts = ['hottopic']
# accounts = ['gucci','burberry', 'off____white', 'ysl', 'supremenewyork', 'bape_us', 'louisvuitton']
total_posts_gathered = 0
for account in accounts:
    profile = Account(account, ig, 1000)
    # profile = Account(account, ig, 100)
    for i in range(len(profile.posts)):
        print(profile.posts[i])
    GetPost('posts', account, profile.posts)
    total_posts_gathered += len(profile.posts)
print('DEBUG: %d posts gathered in %d seconds' % (total_posts_gathered, time.perf_counter()))
# print(account.posts[0]['edge_media_preview_like'])



#01cc910ad92e.js
#queryID = e769aa130647d2354c40ea6a439bfc08
#walmart ID = 391362994
#after QVFCaEh3eG54VXppY3NIaUhTT2hzcGY1X2loWVN4b1BhT1lfTllFcHRqQ2ktVEdxc3lwUGhteFh5LUJWa1V4VGR2eXRRcFByUHZ4NXVLY09Ka0dLOHFMNw pointer from previous query
#end_c QVFCaEh3eG54VXppY3NIaUhTT2hzcGY1X2loWVN4b1BhT1lfTllFcHRqQ2ktVEdxc3lwUGhteFh5LUJWa1V4VGR2eXRRcFByUHZ4NXVLY09Ka0dLOHFMNw pointer for next query (generated in json from previous request)
