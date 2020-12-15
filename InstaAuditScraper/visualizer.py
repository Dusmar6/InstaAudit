import json
import metrics
import AccountPostClass as ac
import matplotlib.pyplot as p
import time
import datetime

file = "C:\\Users\\dusma\\Documents\\GitHub\\491-Proj\\InstaAuditScraper\\combined.txt"

account = ac.Account('walmart')

with open(file) as json_file:
    data = json.load(json_file)
    for k in data['posts']:
        
        post = ac.Post(              path=k['path'],
                                     ranking=float(k['ranking']),
                                     dom_color=k['dom_color'],
                                     colorfulness=float(k['colorfulness']),
                                     sharpness=float(k['sharpness']),
                                     total_clip=float(k['clipping']),
                                     face=bool(k['face'])
                                     )
        post.saturation = float(k['saturation'])
        post.noise = float(k['noise'])
        post.contrast = float(k['contrast'])
        post.color_temp = float(k['color_temp'])
        post.timestamp = float(k['timestamp'])
        account.posts.append(post )
    
        
        

def visualizer(metric):
    
    left = []
    bottom = []
    if metric == 'colorfulness':
        for post in account.posts:
            bottom.append(post.ranking)
            left.append(post.colorfulness)
    elif metric == 'sharpness':
        for post in account.posts:
            bottom.append(post.ranking)
            left.append(post.sharpness)
    elif metric == 'clipping':
        for post in account.posts:
            bottom.append(post.ranking)
            left.append(post.total_clip)
    elif metric == 'face':
        for post in account.posts:
            bottom.append(post.ranking)
            left.append(post.face)
            
        print(len(left))
        print(left.count(1))
        print(left.count(0))
    elif metric == 'saturation':
        for post in account.posts:
            bottom.append(post.ranking)
            left.append(post.saturation)
    elif metric == 'noise':
        for post in account.posts:
            bottom.append(post.ranking)
            left.append(post.noise)
    elif metric == 'contrast':
        for post in account.posts:
            bottom.append(post.ranking)
            left.append(post.contrast)
    elif metric == 'color_temp':
        for post in account.posts:
            if post.color_temp < 12000:
                bottom.append(post.ranking)
                left.append(post.color_temp)
    elif metric == 'timestamp':
        for post in account.posts:
            d = datetime.datetime.fromtimestamp(post.timestamp)
            bottom.append(post.ranking)
            left.append(d.hour)
    print(metric)
    p.plot(bottom, left, 'ro')
    time.sleep(1)

        
    ## ['colorfulness','sharpness', 'clipping','face','saturation','noise','contrast','color_temp','timestamp']
metrics = ['colorfulness']

for metric in metrics:
    visualizer(metric)
    
    
    
    
    

    '''    
left = []
bottom = []
    

for post in account.posts:
        #d = datetime.datetime.fromtimestamp(post.timestamp)
        #if post.color_temp < 12000:
        bottom.append(post.ranking)
        left.append(post.contrast)


p.plot(bottom, left, 'ro')
print('yo')
time.sleep(1)
'''