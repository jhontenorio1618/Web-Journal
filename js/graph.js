const ctx = document.getElementById('emotion-chart').getContext('2d');
const emotionChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // This will contain the dates
        datasets: [{
            label: 'Emotion Level',
            data: [], // This will contain the emotion ratings
            borderColor: 'blue',
            backgroundColor: '#3498db;',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 10
            }
        },
        plugins: {
            legend: {
                display: false // Hide legend
            }
        }
    }
});

function calculateAverage(emotions) {
    if (emotions.length === 0) return "No data"; // Return a default message if there are no emotions
    const sum = emotions.reduce((a, b) => a + b, 0);
    const average = Math.round(sum / emotions.length);
    return average;
}

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
    return emotions[average - 1] || "No data";
}

function calculateAverage(emotions) {
    if (emotions.length === 0) return "No data";
    const sum = emotions.reduce((a, b) => a + b, 0);
    const average = (sum / emotions.length) || 0;
    return Math.round(average);
}


function updateGraphAndAverage(date, rating) {
    if (date && rating) {
        emotionChart.data.labels.push(date.toLocaleDateString());
        emotionChart.data.datasets[0].data.push(parseInt(rating));
        emotionChart.update();

        const averageRating = calculateAverage(emotionChart.data.datasets[0].data);
        const averageEmotion = mapEmotion(averageRating);
        document.getElementById('value').textContent = `On average, you've been feeling ${averageEmotion}.`;
    }
}

document.getElementById('emotion-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const date = document.getElementById('emotion-date').value;
    const rating = document.getElementById('emotion-rating').value;
    updateGraphAndAverage(new Date(date), rating);
});

// Initialize datepicker if present
const datepicker = document.querySelector('[data-toggle="datepicker"]');
if (datepicker) {
    new Datepicker(datepicker);
}

// Function to fetch emotions when the page loads and initialize the graph
async function fetchAndInitializeEmotions() {
    const response = await fetch('/api/emotions/current-week');
    if (response.ok) {
        const weeklyEmotions = await response.json();
        if (Array.isArray(weeklyEmotions) && weeklyEmotions.length > 0) {
            // Clear the existing data for the new fetch
            emotionChart.data.labels = [];
            emotionChart.data.datasets[0].data = [];
            weeklyEmotions.forEach((emotionRecord) => {
                if (emotionRecord.date && emotionRecord.emotion) {
                    updateGraphAndAverage(new Date(emotionRecord.date), emotionRecord.emotion);
                }
            });
        } else {
            console.log('No emotions recorded for the current week.');
            resetGraphForNewWeek(); // Clear graph if no data
        }
    } else {
        console.error('Failed to fetch weekly emotions:', response.statusText);
    }
}

// Call fetchAndInitializeEmotions on page load to load the graph with weekly data
document.addEventListener('DOMContentLoaded', fetchAndInitializeEmotions);
