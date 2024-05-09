import pickle

from sklearn.ensemble import RandomForestClassifier


class RandomForestModel:
    def __new__(cls):
        if not hasattr(cls, "instance"):
            cls.instance = super().__new__(cls)
            cls.instance.__init()
        return cls.instance

    @staticmethod
    def get_instance():
        return RandomForestModel()

    def __init(self):
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)

    def fit_training_data(
        self,
        x_train,
        y_train,
    ):
        self.model.fit(x_train, y_train)

    def save_model(self, filepath: str):
        print("Model saved")
        pickle.dump(self.model, open(filepath, "wb"))

    def load_model(self, filename):
        self.model = pickle.load(open(filename, "rb"))

    def predict(self, features):
        prediction = self.model.predict([features])
        prediction = prediction[0]
        return prediction
