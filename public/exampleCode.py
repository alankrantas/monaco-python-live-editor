from sklearn import datasets
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report
from sklearn.linear_model import LogisticRegression

x, y = datasets.load_iris(return_X_y=True)
std_x = StandardScaler().fit_transform(x)

x_train, x_test, y_train, y_test = train_test_split(std_x, y, test_size=0.2, random_state=0)

model = LogisticRegression()
model.fit(x_train, y_train)
y_pred = model.predict(x_test)

print(classification_report(y_test, y_pred))