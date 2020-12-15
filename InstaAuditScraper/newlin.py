import statsmodels.api as sm    
import pandas as pd
from scipy import stats



def ml_ranking(data):
    
    print(data)

    df = pd.read_csv("converted.csv")
    
    X = df[['colorfulness','sharpness','total_clip','saturation','noise','contrast','color_temp']]
    y = df['ranking']
    
    model = sm.OLS(y, X).fit()
    predictions = model.predict(X)
    model.summary()

    L = []
    for p in predictions:
        L.append(p)
    
    L.sort()
    print(L)
    
    print(stats.percentileofscore(L, 0.12))


ml_ranking()