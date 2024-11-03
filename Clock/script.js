        // < !-- ============= toggle icon navbar ================ -->

let navBar = document.querySelector('.nav-bar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav-bar a');


document.addEventListener('DOMContentLoaded', (event) => {
    let navLinks = document.querySelectorAll('.nav-bar .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();  // Prevent default link behavior
            
            // Remove 'active' class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add 'active' class to the clicked link
            link.classList.add('active');
        });
    });
});

        // < !-- ============= toggle links navbar ================ -->


    document.addEventListener('DOMContentLoaded', function () {
            const links = document.querySelectorAll('.nav-link');
            const contents = document.querySelectorAll('.content');

            links.forEach(link => {
                link.addEventListener('click', function (event) {
                    event.preventDefault();
                    const targetId = this.getAttribute('data-target');

                    contents.forEach(content => {
                        content.classList.remove('active');
                        if (content.id === targetId) {
                            content.classList.add('active');
                        }
                    });
                });
            });
        });


        // < !-- =============  ================ -->


document.getElementById('clockSelect').addEventListener('change', updateTimeByTimeZone);

// קריאה ראשונית לפונקציה לפני שמתחיל ה- setInterval כדי לעדכן את השעה מיידית
updateTimeByTimeZone();
// קריאה לפונקציה באינטרוול של כל שנייה (1000 מילישניות)
setInterval(updateTimeByTimeZone, 1000);

function updateTimeByTimeZone(){
    let selectedTimeZone = document.getElementById('clockSelect').value;

    // קבל את השעה הנוכחית לפי האיזור הנבחר
    let currentTime = new Date().toLocaleTimeString('en-US', { timeZone: selectedTimeZone });

    // עדכן את השעה המוצגת
    let timeElements = currentTime.split(":");
    let hours = document.getElementById('hours');
    let minutes = document.getElementById('minutes');
    let seconds = document.getElementById('seconds');
    let ampm = document.getElementById('ampm');

    hours.innerHTML = timeElements[0] + '<br><p>Hours</p>';
    minutes.innerHTML = timeElements[1] + '<br><p>Minutes</p>';

    // חתוך את השניות והתיקון של אות AM/PM
    let secondsAndMeridiem = timeElements[2].split(" ");
    let s = parseInt(secondsAndMeridiem[0]);
    seconds.innerHTML = (s < 10 ? "0" + s : s) + '<br><p>Seconds</p>';
    ampm.innerHTML = secondsAndMeridiem[1];

    // נעדכן את התעלומות
    let hh = document.getElementById('hh');
    let mm = document.getElementById('mm');
    let ss = document.getElementById('ss');
            
    let hr_dot = document.querySelector('.hr_dot');
    let min_dot = document.querySelector('.min_dot');
    let sec_dot = document.querySelector('.sec_dot');

    let h = parseInt(timeElements[0]);
    let m = parseInt(timeElements[1]);
    let sForDots = parseInt(secondsAndMeridiem[0]);

    // 12 hrs clock
    hh.style.strokeDashoffset = 440 - (440 * h) / 12;
    
    // 60 min
    mm.style.strokeDashoffset = 440 - (440 * m) / 60;
    
    // 60 sec
    ss.style.strokeDashoffset = 440 - (440 * s) / 60;
            
    hr_dot.style.transform = `rotate(${h*30}deg)`;
    //360 / 12 =30
    min_dot.style.transform = `rotate(${m*6}deg)`;
    //360 / 60 =6
    sec_dot.style.transform = `rotate(${sForDots *6}deg)`;
    //360 / 60 =6
}

        // <!-- ================================================ -->

let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let stoperHours = document.getElementById('stoperHours');
let stoperMinutes = document.getElementById('stoperMinutes');
let stoperSeconds = document.getElementById('stoperSeconds');
let stoperMilliseconds = document.getElementById('stoperMilliseconds');
const stoperStartBtn = document.getElementById('stoperStartBtn');
const stoperContinueBtn = document.getElementById('stoperContinueBtn');
const stoperPauseBtn = document.getElementById('stoperPauseBtn');
const stoperResetBtn = document.getElementById('stoperResetBtn');

let intStoper = null;

stoperStartBtn.addEventListener('click', () => {
    if (intStoper !== null) {
        clearInterval(intStoper);
    }
    intStoper = setInterval(startStoper, 10);
});

function startStoper() {
    milliseconds += 10;
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
            if (minutes == 60) {
                minutes = 0;
                hours++
            }
        }
    }

    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms =
        milliseconds < 10
            ? "00" + milliseconds
            : milliseconds < 100
                ? '0' + milliseconds
                : milliseconds;

    stoperHours.innerHTML = h + '<br><p>Hours</p>';
    stoperMinutes.innerHTML = m + '<br><p>Minutes</p>';
    stoperSeconds.innerHTML = s + '<br><p>Seconds</p>';
    stoperMilliseconds.innerHTML = ms + '<br><p>Milliseconds</p>';


  // עדכון מחוגים
    let hh = document.getElementById('stoperHH');
    let mm = document.getElementById('stoperMM');
    let ss = document.getElementById('stoperSS');

    hh.style.strokeDashoffset = 440 - (440 * h) / 12;
    mm.style.strokeDashoffset = 440 - (440 * m) / 60;
    ss.style.strokeDashoffset = 440 - (440 * s) / 60;
            
    let hr_dot = document.querySelector('.stoperHR_dot');
    let min_dot = document.querySelector('.stoperMIN_dot');
    let sec_dot = document.querySelector('.stoperSEC_dot');

    hr_dot.style.transform = `rotate(${h * 30}deg)`;
    min_dot.style.transform = `rotate(${m * 6}deg)`;
    sec_dot.style.transform = `rotate(${s * 6}deg)`;

    stoperStartBtn.style.display = 'none';
    stoperPauseBtn.style.display = 'block';
}

