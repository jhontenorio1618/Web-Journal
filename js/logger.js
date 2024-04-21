// Sample data for the past 7 days. Need of the API's data
const pastWeekEmotions = [20, 19, 18, 17, 16, 15, 14];

// Messages corresponding to each emotion score
const emotionMessages = {
    1: "Hopeless",
    2: "Terrified",
    3: "Furious",
    4: "Anxious",
    5: "Lonely",
    6: "Irritated",
    7: "Disappointed",
    8: "Confused",
    9: "Nervous",
    10: "Curious",
    14: "Relaxed",
    15: "Hopeful",
    16: "Amazed",
    17: "Content",
    18: "Proud",
    19: "Excited",
    20: "Joyful"
};

function calculateAverage(emotions) {
    const sum = emotions.reduce((a, b) => a + b, 0);
    const average = Math.round(sum / emotions.length);
    return average;
}

function displayAverageEmotion() {
    const average = calculateAverage(pastWeekEmotions);
    console.log("Calculated Average:", average); // Log the calculated average
    const message = emotionMessages[average];
    if (message) {
        const displayText = `${message}`;
        document.getElementById('value').textContent = displayText;
    } else {
        console.error("No message found for average:", average); // Error if no message for average
    }
}
// Simulating the function to run on page load or another trigger 296 1857
window.onload = displayAverageEmotion;
