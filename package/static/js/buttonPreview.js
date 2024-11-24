 // Variable to track the state (silver, gold, or bronze)
 let colorState = 'silver';
 function changeColors() {
 const letterGradeElement = document.getElementById('letterGrade');
 const topPercentageGradeElement = document.querySelector('.topRow #percentageGrade'); // Percentage in the top row
 const bottomPercentageGradeElement = document.querySelector('.bottomRow #percentageGrade'); // Percentage in the bottom row
 const starContainer = document.getElementById('starRating'); // Star container

 if (colorState === 'silver') {
     // Change to gold
     const fifaRareGold = getComputedStyle(document.documentElement).getPropertyValue('--fifaRareGold');
     const fifaGold = getComputedStyle(document.documentElement).getPropertyValue('--fifaGold');
     const pastelGreen = getComputedStyle(document.documentElement).getPropertyValue('--pastelGreen');
     const codeJamBlue = getComputedStyle(document.documentElement).getPropertyValue('--codeJamBlueOriginal'); // Original color

     document.documentElement.style.setProperty('--fifaRareSilver', fifaRareGold); // Silver to Rare Gold
     document.documentElement.style.setProperty('--fifaSilver', fifaGold); // Silver to Gold
     document.documentElement.style.setProperty('--white', pastelGreen); // Update white
     document.documentElement.style.setProperty('--codeJamBlue', codeJamBlue); // Restore original blue

     letterGradeElement.innerText = 'A'; // Update letter grade to A
     topPercentageGradeElement.innerText = '99%'; // Update percentage grade in top row to 99%
     bottomPercentageGradeElement.innerText = '99%'; // Update percentage grade in bottom row to 99%
     updateStars(5); // Update stars to 5 for gold
     colorState = 'gold'; // Update state
 } else if (colorState === 'gold') {
     // Change to bronze  
     const fifaRareBronze = getComputedStyle(document.documentElement).getPropertyValue('--fifaRareBronze');
     const fifaBronze = getComputedStyle(document.documentElement).getPropertyValue('--fifaBronze');
     const pastelRed = getComputedStyle(document.documentElement).getPropertyValue('--pastelRed');

     document.documentElement.style.setProperty('--fifaRareSilver', fifaRareBronze); // Rare Silver to Rare Bronze
     document.documentElement.style.setProperty('--fifaSilver', fifaBronze); // Silver to Bronze
     document.documentElement.style.setProperty('--white', pastelRed); // Update white
     document.documentElement.style.setProperty('--codeJamBlue', 'black'); // Set to black when bronze

     letterGradeElement.innerText = 'F'; // Update letter grade to F
     topPercentageGradeElement.innerText = '35%'; // Update percentage grade in top row to 35%
     bottomPercentageGradeElement.innerText = '35%'; // Update percentage grade in bottom row to 35%
     updateStars(1); // Update stars to 1 for bronze
     colorState = 'bronze'; // Update state
 } else if (colorState === 'bronze') {
     // Change back to silver
     const fifaRareSilver = getComputedStyle(document.documentElement).getPropertyValue('--fifaRareSilverOriginal');
     const fifaSilver = getComputedStyle(document.documentElement).getPropertyValue('--fifaSilverOriginal');
     const white = getComputedStyle(document.documentElement).getPropertyValue('--whiteOriginal');
     const codeJamBlue = getComputedStyle(document.documentElement).getPropertyValue('--codeJamBlueOriginal'); // Original color

     document.documentElement.style.setProperty('--fifaRareSilver', fifaRareSilver); // Restore Rare Silver
     document.documentElement.style.setProperty('--fifaSilver', fifaSilver); // Restore Silver
     document.documentElement.style.setProperty('--white', white); // Restore white
     document.documentElement.style.setProperty('--codeJamBlue', codeJamBlue); // Restore original blue

     letterGradeElement.innerText = 'C'; // Update letter grade to C
     topPercentageGradeElement.innerText = '50%'; // Update percentage grade in top row to 50%
     bottomPercentageGradeElement.innerText = '50%'; // Update percentage grade in bottom row to 50%
     updateStars(3); // Update stars to 3 for silver
     colorState = 'silver'; // Update state
 }
}

// Helper function to update the number of stars
function updateStars(count) {
 const starContainer = document.getElementById('starRating');
 starContainer.innerHTML = ''; // Clear existing stars
 for (let i = 0; i < count; i++) {
     const star = document.createElement('div');
     star.className = 'star'; // Add star class
     starContainer.appendChild(star); // Add star to the container
 }
}
