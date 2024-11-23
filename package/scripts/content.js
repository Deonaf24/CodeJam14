//Create a class for reviews
class Review{
    constructor(title, body, rating, date, uuid){
        this.title = title;
        this.body = body;
        this.rating = rating;
        this.data = date;
        this.uuid = uuid;
    }
}

let reviewsContainer = document.querySelector("#cm-cr-dp-review-list");


if(!reviewsContainer){
    reviewsContainer = document.querySelector("#cm_cr-review_list")
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
            const rating = review.querySelector('[data-hook="review-star-rating"] .a-icon-alt')?.innerText.trim() || "No Rating";
            
            //Extract the review date
            const date = review.querySelector('[data-hook="review-date"]')?.innerText.trim() || "No Date";
            //Instantiate a new review object
            parsedReviews.push(new Review(title, body, rating, date));
            console.log(parsedReviews);
        });
    }
}
else{
    console.log("failed");
}
