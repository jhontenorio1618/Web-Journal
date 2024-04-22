// Select the emotion chart canvas and initialize the chart
const ctx = document.getElementById('emotion-chart').getContext('2d');
const emotionChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Emotion Level',
            data: [], // Sample data, replace with actual emotion levels
            borderColor: 'blue', // Line color
            backgroundColor: '#3498db;', // Fill color (blue with 20% opacity)
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 10 // Assuming the emotion level is rated on a scale of 0 to 10
            }
        },
        plugins: {
            legend: {
                display: false // Hide legend
            }
        }
    }
});

// Function to calculate the average emotion rating
function calculateAverage(emotions) {
    const sum = emotions.reduce((a, b) => a + b, 0);
    const average = Math.round(sum / emotions.length);
    return average;
}

// Function to update the graph with new data and display the average mood
// Function to map emotion ratings to emotions
function mapEmotion(rating) {
    const emotions = [
        "Absolutely Devastated",
        "Very Sad",
        "Sad",
        "Neutral",
        "Content",
        "Happy",
        "Excited",
        "Very Excited",
        "Ecstatic",
        "Absolutely Ecstatic"
    ];
    return emotions[rating - 1]; // Adjust rating to match array index
}

// Function to update the graph with new data and display the average mood
function updateGraphAndAverage(date, rating) {
    // Update data in the chart
    emotionChart.data.labels.push(date); // Push date to labels array
    emotionChart.data.datasets[0].data.push(parseInt(rating)); // Push rating to data array
    emotionChart.update(); // Update the chart

    // Calculate and display the average mood
    const average = calculateAverage(emotionChart.data.datasets[0].data);
    const averageEmotion = mapEmotion(average);
    document.getElementById('value').textContent = `On average, you've been feeling ${averageEmotion}.`;
}


// Handle form submission
document.getElementById('emotion-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const date = document.getElementById('emotion-date').value;
    const rating = document.getElementById('emotion-rating').value;
    updateGraphAndAverage(date, rating);
});

// Initialize Datepicker
const datepicker = document.querySelector('[data-toggle="datepicker"]');
if (datepicker) {
    new Datepicker(datepicker);
}
