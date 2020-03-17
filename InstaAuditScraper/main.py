from InstaAuditScraper.Instagram import Instagram
from InstaAuditScraper.Account import Account
from InstaAuditScraper.GetPost import GetPost

import requests
import time

# The amount of time to wait in between requests plus a random number between 0 and this number divided by 2
SLEEP_BETWEEN_REQUESTS = 3

ig = Instagram(SLEEP_BETWEEN_REQUESTS)
sesh = requests.session()
# ig.generate_headers(sesh)

account = Account('walmart', ig, 1)
for i in range(len(account.posts)):
    print(account.posts[i])

# print(account.posts[0]['edge_media_preview_like'])
GetPost('posts', account.posts)
print('DEBUG: %d posts gathered in %d seconds' % (len(account.posts), time.perf_counter()))

#01cc910ad92e.js
#queryID = e769aa130647d2354c40ea6a439bfc08
#walmart ID = 391362994
#after QVFCaEh3eG54VXppY3NIaUhTT2hzcGY1X2loWVN4b1BhT1lfTllFcHRqQ2ktVEdxc3lwUGhteFh5LUJWa1V4VGR2eXRRcFByUHZ4NXVLY09Ka0dLOHFMNw pointer from previous query
#end_c QVFCaEh3eG54VXppY3NIaUhTT2hzcGY1X2loWVN4b1BhT1lfTllFcHRqQ2ktVEdxc3lwUGhteFh5LUJWa1V4VGR2eXRRcFByUHZ4NXVLY09Ka0dLOHFMNw pointer for next query (generated in json from previous request)