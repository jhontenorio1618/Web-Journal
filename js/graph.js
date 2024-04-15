const emotionData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [{
        label: 'Emotion Level',
        data: [3, 4, 5, 6, 7, 8, 9],
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
        tension: 0.4
    }]
};


// Get the canvas element
const ctx = document.getElementById('emotion_chart').getContext('2d');


ctx.canvas.width = 100;
ctx.canvas.height = 50;

// Initialize a line chart
const emotionChart = new Chart(ctx, {
    type: 'line',
    data: emotionData,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 10
            }
        }
    }
});



document.getElementById('journal_form').addEventListener('submit', function(event) {
    event.preventDefault();
    const journalEntry = document.getElementById('journal_entry').value;

    displayJournalEntry(journalEntry);

    document.getElementById('journal_entry').value = '';
});


function displayJournalEntry(entry) {
    const entryContainer = document.getElementById('past_entries');
    const entryElement = document.createElement('div');
    entryElement.classList.add('past_entry');
    entryElement.innerHTML = `<p>${entry}</p>`;
    entryContainer.prepend(entryElement);
}