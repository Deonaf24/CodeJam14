// Import the transformers.js library
import { AutoTokenizer, AutoModelForSequenceClassification } from '@xenova/transformers';

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
            parsedReviews.push(new Review(title, body, rating, date));
        });

        console.log(parsedReviews);     

        (async () => {
            // Sends a message to the service worker and receives a tip in response
            const { tip } = await chrome.runtime.sendMessage({ greeting: 'tip' });
        })();

        //calculate the new rating
        let ratings = 0;
        //keep track of how many reviews are used in new rating
        let count = 0;
        parsedReviews.forEach((review) => {
            if (review.status){
                ratings += review.rating;
                count++;
            }
        });
        ratings = ratings/count;
        //update the HTML
        // document.getElementById("AdjustedRating").innerHTML = ratings.toString();
        // document.getElementById("Percentage").innerHTML = count/parsedReviews * 100;
    }
}
else{
    console.log("failed to find reviews");
}
