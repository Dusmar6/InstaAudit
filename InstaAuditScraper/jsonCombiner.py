import json
import AccountPostClass as ac
import os

def json_combiner(paths):
    
    #sets up the intermediary data holder
    f = {}
    f['posts']=[]
    
    #loops through jason files
    for file in paths:
        file = os.path.join(file, "posts.txt")
        #opens them
        if os.path.exists(file):
            with open(file) as json_file:
                
                #loads the data
                data = json.load(json_file)
                
                for p in data['posts']:
                    print(p['color_temp'])
                    #appends the data to the main json file
                    f['posts'].append(p)
                
    #saves the file as a larger combined jason.
    with open('combined.txt', 'w') as outfile:
        json.dump(f, outfile)
             
directory = 'C:\\Users\\dusma\\Documents\\GitHub\\491-Proj - Copy\\InstaAuditScraper\\posts'

subfolders = [ f.path for f in os.scandir(directory) if f.is_dir() ]

json_combiner(subfolders)