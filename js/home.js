function displayJournalEntry(entry) {
    const entryContainer = document.getElementById('past_entries');
    const entryElement = document.createElement('div');
    entryElement.classList.add('past_entry');
    entryElement.innerHTML = `<p>${entry}</p>`;
    entryContainer.prepend(entryElement);
}

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
    // Cycle through messages based on the day of the year
    document.getElementById('message').textContent = emotionalAcceptanceMessages[dayOfYear % emotionalAcceptanceMessages.length];
}

document.addEventListener('DOMContentLoaded', showMessage); // This will run the function when the page loads





