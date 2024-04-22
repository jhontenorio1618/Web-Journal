<<<<<<< HEAD
=======


const emotionMessages = {
   1: "Absolutely Devastated",
   2: "Very Sad",
   3: "Sad",
   4: "Neutral",
    5:"Content",
   6: "Happy",
   7: "Excited",
    8:"Very Excited",
    9:"Ecstatic",
    10:"Absolutely Ecstatic"
};


>>>>>>> 392c6dc (new change)
document.addEventListener('DOMContentLoaded', function() {
    const emotionForm = document.getElementById('emotion-form');
    const submissionBox = document.querySelector('.submission-box');

    emotionForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const emotion = document.getElementById('emotion').value;
        const date = document.getElementById('date').value;
        const notes = document.getElementById('log').value;

        // Simulate adding the logged emotion to the submission box
        const emotionContainer = createEmotionContainer(emotion, date, notes);
        submissionBox.appendChild(emotionContainer);

        // Check if the number of emotion containers exceeds 5
        if (submissionBox.children.length > 5) {
            submissionBox.classList.add('scrollable');
        }

        // Clear form inputs
        emotionForm.reset();
    });

    // Function to create a new emotion container
    function createEmotionContainer(emotion, date, notes) {
        const emotionContainer = document.createElement('div');
        emotionContainer.classList.add('emotion-container');

        const emotionText = document.createElement('div');
        emotionText.textContent = `Emotion: ${emotion}, Date: ${date}`;

        const emotionNote = document.createElement('div');
        emotionNote.textContent = `Note: ${notes}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function() {
            emotionContainer.remove();
            // Check if the number of emotion containers is less than or equal to 5
            if (submissionBox.children.length <= 5) {
                submissionBox.classList.remove('scrollable');
            }
        });

        emotionContainer.appendChild(emotionText);
        emotionContainer.appendChild(emotionNote);
        emotionContainer.appendChild(deleteButton);

        return emotionContainer;
    }
});
