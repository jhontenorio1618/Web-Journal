// Function to display journal entry
function displayJournalEntry(entry) {
    const entryContainer = document.getElementById('past_entries');
    const entryElement = document.createElement('div');
    entryElement.classList.add('past_entry');
    entryElement.innerHTML = `<p>${entry}</p>`;
    entryContainer.prepend(entryElement);
}

// Function to display message of the day
function showMessage() {
    const emotionalAcceptanceMessages = [
        "\"Accepting your emotions means allowing yourself to be vulnerable. In vulnerability, there is a strength that comes from being honest about how you truly feel.\"",
        "\"Every emotion carries its own wisdom. Accepting your emotions allows you to learn from them, understanding deeper truths about yourself and how you relate to the world.\"",
        "\"Your emotions are signals, not enemies. They alert you to what's really going on beneath the surface, guiding you to address needs that might otherwise go unnoticed.\"",
        "\"Resistance to emotions often creates more turmoil. Accepting your emotions can lead to peace, as it involves acknowledging what is present without judgment.\"",
        "\"Accepting your emotions is a crucial step in personal growth. It allows you to move through feelings, rather than getting stuck in them, fostering resilience and adaptability.\"",
        "\"When you accept your emotions, you align more closely with your true self. This authenticity is powerful, drawing respect and genuine relationships.\"",
        "\"You cannot heal what you do not acknowledge. Accepting your emotions is the first step towards healing and improving your emotional wellbeing.\""
    ];

    const today = new Date();
    const dayOfYear = (Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(today.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
    
    // Display message of the day based on the day of the year
    document.getElementById('message').textContent = emotionalAcceptanceMessages[dayOfYear % emotionalAcceptanceMessages.length];
}



// Add event listener to the form for emotion submission
document.getElementById('emotion-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const date = document.getElementById('emotion-date').value;
    const rating = parseInt(document.getElementById('emotion-rating').value, 10);
    const data = { date: date, rating: rating };

    const response = await fetch('/api/emotions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        // Refresh the graph with the new data
        fetchAndInitializeEmotions();
    } else {
        // Error handling
        console.error('Failed to save emotion data:', response.statusText);
    }
});

function updateGraphWithNewData(data) {
    // Clear existing data
    emotionChart.data.labels = [];
    emotionChart.data.datasets.forEach((dataset) => {
        dataset.data = [];
    });

    // Add new data
    data.forEach((emotionEntry) => {
        emotionChart.data.labels.push(new Date(emotionEntry.date).toLocaleDateString());
        emotionChart.data.datasets[0].data.push(emotionEntry.emotion);
    });

    emotionChart.update();

    // Update the average emotion display
    const average = calculateAverage(emotionChart.data.datasets[0].data);
    const averageEmotion = mapEmotion(average);
    document.getElementById('value').textContent = `On average, you've been feeling ${averageEmotion}.`;
}

function resetGraphForNewWeek() {
    emotionChart.data.labels = [];
    emotionChart.data.datasets.forEach((dataset) => {
        dataset.data = [];
    });
    emotionChart.update();

    // You may also want to reset the average display
    document.getElementById('value').textContent = 'No data for this week yet.';
}

// Function to fetch and render weekly emotions
async function fetchAndRenderWeeklyEmotions() {
    const response = await fetch('/api/emotions/current-week');
    if (response.ok) {
        const weeklyEmotions = await response.json();
        updateGraphWithNewData(weeklyEmotions);
    } else {
        console.error('Failed to fetch weekly emotions:', response.statusText);
    }
}

// Run the showMessage function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    showMessage();
    fetchAndRenderWeeklyEmotions(); // Fetch weekly emotions and update the graph
});

// This function is called periodically to check if a new week has started and reset the graph if it has
function checkAndResetForNewWeek() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    if (dayOfWeek === 0) { // Assuming you want to reset on Sunday
        resetGraphForNewWeek();
    }
}

// Set up an interval to check for a new week
setInterval(checkAndResetForNewWeek, 86400000); // Check every day (86400000 milliseconds in a day)
