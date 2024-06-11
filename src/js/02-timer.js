import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const TIME_INTERVAL = 1000;
const TIME_ITIMEOUT = 2000;

const body = document.querySelector('body');
const fireworks = document.querySelector('.fireworks');
const startButton = document.querySelector('button[data-start]');
const dateInput = document.querySelector('#datetime-picker');
const daysText = document.querySelector('span[data-days]');
const hoursText = document.querySelector('span[data-hours]');
const minutesText = document.querySelector('span[data-minutes]');
const secondsText = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: onClose,
};

let timerId = null;

const flatpickrDate = flatpickr(dateInput, options);
toggleDisabledState(startButton, true);
startButton.addEventListener('click', onStartButtonClick);

function toggleDisabledState(element, disabled) {
  if (disabled) {
    element.disabled = true;
  } else {
    element.disabled = false;
  }
}

function onClose(selectedDates) {
  console.log(selectedDates[0]);
  toggleDisabledState(startButton, false);
  if (selectedDates[0] < new Date()) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
      position: 'center',
      timeout: TIME_ITIMEOUT,
      closeOnClick: true,
      color: 'red',
    });
    selectedDates[0] = new Date();
    toggleDisabledState(startButton, true);
  }
  this.config.clickOpens = false;
}

function onStartButtonClick() {
  toggleDisabledState(startButton, true);
  toggleDisabledState(dateInput, true);
  setTimer();
  timerId = setInterval(() => {
    if (deltaTime() <= 0) {
      clearInterval(timerId);
      toggleAnimation(true);
      return;
    }
    updateTimer(deltaTime());
  }, TIME_INTERVAL);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function deltaTime() {
  const currentDate = new Date();
  const targetDate = flatpickrDate.selectedDates[0];
  return targetDate - currentDate;
}

function setTimer() {
  if (deltaTime() <= 0) {
    return;
  }
  updateTimer(deltaTime());
}

function updateTimer(time) {
  const { days, hours, minutes, seconds } = convertMs(time);
  daysText.textContent = addLeadingZero(days);
  hoursText.textContent = addLeadingZero(hours);
  minutesText.textContent = addLeadingZero(minutes);
  secondsText.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function toggleAnimation(enabled) {
  if (enabled) {
    body.classList.add('dark');
    fireworks.classList.add('visible');
  } else {
    body.classList.remove('dark');
    fireworks.classList.remove('visible');
  }
}
