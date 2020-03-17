import requests
import os.path

def GetPost(path, post_data):
    for i in range(len(post_data)):

        filepath = os.path.join(path, '%s_%s_%s_%s.jpg' % (post_data[i]['id'], post_data[i]['edge_media_preview_like'],
                                                           post_data[i]['edge_media_to_comment'],
                                                           post_data[i]['taken_at_timestamp']))
        # REST API GET request, stored as a response
        response = requests.request("GET", post_data[i]['display_url'])
        # Write contents of GET request, and store it as a .jpg file
        f = open(filepath, 'wb')

        for chunk in response.iter_content(chunk_size=255):
            if chunk:
                f.write(chunk)
        f.close()