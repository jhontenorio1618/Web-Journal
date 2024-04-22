const ctx = document.getElementById('emotion-chart').getContext('2d');
const canvas = document.getElementById('emotion-chart');

// Set the width and height of the canvas element
canvas.width = 600; // Set width to 600 pixels
canvas.height = 400; // Set height to 400 pixels

const emotionChart = new Chart(ctx, {
    type: 'scatter', // Change chart type to scatter plot
    data: {
        datasets: [{
            label: 'Emotion Level',
            data: [], // Sample data, replace with actual emotion levels
            borderColor: 'rgba(255, 159, 64, 1)', // Orange color for all emotions
            backgroundColor: 'rgba(255, 159, 64, 0.5)', // Semi-transparent fill color
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            x: {
                type: 'time', // Use time scale for x-axis
                time: {
                    unit: 'day' // Display data by day
                },
                beginAtZero: true
            },
            y: {
                beginAtZero: true,
                suggestedMax: 10 // Assuming the emotion level is rated on a scale of 0 to 10
            }
        },
        plugins: {
            legend: {
                display: false // Hide legend
            },
            title: {
                display: true,
                text: 'Emotion Chart' // Chart title
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
    emotionChart.data.datasets[0].data.push({ x: new Date(date), y: parseInt(rating) });
    emotionChart.update();
});

// Initialize Datepicker
const datepicker = document.querySelector('[data-toggle="datepicker"]');
if (datepicker) {
    new Datepicker(datepicker);
}
