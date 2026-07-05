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

document.getElementById('login-btn').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            const userId = userCredential.user.uid; 
            localStorage.setItem('userId', userId); 
            window.location.href = "../moodtracker/calendarmood.html";
        })

        .catch(error => {
            alert(error.message);
        });
});


document.getElementById('signup-btn').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            const userId = userCredential.user.uid; 
            localStorage.setItem('userId', userId); 
            window.location.href = "../moodtracker/calendarmood.html";
        })
        .catch(error => {
            alert(error.message);
        });
});

function getCurrentUserId() {
    return localStorage.getItem('userId');
}

