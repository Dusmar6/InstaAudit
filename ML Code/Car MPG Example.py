
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.tree import DecisionTreeClassifier

cars = pd.read_csv('cars.csv')

print(cars)

X = cars[['modelyear', 'acceleration', 'weight', 'horsepower', 'displacement', 'cylinders']]
    
y = cars[['mpg']] #1=GOOD, 2=OK, 3=BAD

X_train, X_test, y_train, y_test = train_test_split( X, y, test_size = 0.3, random_state = 10)

clsDT =  DecisionTreeClassifier(criterion = "gini", random_state = 10,  max_depth=20,  min_samples_leaf=1)

clsDT.fit(X_train, y_train)

y_pred = clsDT.predict(X_test)

print("Accuracy is ", accuracy_score(y_test,y_pred)*100)