import json
import AccountPostClass as ac
import os

def jsn_to_csv(path):
    file = path
    account = ac.Account('walmart')
    
    csv_file = os.path.join(os.path.dirname(path), "converted.csv")
    
    csv_data = "colorfulness,sharpness,total_clip,saturation,noise,contrast,color_temp,ranking\n"

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
    
    
    for post in account.posts:
        if post.color_temp<12000 :
            csv_data = csv_data + str("{:.4f},"*8).format(
                                           post.colorfulness,
                                           post.sharpness,
                                           post.total_clip,
                                           post.saturation,
                                           post.noise,
                                           post.contrast,
                                           post.color_temp,
                                           post.ranking)
            
            csv_data = csv_data[:-1] + "\n"
        
    f = open(csv_file, "w")
    f.write(csv_data)
    f.close()


jsn_to_csv("C:\\Users\\dusma\\Documents\\GitHub\\491-Proj\\InstaAuditScraper\\combined.txt")