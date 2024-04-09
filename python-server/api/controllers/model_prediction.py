import sys

sys.path.append("../..")

from model_training import NaiveBayes, Preprocessing, RandomForestModel

RFM_MODEL = "./models/rfc.sav"
NAIVE_BAYES_MODEL = "./models/naive_bayes.sav"
DATASET_PATH = "./dataset/crop_recommendation.csv"


def predict(values):
    predicted_1 = NaiveBayes.get_instance().predict(values)
    predicted_2 = RandomForestModel.get_instance().predict(values)
    if predicted_1 == predicted_2:
        return [predicted_1]

    return [predicted_1, predicted_2]


def update_dataset(values):
    pre = Preprocessing.get_instance(DATASET_PATH)
    if pre.add_new_values(values):
        pre.impute_null_values()
        (x_train, _, y_train, _) = pre.split_training_data()

        rfm = RandomForestModel.get_instance()
        rfm.fit_training_data(x_train, y_train)
        rfm.save_model(RFM_MODEL)

        nb = NaiveBayes.get_instance()
        nb.fit_training_data(x_train, y_train)
        nb.save_model(NAIVE_BAYES_MODEL)
        return True
    else:
        return False
