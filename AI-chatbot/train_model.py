import json
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
import os

def train_intent_model():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    dataset_path = os.path.join(base_dir, "dataset.json")
    model_path = os.path.join(base_dir, "intent_model.pkl")
    
    print("Loading dataset...")
    if not os.path.exists(dataset_path):
        print(f"Error: {dataset_path} not found.")
        return False
        
    with open(dataset_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    texts = []
    labels = []
    
    for intent in data["intents"]:
        for pattern in intent["patterns"]:
            texts.append(pattern)
            labels.append(intent["tag"])

    print("Training intent classification model...")
    # Using TF-IDF and Logistic Regression for robust text classification
    model = make_pipeline(
        TfidfVectorizer(ngram_range=(1,2)), 
        LogisticRegression(C=1.0, class_weight="balanced", max_iter=500)
    )
    model.fit(texts, labels)
    
    joblib.dump(model, model_path)
    print(f"Model trained and saved to {model_path}")
    return True

if __name__ == "__main__":
    train_intent_model()
