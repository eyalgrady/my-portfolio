let createProjectLayout = document.getElementById('createProjectLayout');
let savedProjectLayout = document.getElementById('savedProjectLayout');

let optionsButtons = document.querySelectorAll('.option-button');
let advancedOptionsButtons = document.querySelectorAll('.adv-option-button');
let fontName = document.getElementById('fontName');
let fontSizeRef = document.getElementById('fontSize');
let fontColor = document.getElementById('fontColor');
let alignButtons = document.querySelectorAll('.align');
let formatButtons = document.querySelectorAll('.format');
let scriptButtons = document.querySelectorAll('.script');

const bgcInput = document.getElementById('bgcInput');
const widthInput = document.getElementById("widthInput");
const heightInput = document.getElementById("heightInput");
const addBtn = document.getElementById("addBtn");
const deleteBtn = document.getElementById("deleteBtn");

let fontList = [
    'Arial',
    'Calibri',
    'Century Gothic',
    'Courier New',
    'cursive',
    'Garamond',
    'Georgia',
    'Helvetica',
    'Open Sans',
    'Palatino', 
    'Times New Roman',
    'Tahoma',
    'Trebuchet MS',
    'Vardana',
    'Roboto',
];

// text - format
// ---------------------------------

const initializer = () => {

    highlighter(alignButtons, true);
    highlighter(formatButtons, true);
    highlighter(scriptButtons, true);

    fontList.map(value => {
        let option = document.createElement('option');
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    for (let i = 1; i <= 7; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    }
    fontSizeRef.value = 3;
};

const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
};

optionsButtons.forEach((button) => {
    button.addEventListener('click', () => {
        modifyText(button.id, false, null);
    })
})

advancedOptionsButtons.forEach((button) => {
    button.addEventListener('change', () => {
        modifyText(button.id, false, button.value);
    })
})

fontColor.addEventListener('change', () => {
    let fontColorValue = fontColor.value;
    let selectedElement = createProjectLayout.querySelector('.element');
    selectedElement.style.color = fontColorValue;
});

const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener('click', () => {
            if (needsRemoval) {
                let alreadyActive = false;

                if (button.classList.contains('active')) {
                    alreadyActive = true;
                }

                highlighterRemover(className);
                if (!alreadyActive) {
                    button.classList.add('active');
                }
            } else {
                button.classList.toggle('active');
            }
        })
    })
}

const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove('active');
    })
}


// create - element - container
// ---------------------------------

addBtn.addEventListener('click', createRow);

let rows = [];

function createRow() {

    createProjectLayout.style.display = 'flex';
    savedProjectLayout.style.display = 'none';

    let row = document.createElement("div");
    row.classList.add("row");
    createProjectLayout.appendChild(row);
    
    let addButton = document.createElement("button");
        addButton.innerHTML = '<i class="fa-solid fa-plus"></i>';
        addButton.classList.add('btn', 'addButton');
        addButton.addEventListener("click", function () {
            addElement(row);
        });
    row.appendChild(addButton);

    rows.push(row);
    addElement(row);

    addBtn.disabled = true;
    addBtn.style.display = 'none';
    saveBtn.style.display = 'block';
    deleteBtn.style.display = 'block';
}

function addElement(row) {

    let newElement = document.createElement("div");
    newElement.classList.add("new-Element");
    row.appendChild(newElement);

    let element = document.createElement("div");
    let elementId = generateUniqueId(); // יצירת מזהה ייחודי
    element.setAttribute("data-id", elementId); // הוספת מאפיין עם המזהה הייחודי
    element.classList.add("element");
    element.setAttribute("contenteditable", true); 
    newElement.appendChild(element);
    // rows.push(row);

    // elementToolsWrapper
    let elementToolsWrapper = document.createElement("div");
    elementToolsWrapper.classList.add("elementToolsWrapper", "center");
    newElement.appendChild(elementToolsWrapper);

    // elementSize
    let widthDiv = document.createElement("div");
    let heightDiv = document.createElement("div");

    widthDiv.classList.add("elementSize");
    heightDiv.classList.add("elementSize");
    
    let widthInput = document.createElement("input");
    let heightInput = document.createElement("input");

    let widthSpan = document.createElement("span");
    let heightSpan = document.createElement("span");

    widthInput.setAttribute("type", "number");
    heightInput.setAttribute("type", "number");

    widthInput.setAttribute("min", "0");
    heightInput.setAttribute("min", "0");

    widthInput.setAttribute("id", "widthInput");
    heightInput.setAttribute("id", "heightInput");

    widthInput.classList.add("sizetInput");
    heightInput.classList.add("sizetInput");

    widthInput.setAttribute("placeholder", "Width");
    heightInput.setAttribute("placeholder", "Height");
    
    widthSpan.classList.add("center")
    widthSpan.classList.add("center")

    heightSpan.textContent = " px";
    widthSpan.textContent = " px";

    widthDiv.appendChild(widthInput);
    heightDiv.appendChild(heightInput);

    widthDiv.appendChild(widthSpan);
    heightDiv.appendChild(heightSpan);
        
    widthInput.addEventListener('change', () => {
        let width = widthInput.value;
        element.style.width = width + "px";
        newElement.style.width = width + "px";
    })

    heightInput.addEventListener('change', () => {
        let height = heightInput.value;
        element.style.height = height + "px";
    })

    // elementBgc
    let bgcInput = document.createElement("input");
    bgcInput.setAttribute("type", "color");
    bgcInput.setAttribute("id", "bgcInput");

    bgcInput.addEventListener('change', () => {
        let elementBgcColor = bgcInput.value;
        element.style.backgroundColor = elementBgcColor;
    })

    // imageInput
    let imageInput = document.createElement("input");
    imageInput.classList.add("input-file");
    imageInput.id = 'fileInput';
    imageInput.type = "file"; // קביעת סוג ה-input ל-file

    const customFileUpload = document.createElement('label');
    customFileUpload.htmlFor = 'fileInput';
    customFileUpload.classList.add('custom-file-upload');
    // customFileUpload.innerHTML = '<i class="fa-solid fa-image"></i>';
    customFileUpload.innerHTML = '<i class="fa-regular fa-image"></i>';
    
    imageInput.addEventListener("change", (event) => {
        
        let file = event.target.files[0]; // מוצא את הקובץ שנבחר
        let imageUrl = URL.createObjectURL(file); // יצירת כתובת URL לקובץ התמונה
        element.style.backgroundImage = `url(${imageUrl})`; // הגדרת התמונה כרקע לאלמנט
    });

    elementToolsWrapper.appendChild(widthDiv);
    elementToolsWrapper.appendChild(heightDiv);
    elementToolsWrapper.appendChild(bgcInput);
    elementToolsWrapper.appendChild(imageInput);
    elementToolsWrapper.appendChild(customFileUpload);
}

