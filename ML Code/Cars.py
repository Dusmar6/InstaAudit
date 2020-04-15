import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.tree import DecisionTreeClassifier
import matplotlib.pyplot as plt

cars = pd.read_csv('cars.csv')

print(cars)

X = cars[['modelyear', 'acceleration', 'weight', 'horsepower', 'displacement', 'cylinders']]

y = cars[['mpg']]  # 1=GOOD, 2=OK, 3=BAD

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=10)

clsDT = DecisionTreeClassifier(criterion="gini", random_state=10, max_depth=20, min_samples_leaf=1)

clsDT.fit(X_train, y_train)

y_pred = clsDT.predict(X_test)

print("Accuracy is ", accuracy_score(y_test, y_pred) * 100)

fig = cars[cars.mpg==1].plot(kind='scatter', x='horsepower', y='weight', color='purple', label='1')
cars[cars.mpg==2].plot(kind='scatter', x='horsepower', y='weight', color='red', label='2', ax=fig)
cars[cars.mpg==3].plot(kind='scatter', x='horsepower', y='weight', color='green', label='3', ax=fig)
fig.set_xlabel("Car Horsepower")
fig.set_ylabel("Car Weight")
fig.set_title("Car Horsepower vs Weight")
fig = plt.gcf()
fig.set_size_inches(10,6)
plt.show()
