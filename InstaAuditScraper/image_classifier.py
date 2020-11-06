import os
import AccountPostClass as ac
import metrics as m
import matplotlib.pyplot as p
import time
import json
from scipy import stats
import numpy as np

#takes in the raw post folder and classifies the images
def image_classifier(folder):
    files = os.listdir(folder)
    
    #ensures no errant files are played with
    for file in files:
        if not file.endswith(".jpeg"):
            files.remove(file)
    
    filename, ftype = os.path.splitext(files[0])
            
    strings = filename.split("_")
    account = strings[0]

    account = ac.Account(account)
    
    x = []

    for file in files:
        filename, ftype = os.path.splitext(file)
        strings = filename.split("_")
        path = os.path.join(folder, file)
        print(strings)
        id = int(strings[1])
        likes = int(strings[2])
        comments = int(strings[3])
        timestamp = int(strings[4])
        po = ac.Post(path, id, likes, comments, timestamp)
        account.posts.append(po)
        x.append(po.likes)
        
    
    xmin = min(x)
    xmax = max(x)
    
    
    
    for post in account.posts:
        
        post.ranking = (post.likes - xmin) / (xmax-xmin)
        
        post.dom_color = m.image_dominant_color(post.path)
        
        post.color_temp = m.image_color_temperature(post.path)
        
        post.colorfulness = m.image_colorfulness(post.path)
        
        post.sharpness = m.image_sharpness(post.path)
        
        post.contrast = m.image_contrast(post.path)
        
        post.saturation = m.image_saturation(post.path)
        
        post.noise = m.image_noise(post.path)
        
        post.total_clip = m.image_clipping(post.path)
        
        post.face = m.image_face(post.path)
        
        print(post)
        
        
    
    
    
    data = {}
    data['posts'] = []
    filter = sd_outlier(x)


    for i in range(0, len(x)):
        print(filter[i])
        if not filter[1]:
            
            data['posts'].append({
                'id' : str(account.posts[i].id),
                'path' : str(account.posts[i].path),
                'comments' : str(account.posts[i].comments),
                'likes' : str(account.posts[i].likes),
                'timestamp' : str(account.posts[i].timestamp),
                'ranking' : str(account.posts[i].ranking),
                'dom_color': str(account.posts[i].dom_color),
                'colorfulness': str(account.posts[i].colorfulness),
                'saturation' : str(account.posts[i].saturation),
                'color_temp' : str(account.posts[i].color_temp),
                'noise' : str(account.posts[i].noise),
                'sharpness' : str(account.posts[i].sharpness),
                'contrast' : str(account.posts[i].contrast),
                'clipping': str(account.posts[i].total_clip),
                'face': account.posts[i].face
                })
            
            print(post)
        
        
    
    with open('posts.txt', 'w') as outfile:
        json.dump(data, outfile)
        
 
    rank = []
    c = []
    
    axis = [0, 1.2, 0, 1.2]
    for post in account.posts:
        rank.append(post.ranking)
        c.append(post.colorfulness)
        
    p.plot(rank, c, 'ro')
    print('yo')
    time.sleep(10)
    

def sd_outlier(x, axis = None, bar = 3, side = 'both'):
    assert side in ['gt', 'lt', 'both'], 'Side should be `gt`, `lt` or `both`.'

    d_z = stats.zscore(x, axis = axis)

    if side == 'gt':
        return d_z > bar
    elif side == 'lt':
        return d_z < -bar
    elif side == 'both':
        return np.abs(d_z) > bar


folder = 'C:\\Users\\dusma\\Documents\\GitHub\\491-Proj\\InstaAuditScraper\\posts\\hottopic\\raw posts'

image_classifier(folder)
    

    
    
    #       gucci_2396407507701440167_103779_281_1599894058_40914533
    
    # acountname_ post id _ likes _ comments _ timestamp _ account followers