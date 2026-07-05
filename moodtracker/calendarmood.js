const firebaseConfig = {
    apiKey: "AIzaSyDZesxg3YrK-qU3DLziCDYc_SJz83qZAE8",
    authDomain: "mood-tracker-ca314.firebaseapp.com",
    projectId: "mood-tracker-ca314",
    storageBucket: "mood-tracker-ca314.appspot.com",
    messagingSenderId: "899895203785",
    appId: "1:899895203785:web:2ebfae24eb7a3c031afa18"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const moodPopup = document.getElementById('mood-popup');
    const saveMoodButton = document.getElementById('save-mood');
    let selectedDate;

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        dateClick: function(info) {
            const today = new Date(); 
            const clickedDate = new Date(info.dateStr); 

            if (clickedDate > today) {
                alert("You can't select a future date!");
                return;
            }

            selectedDate = info.dateStr;

            moodPopup.style.display = 'block';
        }
    });
    calendar.render();

    window.addEventListener('click', function(event) {
        if (event.target === moodPopup) {
            moodPopup.style.display = 'none';
            resetMoodSelection(); 
        }
    });

    saveMoodButton.onclick = function() {
        const selectedMood = document.querySelector('.mood-image.selected')?.getAttribute('data-mood');
        if (selectedMood && selectedDate) {
            const user = auth.currentUser; 
            if (user) {
                db.collection('moods').add({
                    date: selectedDate,
                    mood: selectedMood,
                    userId: user.uid, 
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })

                .then(() => {
                    console.log('Mood saved successfully!');
                    moodPopup.style.display = 'none';
                    window.location.href = `../journal/journal.html?date=${selectedDate}&mood=${selectedMood}`;
                })

                .catch((error) => {
                    console.error('Error saving mood: ', error);
                });
            } else {
                alert('User not logged in.');
            }
        } else {
            alert('Please select a mood before saving.');
        }
    };

    function resetMoodSelection() {
        document.querySelectorAll('.mood-image').forEach(img => img.classList.remove('selected'));
    }

    function onMoodAndDateSelected(selectedMood, selectedDate) {
        console.log('Redirecting to journal with date:', selectedDate, 'and mood:', selectedMood);
        window.location.href = `journal.html?date=${selectedDate}&mood=${selectedMood}`;
    }
    
    document.querySelectorAll('.mood-image').forEach(image => {
        image.addEventListener('click', () => {
            if (image.classList.contains('selected')) {
                image.classList.remove('selected'); 
            } else {
                document.querySelectorAll('.mood-image').forEach(img => img.classList.remove('selected'));
                image.classList.add('selected'); 
            }
        });
    });
});
