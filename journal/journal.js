document.addEventListener('DOMContentLoaded', () => {
    const db = firebase.firestore();

    const urlParams = new URLSearchParams(window.location.search);
    const selectedMood = urlParams.get('mood');
    const selectedDate = urlParams.get('date');

    console.log('Selected Mood:', selectedMood); 
    console.log('Selected Date:', selectedDate); 

    firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            alert('User not logged in. Please log in to continue.');
            window.location.href = '../login/login.html'; 
        } else {
            console.log('User logged in:', user.email);
            attachSaveEvent(db, selectedMood, selectedDate, user.uid);
        }
    });
});

function attachSaveEvent(db, selectedMood, selectedDate, userId) {
    document.getElementById('save-journal').addEventListener('click', async () => {
        const journalEntry = document.getElementById('journal-entry').value;

        try {
            await db.collection('journals').add({
                userId: userId,
                entry: journalEntry || '', 
                mood: selectedMood,
                date: selectedDate, 
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            console.log('Journal entry saved successfully!');
            window.location.href = `../thankyou/thankyou.html?date=${selectedDate}&mood=${selectedMood}`;
        } catch (error) {
            console.error('Error saving journal entry: ', error);
            alert('Failed to save the journal entry. Please try again.');
        }
    });
}

