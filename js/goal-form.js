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

        // Update latest goal content and save to session storage
        const latestGoal = document.getElementById('last-goal');
        latestGoal.textContent = goalText;
        sessionStorage.setItem('latestGoal', goalText);

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
