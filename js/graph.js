



const emotionData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [{
        label: 'Emotion Level',
        data: [3, 4, 5, 6, 7, 8, 9], // Sample emotion levels
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
        tension: 0.4
    }]
};


// Get the canvas element
const ctx = document.getElementById('emotion_chart').getContext('2d');

// Set custom width and height for the canvas element
ctx.canvas.width = 400; // Set the width to 800 pixels
ctx.canvas.height = 100; // Set the height to 400 pixels

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


// Function to handle form submission
document.getElementById('journal_form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    const journalEntry = document.getElementById('journal_entry').value;
    // Here you can save the journal entry to a database or perform any other action
    // For now, let's just display the journal entry below the form
    displayJournalEntry(journalEntry);
    // Clear the textarea after submission
    document.getElementById('journal_entry').value = '';
});

// Function to display a journal entry
function displayJournalEntry(entry) {
    const entryContainer = document.getElementById('past_entries');
    const entryElement = document.createElement('div');
    entryElement.classList.add('past_entry');
    entryElement.innerHTML = `<p>${entry}</p>`;
    entryContainer.prepend(entryElement); // Add new entry to the beginning of the list
}