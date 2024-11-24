import { AutoTokenizer, AutoModelForSequenceClassification, env } from '@xenova/transformers';

env.backends.onnx.wasm.numThreads = 1;

//Model Function
async function loadModelAndPredict(parsedReviews) {
    // Path to the extracted model directory
    const modelPath = "../model/DistillBERT/BERT_ONNX";

    console.log("Loading model and tokenizer...");

    // Load the fine-tuned model and tokenizer
    const tokenizer = await AutoTokenizer.from_pretrained(modelPath);
    console.log("tokenizer loaded");
    const model = await AutoModelForSequenceClassification.from_pretrained(modelPath);
    console.log("Model and tokenizer loaded successfully!");

    //loop through parsedReviews
    parsedReviews.forEach(async (review) => {
        const body = review.body;

        // Tokenize the input
        const inputs = await tokenizer(body, { truncation: true, return_tensors: "pt" });

        // Perform inference
        const output = await model(inputs);
        const logits = output.logits;

        // Convert logits to probabilities using softmax
        const probabilities = logits.softmax(1);
        
        // Interpret results
        const predictedLabel = probabilities.argmax().dataSync()[0];
        const labels = { 0: "Real", 1: "Fake" }; // Replace with your label mapping

        console.log(`Predicted Label: ${labels[predictedLabel]}`);
        review.status = predictedLabel;
    })

    loadModelAndPredict(window.parsedReviews);
}