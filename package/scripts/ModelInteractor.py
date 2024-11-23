import transformers
import torch
import os
from transformers import AutoModelForSequenceClassification, AutoTokenizer

# Path to the extracted model directory
model_path = "package/model/DistilBERT/BERT_saved"

# Load the fine-tuned model
model = AutoModelForSequenceClassification.from_pretrained(model_path)

# Load the tokenizer
tokenizer = AutoTokenizer.from_pretrained(model_path)

print("Model and tokenizer loaded successfully!")

# Example input text
review = "This product is fantastic! I loved it."

# Tokenize the input
inputs = tokenizer(review, return_tensors="pt", truncation=True)

# Perform inference
outputs = model(**inputs)
logits = outputs.logits
probabilities = logits.softmax(dim=-1)

# Interpret results
predicted_label = probabilities.argmax(dim=-1).item()
labels = {0: "Real", 1: "Fake"}  # Replace with your label mapping
print(f"Predicted Label: {labels[predicted_label]}")