// < !-- ============= toggle icon navbar ================ -->
let menuIcon = document.querySelector(".menu-icon");
let navBar = document.querySelector(".nav-bar");

menuIcon.onclick = () => {
  // menuIcon.classList.toggle("fa-x");
  navBar.classList.toggle("active");
};
// < !-- ============= scroll sections active link ================ -->

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  // < !-- ============= remove toggle icon and navbar when click navbar link (scroll) ================ -->
  menuIcon.classList.remove("fa-x");
  navBar.classList.remove("active");
};

// < !-- ============= Scroll Reveal ================ -->
ScrollReveal({
  reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(".home-img, .skills-container", { origin: "bottom" });
ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });

// < !-- ============= typed js ================ -->
const typed = new Typed(".multiple-text", {
  strings: ["Frontend Developer", "SEO Specialist", "Marcom Manager"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

// < !-- =============  ================ -->

let loadMoreBtn = document.querySelector("#loadMoreBtn");
let currentItem = 3;

loadMoreBtn.onclick = (e) => {
  let boxes = [...document.querySelectorAll(".project-box")];

  for (let i = currentItem; i < currentItem + 3; i++) {
    boxes[i].style.display = "inline-block";
    // boxes[i].style.display = 'flex';
  }
  currentItem += 3;

  if (currentItem >= boxes.length) {
    loadMoreBtn.style.display = "none";
  }
};

// < !-- =============  ================ -->

const blurMain = document.querySelector("main");

const prBtns = document.querySelectorAll(".prBtn");
const closeBtns = document.querySelectorAll(".close-btn");
const cardWrappers = document.querySelectorAll(".card-wrapper");

prBtns.forEach((prBtn, index) => {
  prBtn.addEventListener("click", () => {
    cardWrappers[index].style.display = "block";
    blurMain.style.filter = "blur(10px)";
  });
});

closeBtns.forEach((closeBtn, index) => {
  closeBtn.addEventListener("click", () => {
    cardWrappers[index].style.display = "none";
    blurMain.style.filter = "blur(0)";
  });
});

cardWrappers.forEach((cardWrapper) => {
  cardWrapper.addEventListener("click", (e) => {
    if (e.target.classList.contains("card-wrapper")) {
      cardWrapper.style.display = "none";
      blurMain.style.filter = "blur(0)";
    }
  });
});

console.log(cardWrappers, prBtns, closeBtns);

// < !-- ======================= contact ===================== -->

const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

function checkInputs() {
  const inputs = document.querySelectorAll(".input");

  for (const input of inputs) {
    if (input.value == "") {
      input.classList.add("error");
      input.parentElement.classList.add("error");
    }

    if (inputs[1].value != "") {
      checkEmail();
    }

    inputs[1].addEventListener("keyup", () => {
      checkEmail();
    });

    if (inputs[2].value != "") {
      checkPhoneNumber();
    }
    inputs[2].addEventListener("keyup", () => {
      checkPhoneNumber();
    });

    input.addEventListener("keyup", () => {
      if (input.value != "") {
        input.classList.remove("error");
        input.parentElement.classList.remove("error");
      } else {
        input.classList.add("error");
        input.parentElement.classList.add("error");
      }
    });
  }
}

function checkEmail() {
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
  const errorTxtEmail = document.querySelector(".error-txt.email");
  if (!email.value.match(emailRegex)) {
    email.classList.add("error");
    email.parentElement.classList.add("error");

    if (email.value != "") {
      errorTxtEmail.innerText = "Enter a valid email address";
    } else {
      errorTxtEmail.innerText = "Email Address can't be blank";
    }
  } else {
    email.classList.remove("error");
    email.parentElement.classList.remove("error");
  }
}

function checkPhoneNumber(phoneNumber) {
  const PhoneRegex = /^(0(5[^7]|[2-4]|[8-9]))([\d]{7})$/;
  const errorTxtPhone = document.querySelector(".error-txt.phone");
  if (!phone.value.match(PhoneRegex)) {
    phone.classList.add("error");
    phone.parentElement.classList.add("error");

    if (phone.value != "") {
      errorTxtPhone.innerText = "Enter a valid Phone Number";
    } else {
      errorTxtPhone.innerText = "Phone Number can't be blank";
    }
  } else {
    phone.classList.remove("error");
    phone.parentElement.classList.remove("error");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();

  // בדיקה אם יש שגיאות בשדות
  const inputs = document.querySelectorAll(".input");
  let hasErrors = false;
  for (const input of inputs) {
    if (input.classList.contains("error")) {
      hasErrors = true;
      break;
    }
  }

  // אם אין שגיאות, שליחת הטופס
  if (!hasErrors) {
    // כאן אתה יכול לבצע את הפעולה של שליחת הטופס ל־URL שב־action
    form.submit(); // שולח את הטופס
    form.reset(); // אפשר לאפס את הטופס לאחר שליחתו
  }
});
