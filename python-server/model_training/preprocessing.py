from functools import reduce

import pandas as pd
from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split


class Preprocessing:

    def __new__(cls, filepath: str):
        if not hasattr(cls, "instance"):
            cls.instance = super().__new__(cls)
            cls.instance.__init__(filepath)
        return cls.instance

    @staticmethod
    def get_instance(filepath: str):
        return Preprocessing(filepath)

    def __init__(self, filepath: str):
        self.filepath: str = filepath
        data = pd.read_csv(self.filepath)
        self.df = pd.DataFrame(data)

    def impute_null_values(self):
        null_values = reduce(lambda x, y: x + y, self.df.isnull().sum())
        if null_values <= 0:
            return

        imputer = SimpleImputer(strategy="mean")
        imputer.fit(self.df)
        self.df = pd.DataFrame(imputer.transform(self.df), columns=self.df.columns)

    def extract_target_field(self):
        features = self.df.iloc[:, :-1]
        target = self.df.iloc[:, -1]
        return features, target

    def split_training_data(self):
        features, target = self.extract_target_field()
        x_train, x_test, y_train, y_test = train_test_split(
            features, target, test_size=0.1, random_state=42
        )
        return (x_train, x_test, y_train, y_test)

    def add_new_values(self, values):
        data = pd.read_csv(self.filepath)
        df = pd.DataFrame(data)
        new_row = pd.DataFrame(
            [
                {
                    "N": values[0],
                    "P": values[1],
                    "K": values[2],
                    "temperature": values[3],
                    "humidity": values[4],
                    "ph": values[5],
                    "rainfall": values[6],
                    "label": values[7],
                }
            ]
        )

        features = df.drop(["label"], axis=1)
        new_features = new_row.iloc[:, :-1]

        old_means = features.mean()
        new_features_df = pd.concat([features, new_features], ignore_index=True)
        new_means = new_features_df.mean()

        tolerance = 0.1  # You can adjust this tolerance value as needed
        acceptable_difference = (new_means - old_means).abs() <= tolerance

        is_relevant = acceptable_difference.all()

        if is_relevant:
            df = pd.concat([df, new_row], ignore_index=True)
            df.to_csv(self.filepath, index=False)
            return True
        else:
            return False