// save - project
// --------------------------------

const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", function () {
    if ('rows'.length > 0) {
        saveRow(rows[rows.length - 1]);
    } else {
        alert("אין שורה לשמירה");
    }
});

function saveRow(row) {
    clearFields(row);
    displaySavedElement(row); 
}

function clearFields(row) {
    createProjectLayout.style.display = 'none';
    savedProjectLayout.style.display = 'flex';
    addBtn.style.display = 'flex';
    saveBtn.style.display = 'none';

    const rows = document.querySelectorAll('.row');
    rows.forEach(r => {
let addButton = r.querySelector("button");

    if (addButton) {
        addButton.style.display = "none";
    }
    addBtn.disabled = false;
        r.style.margin = '0';
    r.style.width = '100%';
    r.style.height = '100%';
    });
    
    const elementToolsWrapper = document.querySelectorAll('.elementToolsWrapper');
    elementToolsWrapper.forEach(e => e.style.display = 'none');

    const elements = document.querySelectorAll('.element');
    elements.forEach(e => {
        e.style.border = 'none'
        e.style.width = '100%'
    });

    // row.style.margin = '0';
    // row.style.width = '100%';
    // row.style.height = '100%';
}

function displaySavedElement() {
    savedProjectLayout.innerHTML = '';

    const elementId = generateUniqueId();
    const elementData = {
    id: elementId,
    html: createProjectLayout.innerHTML
    };
    
    localStorage.setItem(elementId, JSON.stringify(elementData));

    for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const savedElementData = JSON.parse(localStorage.getItem(key));
    const savedElement = document.createElement('div');
    savedElement.classList.add('savedElement');
    savedElement.innerHTML = savedElementData.html;
    savedProjectLayout.appendChild(savedElement);
    }

    const savedElements = createProjectLayout.querySelectorAll('.element');

    savedElements.forEach(element => {
        element.setAttribute("contenteditable", false);
        element.style.border = 'none';
    });

    createProjectLayout.innerHTML = "";
}

function generateUniqueId() {
    // יצירת מזהה ייחודי באמצעות קומבינציה של תאריך ומספר רנדומלי
    const timestamp = new Date().getTime();
    const randomId = Math.random().toString(36).substring(2);
    return `${timestamp}-${randomId}`;
}

// delete element
// ---------------------------------

deleteBtn.addEventListener('click', deleteElement);

function deleteElement() {
    addBtn.disabled = false;
    addBtn.style.display = 'flex';
    saveBtn.style.display = 'none';

    const lastKey = localStorage.key(localStorage.length - 1);
    const lastDivCreated = createProjectLayout.lastChild;
    const lastDivSaved = savedProjectLayout.lastChild;


    if (lastKey) {
        localStorage.removeItem(lastKey);
    }

    if (lastDivSaved) {
        savedProjectLayout.removeChild(lastDivSaved);
    } else if (lastDivCreated) {
        createProjectLayout.removeChild(lastDivCreated);
    }

    if (!lastDivSaved && !lastDivCreated) {
        createProjectLayout.style.display = 'none';
        savedProjectLayout.style.display = 'none';
        deleteBtn.style.display = 'none';
    }
}

function loadElements() {
    savedProjectLayout.innerHTML = ""; // ניקוי התוכן הקיים
    
    if (localStorage.length === 0) {
        return; // יציאה מהפונקציה אם אין מידע ב־localStorage
    }

    for (i = 0; i < localStorage.length; i++) {
        deleteBtn.style.display = 'block';
        const key = localStorage.key(i);
        const elementHTML = JSON.parse(localStorage.getItem(key));

        const savedElement = document.createElement("div");
        savedElement.classList.add('savedElement');
        savedElement.innerHTML = elementHTML.html;
        savedProjectLayout.appendChild(savedElement);

        savedProjectLayout.style.display = 'flex';
    }
}


// function addImageToElement(imageDataUrl) {
//     const img = document.createElement('img');
//     img.src = imageDataUrl;
//     img.style.maxWidth = '100%'
//     img.style.height = 'auto'
    
//     // הוסף את התמונה לתוך האלמנט הנבחר
//     const selectedElement = createProjectLayout.querySelector('.element:focus');
//     if (selectedElement) {
//         selectedElement.appendChild(img);
//     }
// }



window.onload = function() {
    initializer();
    loadElements()
};