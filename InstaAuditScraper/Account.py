import urllib.parse

from InstaAuditScraper.Instagram import Instagram

MEDIA_QUERY_URL = 'https://www.instagram.com/graphql/query/?query_hash=e769aa130647d2354c40ea6a439bfc08&variables=%s'

class Account:

    def __init__(self, username: str, ig: Instagram, amt: int) -> None:
        data = ig.get_account(username)
        flag = False
        self.id = data['id']
        self.end_cursor = data['edge_owner_to_timeline_media']['page_info']['end_cursor']
        self.post_data = data['edge_owner_to_timeline_media']['edges']

        self.posts = []

        for i in range(len(data['edge_owner_to_timeline_media']['edges'])):
            post = {
                'id': data['edge_owner_to_timeline_media']['edges'][i]['node']['id'],
                '__typename': data['edge_owner_to_timeline_media']['edges'][i]['node']['__typename'],
                'display_url': data['edge_owner_to_timeline_media']['edges'][i]['node']['display_url'],
                'comments_disabled': data['edge_owner_to_timeline_media']['edges'][i]['node']['comments_disabled'],
                'edge_media_to_comment': data['edge_owner_to_timeline_media']['edges'][i]['node']['edge_media_to_comment']['count'],
                'edge_media_preview_like': data['edge_owner_to_timeline_media']['edges'][i]['node']['edge_media_preview_like']['count'],
                'taken_at_timestamp': data['edge_owner_to_timeline_media']['edges'][i]['node']['taken_at_timestamp']
            }
            if post['__typename'] == 'GraphImage':
                self.posts.append(post)
            if len(self.posts) >= amt:
                flag = True
                break
            """
                Posts, along with all their attributes, are gathered in sets of 12 and then stored in 'self.posts'. Gather 
                enough posts from graphql calls to meet the 'amt' variable.
            """
        if not flag:
            while True:
                print(MEDIA_QUERY_URL % urllib.parse.quote('{"id":"%s","first":12,"after":"%s"}' % (self.id, self.end_cursor)))
                # Construct graphql url by encoding the variables id, first, and after
                query_response = ig.session.get(MEDIA_QUERY_URL % urllib.parse.quote('{"id":"%s","first":12,"after":"%s"}' % (self.id, self.end_cursor)))
                data = query_response.json()
                # Get new media and update end_cursor
                print('DEBUG: old end_cursor =', self.end_cursor)
                if self.end_cursor is None:
                    break
                self.end_cursor = data['data']['user']['edge_owner_to_timeline_media']['page_info']['end_cursor']
                for j in range(len(data['data']['user']['edge_owner_to_timeline_media']['edges'])):
                    post = {
                        'id': data['data']['user']['edge_owner_to_timeline_media']['edges'][j]['node']['id'],
                        '__typename': data['data']['user']['edge_owner_to_timeline_media']['edges'][j]['node']['__typename'],
                        'display_url': data['data']['user']['edge_owner_to_timeline_media']['edges'][j]['node']['display_url'],
                        'comments_disabled': data['data']['user']['edge_owner_to_timeline_media']['edges'][j]['node']['comments_disabled'],
                        'edge_media_to_comment': data['data']['user']['edge_owner_to_timeline_media']['edges'][j]['node']['edge_media_to_comment']['count'],
                        'edge_media_preview_like': data['data']['user']['edge_owner_to_timeline_media']['edges'][j]['node']['edge_media_preview_like']['count'],
                        'taken_at_timestamp': data['data']['user']['edge_owner_to_timeline_media']['edges'][j]['node']['taken_at_timestamp']
                    }
                    if post['__typename'] == 'GraphImage':
                        self.posts.append(post)
                    if len(self.posts) >= amt:
                        flag = True
                        break
                if flag:
                    break
