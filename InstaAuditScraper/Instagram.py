import json
import re
import time
import urllib.parse
import requests
import random

class Instagram():

    ACCOUNT_PAGE = 'https://www.instagram.com/%s'
    BASE_URL = 'https://www.instagram.com/'

    def __init__(self, sleep_between_requests=0):
        self.session = requests.session()
        headers = {
            'referer': self.BASE_URL,
        }
        self.user_agent = 'Instagram 134.0.0.25.116 (iPhone11,8; iOS 13_3_1; en_US; en-US; scale=2.00; 828x1792; 204771128) AppleWebKit/420+'
        headers['user-agent'] = self.user_agent

        self.sleep_between_requests = sleep_between_requests

    def get_account(self, username):

        time.sleep(self.sleep_between_requests + random.randint(0, int(self.sleep_between_requests / 2)))

        response = self.session.get(self.get_account_page_link(username), headers=self.session.headers)

        # If a 200 status code is not returned, something has gone wrong
        if response.status_code != 200:
            raise Exception(response.text, response.status_code)

        # Grabs all of the data from the account and stores it into a json
        account_json = None
        array = re.findall('_sharedData = .*?;</script>', response.text)
        if len(array) > 0:
            raw_json = array[0][len("_sharedData ="):-len(";</script>")]
            account_json = json.loads(raw_json)
            

        if account_json['entry_data']['ProfilePage'][0]['graphql']['user'] is None:
            raise Exception('No account with this username exists.')

        return account_json['entry_data']['ProfilePage'][0]['graphql']['user']

    def get_account_page_link(self, username):
        return self.ACCOUNT_PAGE % urllib.parse.quote_plus(username)
