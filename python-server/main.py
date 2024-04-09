import os

from model_training import NaiveBayes, Preprocessing, RandomForestModel

RFM_MODEL = "./models/rfc.sav"
NAIVE_BAYES_MODEL = "./models/naive_bayes.sav"
DATASET_PATH = "./dataset/crop_recommendation.csv"


def train_models():
    pre = Preprocessing().get_instance(DATASET_PATH)
    pre.impute_null_values()
    (x_train, x_test, y_train, y_test) = pre.split_training_data()

    rfm = RandomForestModel.get_instance()
    rfm.fit_training_data(x_train, y_train)
    rfm.save_model(RFM_MODEL)

    nb = NaiveBayes.get_instance()
    nb.fit_training_data(x_train, y_train)
    nb.save_model(NAIVE_BAYES_MODEL)


def load_models():
    rfm = RandomForestModel.get_instance()
    nb = NaiveBayes.get_instance()
    rfm.load_model(RFM_MODEL)
    nb.load_model(NAIVE_BAYES_MODEL)


def main():
    if not os.path.exists(RFM_MODEL) or not os.path.exists(NAIVE_BAYES_MODEL):
        train_models()
        print("Model saved ")
    else:
        load_models()
        print("Model Loaded")


if __name__ == "__main__":
    main()
