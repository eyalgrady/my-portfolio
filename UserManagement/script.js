const registrationForm = document.getElementById('registrationForm');
const loginForm = document.getElementById('loginForm');
const container = document.querySelector('.main-container');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const card = document.querySelector('.card');
const cardP = document.querySelector('.card-p');
const closeBtn = document.querySelector('.close-btn');

import { users } from './users.js';
localStorage.setItem('users', JSON.stringify(users));

registerLink.addEventListener('click', () => {
    container.classList.add('active');
})

loginLink.addEventListener('click', () => {
    container.classList.remove('active');
})

class User {
    firstName;
    lastName;
    email;
    password;
    isLogedIn;

    constructor(firstName, lastName, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.isLogedIn = false;

        users.push(this);
    }
}


const userFirstName = document.getElementById('userFirstName');
const userLastName = document.getElementById('userLaststName');
const userEmail = document.getElementById('userEmail');
const userPass = document.getElementById('userPass');
const inputs = document.querySelectorAll('.input-field')


function checkInputs() {
    for (const input of inputs) {
        if (input.value == '') {
            input.classList.add('error');
            input.parentElement.classList.add('error');
        }

        if (inputs[2].value != '') {
            checkEmail();
        }

        inputs[2].addEventListener('keyup', () => {
            checkEmail();
        })

        if (inputs[3].value != '') {
            checkPassword();
        }
        inputs[3].addEventListener('keyup', () => {
            checkPassword();
        })

        input.addEventListener('keyup', () => {
            if (input.value != "") {
                input.classList.remove('error');
                input.parentElement.classList.remove('error');
            }
            else {
                input.classList.add('error');
                input.parentElement.classList.add('error');
            }
        })
    }
}

function checkEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
    const errorTxtEmail = document.querySelector('.error-txt.email')
    if (!userEmail.value.match(emailRegex)) {
        userEmail.classList.add('error');
        userEmail.parentElement.classList.add('error');

        if (userEmail.value != '') {
            errorTxtEmail.innerText = 'Enter a valid email address'
        } else {
            errorTxtEmail.innerText = "Email Address can't be blank"
        }
    } else {
        userEmail.classList.remove('error');
        userEmail.parentElement.classList.remove('error');
    }
}

function checkPassword() {
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;
    
    const errorTxtPass = document.querySelector('.error-txt.password')
    if (!userPass.value.match(passRegex)) {
        userPass.classList.add('error');
        userPass.parentElement.classList.add('error');

        if (userPass.value !== '') {
            errorTxtPass.innerText = 'Password must include at least one lowercase letter (a-z), one uppercase letter (A-Z), one number (0-9) and one special character'
        } else {
            errorTxtPass.innerText = "Password can't be blank"
        }
    } else {
        userPass.classList.remove('error');
        userPass.parentElement.classList.remove('error');
    }
}

registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    checkInputs();

    if (!userFirstName.classList.contains('error') && !userLastName.classList.contains('error') && !userEmail.classList.contains('error') && !userPass.classList.contains('error')) {

        const firstName = inputs[0].value;
        const lastName = inputs[1].value;
        const email = inputs[2].value;
        const pass = inputs[3].value;

        console.log('Received email:', email);
        console.log('Received password:', pass);

        const newUser = new User(firstName, lastName, email, pass);
        // localStorage.setItem("newUser", JSON.stringify(newUser));
        // console.log(newUser)

        // const user = users.find((user) => user.firstName === firstName && user.lastName === lastName && user.email === email && user.password === pass );

        // const index = users.indexOf(newUser);
        // users[index] = newUser;
        // localStorage.setItem('users', JSON.stringify(users));
        const usersArray = JSON.parse(localStorage.getItem('users')) || [];
        usersArray.push(newUser);
        localStorage.setItem('users', JSON.stringify(usersArray));

    

        card.style.display = 'block';
        cardP.innerHTML = `Hi ${firstName} ${lastName}!<br>
            login details:<br>
            Email: ${email}<br>
            password: ${pass}
        `;
        registrationForm.reset();
    }


})


loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const loginEmail = document.getElementById('loginEmail').value;
    const loginPass = document.getElementById('loginPass').value;
    login(loginEmail, loginPass);

    loginForm.reset();
})

const login = (email, password) => {
const user = users.find((user) => user.email === email && user.password === password);
if (user) {
console.log('התחברת בהצלחה!');
// עדכון סטטוס ההתחברות למשתמש
user.isLogedIn = true;
    // עדכון המשתמש ברשימת המשתמשים
const index = users.indexOf(user);
    users[index] = user;
    localStorage.setItem('users', JSON.stringify(users));
window.location.href = './userList.html';

} else {
console.log('שם המשתמש או הסיסמא אינם נכונים.');
alert('ERROR: Missing details');
}}


closeBtn.addEventListener("click", () => {
card.style.display = "none";
container.classList.remove('active');
});
