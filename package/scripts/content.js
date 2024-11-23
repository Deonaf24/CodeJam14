// Import the transformers.js library
import { AutoTokenizer, AutoModelForSequenceClassification } from '@xenova/transformers';
import { parse } from 'path';

//Create a class for reviews
class Review{
    constructor(title, body, rating, date, uuid, status){
        this.title = title;
        this.body = body;
        this.rating = rating;
        this.data = date;
        this.uuid = uuid;
        this.status = true;
    }
}

//Model Function
async function loadModelAndPredict(parsedReviews) {
    // Path to the extracted model directory
    const modelPath = "package/model/DistilBERT/BERT_saved";

    console.log("Loading model and tokenizer...");

    // Load the fine-tuned model and tokenizer
    const tokenizer = await AutoTokenizer.from_pretrained(modelPath);
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


//Try to scrape for different types of review lists
let reviewsContainer = document.querySelector("#cm-cr-dp-review-list");

if(!reviewsContainer){
    reviewsContainer = document.querySelector("#cm_cr-review_list");
}
if(!reviewsContainer){
    reviewsContainer = document.querySelector("#cm-cr-global-review_list");
}
if(reviewsContainer){
    //Extract the reviews into an array
    const reviews = reviewsContainer.querySelectorAll('[data-hook="review"]');

    //prepare an array to put the parsed reviews into
    let parsedReviews = [];
    if (reviews){
        reviews.forEach((review) => {
            //Extract the review title
            const title = review.querySelector('[data-hook="review-title"]')?.innerText.trim() || "No Title";
            
            //Extract the review body
            const body = review.querySelector('[data-hook="review-body"]')?.innerText.trim() || "No Body";
            
            //Extract the review rating
            const rating = review.querySelector('[data-hook="review-star-rating"] .a-icon-alt')?.innerText.trim()[0] || "No Rating";
            
            //Extract the review date
            const date = review.querySelector('[data-hook="review-date"]')?.innerText.trim() || "No Date";
            //Instantiate a new review object
            parsedReviews.push(Review(title, body, rating, date));
        });
        console.log(parsedReviews);
        loadModelAndPredict(parsedReviews);
    }
}
else{
    console.log("failed to find reviews");
}