stoperPauseBtn.addEventListener('click', () => {
    clearInterval(intStoper);
    stoperResetBtn.style.display = 'block';
    stoperContinueBtn.style.display = 'block';
    stoperPauseBtn.style.display = 'none';
});

stoperContinueBtn.addEventListener('click', () => {
    intStoper = setInterval(startStoper, 10);
    stoperResetBtn.style.display = 'none';
    stoperContinueBtn.style.display = 'none';
    stoperPauseBtn.style.display = 'block';
})

stoperResetBtn.addEventListener('click', () => {
    clearInterval(intStoper);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];

    stoperHours.innerHTML = "00 <br><p>Hours</p>";
    stoperMinutes.innerHTML = "00 <br><p>Minutes</p>";
    stoperSeconds.innerHTML = "00 <br><p>Seconds</p>";
    stoperMilliseconds.innerHTML = "000 <br><p>Milliseconds</p>";

    // Reset the circles
    document.getElementById('stoperHH').style.strokeDashoffset = 440;
    document.getElementById('stoperMM').style.strokeDashoffset = 440;
    document.getElementById('stoperSS').style.strokeDashoffset = 440;
    document.querySelector('.stoperHR_dot').style.transform = 'rotate(0deg)';
    document.querySelector('.stoperMIN_dot').style.transform = 'rotate(0deg)';
    document.querySelector('.stoperSEC_dot').style.transform = 'rotate(0deg)';

    stoperStartBtn.style.display = 'block';
    stoperPauseBtn.style.display = 'none';
    stoperResetBtn.style.display = 'none';
    stoperContinueBtn.style.display = 'none';
});

        // <!-- ================================================ -->

const timerStartBtn = document.getElementById('timerStartBtn');
const timerContinueBtn = document.getElementById('timerContinueBtn');
const timerPauseBtn = document.getElementById('timerPauseBtn');
const timerResetBtn = document.getElementById('timerResetBtn')

const hInput = document.getElementById('timerHours');
const mInput = document.getElementById('timerMinutes');
const sInput = document.getElementById('timerSecondes');

let intTimer = null;

function startTimer() {
    let hours = parseInt(hInput.value);
    let minutes = parseInt(mInput.value);
    let seconds = parseInt(sInput.value);

    if (hours == 0 && minutes == 0 && seconds == 0) {
        hInput.value = '00';
        mInput.value = '00';
        sInput.value = '00';
    } else if (seconds != 0) {
        seconds--;
    } else if (minutes != 0 && seconds == 0) {
        seconds = 59;
        minutes--;
    } else if (hours != 0 && minutes == 0) {
        minutes = 60;
        hours--;
    }

    // if ( hInput.value == '00' ||  mInput.value == '00' ||  sInput.value =='00') {
    //     timerStartBtn.style.display = 'none';
    // }

    hInput.value = hours < 10 ? '0' + hours : hours;
    mInput.value = minutes < 10 ? '0' + minutes : minutes;
    sInput.value = seconds < 10 ? '0' + seconds : seconds;

    const hh = document.getElementById('timerHH');
    const mm = document.getElementById('timerMM');
    const ss = document.getElementById('timerSS');

    hh.style.strokeDashoffset = 440 - (440 * hours) / 12;
    mm.style.strokeDashoffset = 440 - (440 * minutes) / 60;
    ss.style.strokeDashoffset = 440 - (440 * seconds) / 60;

    // const hr_dot = document.querySelector('.timerHR_dot');
    // const min_dot = document.querySelector('.timerMIN_dot');
    // const sec_dot = document.querySelector('.timerSEC_dot');
}

function startInterval() {
    intTimer = setInterval(startTimer, 1000);
}

timerStartBtn.addEventListener('click', function () {
    startInterval();
    timerPauseBtn.style.display = 'block';
    timerStartBtn.style.display = 'none';
});

timerPauseBtn.addEventListener('click', ()=>{
    clearInterval(intTimer);
    timerContinueBtn.style.display = 'block';
    timerResetBtn.style.display = 'block';
    timerPauseBtn.style.display = 'none';  
});

timerResetBtn.addEventListener('click', function () {

    clearInterval(intTimer);

    hInput.value = '00';
    mInput.value = '00';
    sInput.value = '00';

    // Reset the circles
    document.getElementById('timerHH').style.strokeDashoffset = 440;
    document.getElementById('timerMM').style.strokeDashoffset = 440;
    document.getElementById('timerSS').style.strokeDashoffset = 440;

    timerContinueBtn.style.display = 'none';
    timerResetBtn.style.display = 'none';

});

timerContinueBtn.addEventListener('click', () => {
    startInterval();
    timerResetBtn.style.display = 'none';
    timerContinueBtn.style.display = 'none';
    timerPauseBtn.style.display = 'block';
})

document.getElementById('timerContainer').addEventListener('input', function() {
    const hours = document.getElementById('timerHours').value;
    const minutes = document.getElementById('timerMinutes').value;
    const seconds = document.getElementById('timerSecondes').value;

    if (hours !== '' || minutes !== '' || seconds !== '') {
        document.getElementById('timerStartBtn').style.display = 'block';
    } else {
        document.getElementById('timerStartBtn').style.display = 'none';
    }
});
        // <!-- ================================================ -->