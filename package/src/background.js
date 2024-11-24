import { AutoTokenizer, AutoModelForSequenceClassification, env } from '@xenova/transformers';

env.backends.onnx.wasm.numThreads = 1;
env.allowLocalModels = true;




class PipelineSingleton {
    static task = 'text-classification';
    static model = 'model/DistilBERT/BERT_ONNX'; // Path to your local model folder
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            this.instance = await pipeline(this.task, this.model, {
                localFilesOnly: true, // Ensure local model usage
                progress_callback,
            });
        }

        return this.instance;
    }
}

// Create generic classify function, which will be reused for the different types of events.
const classify = async (text) => {
    // Get the pipeline instance. This will load and build the model when run for the first time.
    let model = await PipelineSingleton.getInstance((data) => {
        // You can track the progress of the pipeline creation here.
        // e.g., you can send `data` back to the UI to indicate a progress bar
        // console.log('progress', data)
    });

    // Actually run the model on the input text
    let result = await model(text);
    return result;
};

////////////////////// 2. Message Events /////////////////////
// 
// Listen for messages from the UI, process it, and send the result back.
chrome.runtime.onMessage.addListener((parsedReviews, sender, sendResponse) => {
    console.log('sender', sender)
    

    // Run model prediction asynchronously
    (async function () {
        // Perform classification
        parssedReviews.foreach (async (review) => {
           review.status =  await classify(review.body);
        });
        

        // Send response back to UI
        sendResponse(result);
    })();

    // return true to indicate we will send a response asynchronously
    // see https://stackoverflow.com/a/46628145 for more information
    return true;
});
//////////////////////////////////////////////////////////////












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
}