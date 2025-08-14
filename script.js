let audio = new Audio("assets/soft-opening-piano-logo-153268.mp3");

const timerColor = document.querySelectorAll(".tabcontent");
const resumeBGcolor = document.querySelectorAll(".controlButton");

// get the individual timer tabs
let studyTab = document.getElementById("tab-study");
let shortBreakTab = document.getElementById("tab-shortBreak");
let longBreakTab = document.getElementById("tab-longBreak");

// add event listeners to the timer tabs
studyTab.addEventListener("click", (event) => openTab(event, "study"));
shortBreakTab.addEventListener("click", (event) =>
  openTab(event, "shortBreak")
);
longBreakTab.addEventListener("click", (event) => openTab(event, "longBreak"));

// set the studyTab as the default tab to open
document.addEventListener("DOMContentLoaded", () => {
  // simulate a click or just call openTab with the proper arguments
  openTab({ currentTarget: studyTab }, "study");
});

// Function to open the selected tab and hide others
function openTab(evt, timerCategory) {
  // stop any running timer
  clearInterval(timerInterval);
  remainingTime = 0;

  // reset buttons to default
  startBtn.style.display = "inline-block";
  pauseBtn.style.display = "none";
  resumeBtn.style.display = "none";

  // default time for tabs
  let defaultTime = 0;
  if (timerCategory === "study") {
    defaultTime = 25 * 60;
    timerColor.forEach((el) => {
      el.style.color = "#F07E25";
    });
    resumeBGcolor.forEach((el) => {
      el.style.backgroundColor = "#F07E25";
    });
  } else if (timerCategory === "shortBreak") {
    defaultTime = 5 * 60;
    timerColor.forEach((el) => {
      el.style.color = "#F07E25";
    });
    resumeBGcolor.forEach((el) => {
      el.style.backgroundColor = "#F07E25";
    });
  } else if (timerCategory === "longBreak") {
    defaultTime = 15 * 60;
    timerColor.forEach((el) => {
      el.style.color = "#F07E25";
    });
    resumeBGcolor.forEach((el) => {
      el.style.backgroundColor = "#F07E25";
    });
  }

  // set the display for the new tab
  let activeTabContent = document.getElementById(timerCategory);
  let display = activeTabContent.querySelector(".timerDisplay");
  let minutes = Math.floor(defaultTime / 60);
  let seconds = defaultTime % 60;
  display.textContent =
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (seconds < 10 ? "0" : "") +
    seconds;

  // hide all other tab contents
  let tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // remove active class from all tabs
  let tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // show the current tab and mark active
  document.getElementById(timerCategory).style.display = "block";
  evt.currentTarget.className += " active";
}

let startBtn = document.getElementById("startBtn");
let pauseBtn = document.getElementById("pauseBtn");
let resumeBtn = document.getElementById("resumeBtn");
let remainingTime;
let timerInterval;
// initially hide the pause and resume button
pauseBtn.style.display = "none";
resumeBtn.style.display = "none";

// add event listener to the start button
startBtn.addEventListener("click", () => {
  let timerDuration = 0;

  // get the <h3> inside the active tab
  let activeTabContent = document.querySelector(".tabcontent[style*='block']");
  let display = activeTabContent.querySelector(".timerDisplay");

  if (studyTab.classList.contains("active")) {
    timerDuration = 25 * 60;
  } else if (shortBreakTab.classList.contains("active")) {
    timerDuration = 5 * 60;
  } else if (longBreakTab.classList.contains("active")) {
    timerDuration = 15 * 60;
  }

  startTimer(timerDuration, display);
});

// add event listener to the pause button
pauseBtn.addEventListener("click", () => {
  console.log("pauseTimer called");
  clearInterval(timerInterval); // stop the countdown

  pauseBtn.style.display = "none";
  resumeBtn.style.display = "inline-block";
  timerColor.forEach((el) => {
    el.style.color = "#F6A724";
  });
  resumeBGcolor.forEach((el) => {
    el.style.backgroundColor = "#F6A724";
  });
});

// add event listener to the resume button
resumeBtn.addEventListener("click", () => {
  console.log("resumeTimer called");

  resumeBtn.style.display = "none";
  pauseBtn.style.display = "inline-block";
  timerColor.forEach((el) => {
    el.style.color = "#F07E25";
  });
  resumeBGcolor.forEach((el) => {
    el.style.backgroundColor = "#F07E25";
  });

  let activeTabContent = document.querySelector(".tabcontent[style*='block']");
  let display = activeTabContent.querySelector(".timerDisplay");

  startTimer(remainingTime, display);
});

function startTimer(duration, display) {
  remainingTime = duration;

  startBtn.style.display = "none";
  pauseBtn.style.display = "inline-block";

  timerInterval = setInterval(function () {
    let minutes = parseInt(remainingTime / 60, 10);
    let seconds = parseInt(remainingTime % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--remainingTime < 0) {
      clearInterval(timerInterval);
      display.textContent = "Time's up!";
      audio.play(); // play the audio when the timer ends

      pauseBtn.style.display = "none";
      startBtn.style.display = "inline-block";
    }
  }, 1000);
}
