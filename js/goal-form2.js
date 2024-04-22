// goal-form.js (client-side)
document.addEventListener('DOMContentLoaded', function() {
    const goalForm = document.getElementById('goal-form');
    const goalList = document.getElementById('goal-list');
 
 
    goalForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const goalContent = document.getElementById('goal').value;
 
 
        fetch('/api/goals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: goalContent }),
        })
        .then(response => {
            if (response.ok) return response.json();
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            document.getElementById('goal').value = ''; // Clear the textarea
            fetchGoals(); // Fetch and display all goals
        })
        .catch(error => console.error('Error:', error));
    });
 
 
    function fetchGoals() {
        fetch('/api/goals')
        .then(response => {
            if (response.ok) return response.json();
            throw new Error('Network response was not ok.');
        })
        .then(goals => {
            goalList.innerHTML = ''; // Clear existing goals
            goals.forEach(goal => {
                const goalItem = document.createElement('div');
                goalItem.textContent = goal.content;
                goalList.appendChild(goalItem);
            });
        })
        .catch(error => console.error('Error:', error));
    }
 
 
    // Fetch and display goals on initial load
    fetchGoals();
 });
 