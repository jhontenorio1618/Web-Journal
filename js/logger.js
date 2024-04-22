const emotionMessages = {
    1: "Hopeless",
    2: "Terrified",
    3: "Furious",
    4: "Anxious",
    5: "Lonely",
    6: "Irritated",
    7: "Disappointed",
    8: "Confused",
    9: "Nervous",
    10: "Curious",
    14: "Relaxed",
    15: "Hopeful",
    16: "Amazed",
    17: "Content",
    18: "Proud",
    19: "Excited",
    20: "Joyful"
};


document.addEventListener('DOMContentLoaded', function() {
    const emotionForm = document.getElementById('emotion-form');
    const emotionList = document.getElementById('emotion-list'); // Make sure this element is in your HTML


    emotionForm.addEventListener('submit', function(event) {
        event.preventDefault();


        const emotion = document.getElementById('emotion').value;
        const date = document.getElementById('date').value;
        const notes = document.getElementById('log').value;


        fetch('/api/emotions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ emotion, date, notes }),
        })
        .then(response => response.json())
        .then(() => {
            fetchEmotions();
        })
        .catch(error => console.error('Error:', error));
    });


    function fetchEmotions() {
        fetch('/api/emotions')
        .then(response => {
            if (response.ok) return response.json();
            throw new Error('Network response was not ok.');
        })
        .then(emotions => {
            const submissionBox = document.getElementById('submission-box');
            submissionBox.innerHTML = ''; // Clear the submission box
            emotions.forEach(emotionData => {
                const emotionContainer = document.createElement('div');
                emotionContainer.classList.add('emotion-container');
       
                const emotionText = document.createElement('div');
                emotionText.textContent = `${emotionMessages[emotionData.emotion] || 'Emotion'} recorded on ${new Date(emotionData.date).toLocaleDateString()}`;
       
                const emotionNote = document.createElement('div');
                emotionNote.textContent = `Note: ${emotionData.notes}`;
       
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('delete-button');
                deleteButton.dataset.emotionId = emotionData._id; // Assuming the emotion ID is stored in _id property
               
                emotionContainer.appendChild(emotionText);
                emotionContainer.appendChild(emotionNote);
                emotionContainer.appendChild(deleteButton); // Append delete button
               
                submissionBox.appendChild(emotionContainer);
            });
        })
        .catch(error => console.error('Error:', error));
    }
   


    fetchEmotions(); // Load emotions when the page loads
});


function calculateAverage(emotions) {
    const sum = emotions.reduce((a, b) => a + b, 0);
    const average = Math.round(sum / emotions.length);
    return average;
}


function displayAverageEmotion() {
    const average = calculateAverage(pastWeekEmotions);
    console.log("Calculated Average:", average); // Log the calculated average
    const message = emotionMessages[average];
    if (message) {
        const displayText = `${message}`;
        document.getElementById('value').textContent = displayText;
    } else {
        console.error("No message found for average:", average); // Error if no message for average
    }
}
// Simulating the function to run on page load or another trigger 296 1857
window.onload = displayAverageEmotion;


document.addEventListener('DOMContentLoaded', function() {
    // Event listener for delete buttons
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-button')) {
            const emotionId = event.target.dataset.emotionId; // Get the ID of the emotion to delete
            deleteEmotion(emotionId); // Call deleteEmotion function
        }
    });


    // Function to delete emotion
    function deleteEmotion(emotionId) {
        fetch(`/api/emotions/${emotionId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                fetchEmotions(); // Refresh emotions list after deletion
            } else {
                throw new Error('Failed to delete emotion.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});



