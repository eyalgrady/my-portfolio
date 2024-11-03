const userTableBody = document.getElementById("userTableBody");
const users = JSON.parse(localStorage.getItem('users'));

// Initialize the table
function initializeTable() {
    users.forEach((user) => {
        addUserToTable(user);
    });
}

function addUserToTable(user) {
    let row = userTableBody.insertRow();

    for (let key in user) {

        let cell = row.insertCell();
        cell.textContent = user[key];

        if (key !== "isLogedIn" && user.isInEditMode == true) {
            cell.setAttribute("contentEditable", "true");
            cell.addEventListener("blur", () => {
                user[key] = cell.textContent;
            });
        }

        if (key === "isLogedIn") {
            cell.textContent ='';
            let statusDiv = document.createElement("div");
            statusDiv.className = "statusDiv";
            statusDiv.textContent = user.isLogedIn ? "Online" : "Offline";
            statusDiv.style.backgroundColor = user.isLogedIn ? "green" : "orange";
            cell.style.display = 'flex';
            cell.style.justifyContent = 'center';
            cell.appendChild(statusDiv);
        }
    }

    let operations = row.insertCell();
    let operationsDiv = document.createElement("div");
    operationsDiv.className = "operationsDiv";

    let editBtn = document.createElement("button");
    editBtn.className = "editBtn operationsBtn";
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", () => {
        if (editBtn.textContent === "Edit") {
            row.classList.add("editMode");
            editBtn.textContent = "Save";
            editBtn.style.background = "blue";
            user.isInEditMode = true;

            for (let i = 0; i < row.cells.length; i++) {
                let cell = row.cells[i];
                let key = Object.keys(user)[i];
                if (key !== "isLogedIn") {
                    cell.setAttribute("contentEditable", "true");
                }
            }

        } else {
            row.classList.remove("editMode");
            editBtn.textContent = "Edit";
            editBtn.style.background = "darkblue";
            user.isInEditMode = false;

            for (let i = 0; i < row.cells.length - 1; i++) {
                let cell = row.cells[i];
                let key = Object.keys(user)[i];

                if (key !== "isLogedIn") {
                    cell.removeAttribute("contentEditable");
                    user[key] = cell.textContent;
                    localStorage.setItem('users', JSON.stringify(users));
                    delete user.isInEditMode;     
                }
            }
        }
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.className = "deleteBtn operationsBtn";
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
        const index = users.indexOf(user);

        if (index !== -1) { // אם המשתמש נמצא במערך
            const deleteConfirmed = confirm('Are you sure you want to delete your account?');
            if (deleteConfirmed) {
                users.splice(index, 1); // מחק את המשתמש מהמערך
                localStorage.setItem('users', JSON.stringify(users)); // עדכן את המערך בlocalStorag
                alert('Account deleted successfully!');
                location.href = "./index.html";
            }
        }
    });

    operations.appendChild(editBtn);
    operations.appendChild(deleteBtn);
    operations.appendChild(operationsDiv);
}

initializeTable();


const logOutBtn = document.querySelector(".logOut-Btn");

logOutBtn.addEventListener("click", () => {

    const logoutConfirmed = confirm('Are you sure you want to logout?');
        
    if (logoutConfirmed) {
        // Find the current user in the users array
        const currentUser = users.find(user => user.isLogedIn === true);

        if (currentUser) {
            // Change the login status of the current user
            currentUser.isLogedIn = false;
            localStorage.setItem('users', JSON.stringify(users));
            location.href = "./index.html";
        } 
        
        location.href = "./index.html";
        updateStatusOnPage();
    }
});


function updateStatusOnPage() {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const statusElements = document.querySelectorAll(".statusDiv");
    statusElements.forEach((statusElement, index) => {
        const user = users[index];
        if (user && user.hasOwnProperty('isLogedIn')) { // בדיקה אם המפתח קיים במשתנה user
            const userStatus = user.isLogedIn;
            statusElement.textContent = userStatus ? "Online" : "Offline";
            statusElement.style.backgroundColor = userStatus ? "green" : "orange";
        }
    });
    
    localStorage.setItem('users', JSON.stringify(users));
}


