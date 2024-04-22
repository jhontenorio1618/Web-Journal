const ctx = document.getElementById('emotion-chart').getContext('2d');
const emotionChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Emotion Level',
            data: [],
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
    return emotions[rating - 1];
}


function updateGraphAndAverage(date, rating) {

    emotionChart.data.labels.push(date);
    emotionChart.data.datasets[0].data.push(parseInt(rating));
    emotionChart.update();


    const average = calculateAverage(emotionChart.data.datasets[0].data);
    const averageEmotion = mapEmotion(average);
    document.getElementById('value').textContent = `On average, you've been feeling ${averageEmotion}.`;
}



document.getElementById('emotion-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const date = document.getElementById('emotion-date').value;
    const rating = document.getElementById('emotion-rating').value;
    updateGraphAndAverage(date, rating);
});


const datepicker = document.querySelector('[data-toggle="datepicker"]');
if (datepicker) {
    new Datepicker(datepicker);
}
