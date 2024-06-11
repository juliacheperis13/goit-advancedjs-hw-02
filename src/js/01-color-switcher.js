const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const TIME_INTERVAL = 1000;

let timerId = null;

startButton.addEventListener('click', onStartButtonClick);
stopButton.addEventListener('click', onStopButtonClick);

toggleDisabledButtonState(stopButton, true);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function toggleDisabledButtonState(button, disabled) {
  if (disabled) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}

function onStartButtonClick() {
  toggleDisabledButtonState(startButton, true);
  toggleDisabledButtonState(stopButton, false);

  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, TIME_INTERVAL);
}

function onStopButtonClick() {
  clearInterval(timerId);
  toggleDisabledButtonState(startButton, false);
  toggleDisabledButtonState(stopButton, true);
}
