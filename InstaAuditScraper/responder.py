import metrics as m
import numpy as np
import base64
import statsmodels.api as sm    
import pandas as pd
from scipy import stats

def test_image(path):
    data = {'clipping':{},
            'contrast':{},
            'face':{},
            'sharpness':{},
            'noise':{},
            'color_temp':{},
            'saturation':{},
            'colorfulness':{}}
    
    
    data['clipping'], s1 = clipping(path)
    data['contrast'], s2 = contrast(path)
    data['face'],s3 = face(path)
    data['sharpness'],s4 = sharpness(path)
    data['noise'],s5 = noise(path)
    data['color_temp'],s6 = temp(path)
    data['saturation'],s7 = sat(path)
    data['colorfulness'],s8 = color(path)
    
    s = int(s1+s2+s3+s4+s5+s6+s7+s8)
    
    data['non_ml_score'] = s    
    
    data['ml_score_percentile'] = ml_ranking(data)
    return data
    

    
    
def clipping(path):
    score = m.image_clipping(path)
    
    if score<5:
        response = 'Excellent clipping score.'
        s=0
    elif score<10:
        response = "Good clipping score, but could be improved. A good rule of thumb is: The lower the better."
        s=1
    elif score<20:
        response = "There is a lot of clipping going on in this image. Typically the lower the clipping, the better."
        s=2
    else:
        response = "Posts with clipping levels over 20% typically don't perform very well on instagram. Try to lower it!"
        s=3
        
    data = {'score': score,
            'resp': response}
    
    return data, s
    
def contrast(path):
    score = m.image_contrast(path)
    
    ad = abs(60-score)
    
    if ad<10:
        response = 'Excellent contrast score.'
        s=0
    elif ad<20:
        response = "Good contrast score, but could be improved. We found that contrast scores around ~60 perform the best on instagram."
        s=1
    else:
        response = "Try to increase or decrease your image's contrast to get it near 60! We've found that images with contrast scores near 60 earn the most engagement."
        s=2 
    data = {'score': score,
            'resp': response}
    
    return data, s


def face(path):
    score = m.image_face(path)

    if score:
        response = 'Facial features detected in the image. Images with faces typically draw the viewers eye more than images without faces.'
        s=0
    else:
        response = "Facial features not detected in the image. Images don't need faces to get popular, but typically we've found that pictures with faces perform better overall."
        s=1
    data = {'score': score,
            'resp': response}
    
    return data, s


def sharpness(path):
    score = m.image_sharpness(path)
    
    ad = abs(10-score)
    
    if ad<5:
        response = 'Excellent sharpness score.'
        s=0
    elif ad<10:
        response = "Good sharpness score, but could be improved. We found that sharpness scores around ~10 perform the best on instagram."
        s=1
    else:
        response = "Try to increase or decrease your image's sharpness to get it near 10! We've found that images with sharpness scores near 10 earn the most engagement."
        s=2
    data = {'score': score,
            'resp': response}
    
    return data, s

def noise(path):
    score = m.image_noise(path)
    
    ad = abs(1-score)
    
    if ad<1:
        response = 'Excellent noise score. The best images typically get less than 2 but higher than 0 on the noise ranking.'
        s=0
    elif ad<2:
        response = "Great noise score, but could be improved. We found that noise scores around ~1 perform the best on instagram."
        s=1
    elif ad<9:
        response = "Okay noise score. Try to get it below 2."
        s=2
    else:
        response = "Images with this noise score typically dont do very well on instagram."
        s=3  
    data = {'score': score,
            'resp': response}
    
    return data, s

def temp(path):
    score = m.image_color_temperature(path)
    
    ad = abs(6000-score)
    
    if ad<1000:
        s=0
        response = 'Excellent temperature score. Image temperature doesn\'t have the most impact on engagement, but we\'ve found that temps around 6000 typically have the highest concentration of well-performing posts.'
    elif ad<2000:
        s=1
        response = "Alright temperature score. Image temperature doesn't have the most impact on engagement, but we've found that temps around 6000 typically have the highest concentration of well-performing posts."
    elif ad<3000:
        s=2
        response = "Okay temperature score. Image temperature doesn't have the most impact on engagement, but we've found that temps around 6000 typically have the highest concentration of well-performing posts."
    elif score < 4000:
        s=3
        response = "Very few images with this temperature do well on instagram."
        
    data = {'score': score,
            'resp': response}
    
    return data, s


def sat(path):
    score = m.image_saturation(path)
    
    ad = abs(75-score)
    
    if ad<25:
        s=0
        response = 'Excellent saturation score. The best posts have a saturation score between 50 and 100'
    elif ad<50:
        s=1
        response = "Alright saturation score. Try to raise or lower your saturation to improve it!."
    elif ad<150:
        s=2
        response = "Okay saturation score. Your image may still do alright, but the highest performing posts are found between 50 and 100."
    else :
        s=3
        response = "Poor saturation score. Not many images with this saturation do very well."
        
    data = {'score': score,
            'resp': response}
    
    return data, s

def color(path):
    score = m.image_colorfulness(path)
    
    ad = abs(40-score)
    
    if ad<20:
        s=0
        response = 'Excellent colorfulness score. The best posts have a colorfulness score between 60 and 20'
    elif ad<30:
        s=1
        response = "Alright colorfulness score. Try to raise or lower your saturation to improve it!."
    elif ad<40:
        s=2
        response = "Okay colorfulness score. Your image may still do alright, but the highest performing posts are found between 60 and 20."
    else :
        s=3
        response = "Poor colorfulnessscore. Not many images with this colorfulness do very well."
        
    data = {'score': score,
            'resp': response}
    
    return data, s

def ml_ranking(data):
    
    print(data)

    df = pd.read_csv("converted.csv")
    
    X = df[['colorfulness','sharpness','total_clip','saturation','noise','contrast','color_temp']]
    y = df['ranking']
    
    model = sm.OLS(y, X).fit()
    predictions = model.predict(X)
    model.summary()

    preds = []
    for p in predictions:
        preds.append(p)
    
    preds.sort()
    test = []
    test.append([
        data['colorfulness']['score'],
        data['sharpness']['score'],
        data['clipping']['score'],
        data['saturation']['score'],
        data['noise']['score'],
        data['contrast']['score'],
        data['color_temp']['score'],
        ])

    perc = model.predict(test)
    
    
    return stats.percentileofscore(preds, perc)
    
 


