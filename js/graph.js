const ctx = document.getElementById('emotion-chart').getContext('2d');
const emotionChartCanvas = document.getElementById('emotion-chart');

// Set the width and height of the canvas element using vw and vh units
emotionChartCanvas.style.width = '40vw'; // 80% of viewport width
emotionChartCanvas.style.height = '35vh'; // 50% of viewport height

const emotionChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Emotion Level',
            data: [], // Sample data, replace with actual emotion levels
            borderColor: 'blue', // Line color
            backgroundColor: 'rgba(0, 0, 255, 0.2)', // Fill color (blue with 20% opacity)
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

// Handle form submission
document.getElementById('emotion-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const date = document.getElementById('emotion-date').value;
    const rating = document.getElementById('emotion-rating').value;

    // Update data in the chart
    emotionChart.data.labels.push(date); // Push date to labels array
    emotionChart.data.datasets[0].data.push(parseInt(rating)); // Push rating to data array
    emotionChart.update(); // Update the chart
});

// Initialize Datepicker
const datepicker = document.querySelector('[data-toggle="datepicker"]');
if (datepicker) {
    new Datepicker(datepicker);
}
