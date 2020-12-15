import numpy as np 
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import sys

#read in the csv file
dataset = pd.read_csv("converted.csv")

#splits up the columns with input and output
X= dataset.iloc[:, :7].values
print("X: ", X)
print(len(X))
Y= dataset.iloc[:, 7].values
print("Y: ",Y)
print(len(Y))

for y in Y:
    print(y)



#not entirely sure how this encoder works yet?
labelencoder_X = LabelEncoder()
X[:, 0]= labelencoder_X.fit_transform(X[:, 0])
onehotencoder= OneHotEncoder()



X= onehotencoder.fit_transform(X).toarray()

X_train, X_test, Y_train, Y_test = train_test_split( X, Y, test_size=0.2, random_state=0)

regressor = LinearRegression()

regressor.fit(X_train,Y_train)

predictions = regressor.predict(X_test)


class Test():
    def __init__(self, P, A):
        self.P = P
        self.A = A
        
    def __str__(self):
        return "P: %s \nA: %s \n" % (self.P, self.A)
        
    
l = []
for i in range(len(predictions)):
    l.append(Test(predictions[i], Y_test[i]))

l.sort(key = lambda x: x.A)

for x in l:
    print(str(x))



import matplotlib.pyplot as p

leftA=[]
leftP=[]

for x in l:
    leftA.append(x.A)
    leftP.append(x.P)
    
    
bottom = np.linspace(0, len(l), len(l))

p.plot(bottom, leftA, 'o')
p.plot(bottom, leftP, 'x')






