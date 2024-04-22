// logger.js
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
        .then(data => {
            addEmotionToUI(data);
            fetchEmotions();
        })
        .catch(error => console.error('Error:', error));
    });

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-button')) {
            const emotionId = event.target.dataset.emotionId;
            deleteEmotion(emotionId);
        }
    });

    fetchEmotions(); // Initial fetch to load emotions
});

function addEmotionToUI(emotion) {
    const submissionBox = document.getElementById('submission-box');
    const emotionContainer = document.createElement('div');
    emotionContainer.classList.add('emotion-container');
    const emotionText = document.createElement('div');
    emotionText.textContent = `${emotionMessages[emotion.emotion] || 'Emotion'} recorded on ${new Date(emotion.date).toLocaleDateString()}`;
    const emotionNote = document.createElement('div');
    emotionNote.textContent = `Note: ${emotion.notes}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.dataset.emotionId = emotion._id;

    emotionContainer.appendChild(emotionText);
    emotionContainer.appendChild(emotionNote);
    emotionContainer.appendChild(deleteButton);
    submissionBox.appendChild(emotionContainer);
}

function fetchEmotions() {
    fetch('/api/emotions')
    .then(response => {
        if (response.ok) return response.json();
        throw new Error('Network response was not ok.');
    })
    .then(emotions => {
        const submissionBox = document.getElementById('submission-box');
        submissionBox.innerHTML = ''; // Clear the box
        emotions.forEach(addEmotionToUI);
    })
    .catch(error => console.error('Error:', error));
}

function deleteEmotion(emotionId) {
    fetch(`/api/emotions/${emotionId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            fetchEmotions(); // Refresh emotions list after deletion
        } else {
            throw new Error('Failed to delete emotion.');
        }
    })
    .catch(error => console.error('Error:', error));
}
