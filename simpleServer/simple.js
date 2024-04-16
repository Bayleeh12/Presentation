const express = require('express');
const app = express();

let correctPassword = null;

// Function to continuously loop and find the password
function findPassword() {
    for (let i = 0; i < 10000; i++) {
        const paddedPassword = String(i).padStart(4, '0');
        if (checkPassword(paddedPassword)) {
            correctPassword = paddedPassword;
            console.log(`Password found: ${correctPassword}`);
            return;
        }
    }
}

// Function to check if a password is correct
function checkPassword(password) {
    // You can implement your password checking logic here
    // For example, if the correct password is '1234':
    return password === '1234';
}

// Start finding the password immediately when the server starts
findPassword();
// Then, keep running every 5 seconds
setInterval(findPassword, 5000);

// Route to check if the password has been found
app.get('/check-password', (req, res) => {
    if (correctPassword) {
        res.send(`The password is ${correctPassword}`);
    } else {
        res.send('Password not found yet. Please try again later.');
    }
});

// Start the server
const PORT = process.env.PORT || 3081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
