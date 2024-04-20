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


/*
-  GOAL FORM
 */
document.getElementById('goal-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const goalInput = document.getElementById('goal');
    const goalText = goalInput.value.trim();

    if (goalText !== '') {

        const goalList = document.getElementById('goal-list');
        const goalItem = document.createElement('div');
        goalItem.classList.add('goal-item');


        const dateSpan = document.createElement('span');
        dateSpan.className = 'date-span';


        const currentDate = new Date();
        const dateString = currentDate.toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
        dateSpan.textContent = ` - Posted on ${dateString}`;


        goalItem.textContent = goalText;
        goalItem.appendChild(dateSpan);


        if (goalList.firstChild) {
            goalList.insertBefore(goalItem, goalList.firstChild);
        } else {
            goalList.appendChild(goalItem);
        }


        goalInput.value = '';
    }
});

function autoExpand(field) {
    // Reset the field height to ensure the scroll height is measured correctly
    field.style.height = 'auto';

    // Calculate the height
    const computed = window.getComputedStyle(field);
    const height = field.scrollHeight + parseInt(computed.getPropertyValue('border-top-width'), 10) +
        parseInt(computed.getPropertyValue('padding-top'), 10) +
        parseInt(computed.getPropertyValue('padding-bottom'), 10) +
        parseInt(computed.getPropertyValue('border-bottom-width'), 10);

    // Set the new height
    field.style.height = `${height}px`;
}
