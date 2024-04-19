function displayJournalEntry(entry) {
    const entryContainer = document.getElementById('past_entries');
    const entryElement = document.createElement('div');
    entryElement.classList.add('past_entry');
    entryElement.innerHTML = `<p>${entry}</p>`;
    entryContainer.prepend(entryElement);
}

function showMessage() {
    const emotionalAcceptanceMessages = [

        "Accepting your emotions is a crucial step in personal growth. It allows you to move through feelings, rather than getting stuck in them, fostering resilience and adaptability.",
        ];

    const today = new Date();
    const dayOfYear = (Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(today.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
    // Cycle through messages based on the day of the year
    document.getElementById('message').textContent = emotionalAcceptanceMessages[dayOfYear % emotionalAcceptanceMessages.length];
}

document.addEventListener('DOMContentLoaded', showMessage); // This will run the function when the page loads
