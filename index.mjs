document.addEventListener("DOMContentLoaded", () => {
  const timerForm = document.getElementById("timerForm");
  const timerList = document.getElementById("timerList");
  const alertSound = document.getElementById("alertSound");

  let timers = [];

  timerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const hours = parseInt(document.getElementById("hours").value) || 0;
    const minutes = parseInt(document.getElementById("minutes").value) || 0;
    const seconds = parseInt(document.getElementById("seconds").value) || 0;

    if (
      hours < 0 ||
      minutes < 0 ||
      seconds < 0 ||
      (hours === 0 && minutes === 0 && seconds === 0)
    ) {
      alert("Please enter a valid time.");
      return;
    }

    const totalTime = hours * 3600 + minutes * 60 + seconds;

    startTimer(totalTime);
    timerForm.reset();
  });

  function startTimer(duration) {
    const timerId = Date.now();
    let remainingTime = duration;

    const timerItem = document.createElement("li");
    timerItem.classList.add("timer-item");
    timerItem.setAttribute("data-id", timerId);
    timerItem.innerHTML = `<span class="timer-display">${formatTime(
      remainingTime
    )}</span>
                               <button class="stop-button">Stop Timer</button>`;
    timerList.appendChild(timerItem);

    const interval = setInterval(() => {
      remainingTime--;

      if (remainingTime < 0) {
        clearInterval(interval);
        alertSound.play();
        timerItem.innerHTML = `<span class="timer-end">Time's Up!</span>`;
      } else {
        timerItem.querySelector(".timer-display").textContent =
          formatTime(remainingTime);
      }
    }, 1000);

    // Stop button functionality
    timerItem.querySelector(".stop-button").addEventListener("click", () => {
      clearInterval(interval);
      timerItem.remove();
    });

    timers.push({ id: timerId, interval });
  }

  function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
});
