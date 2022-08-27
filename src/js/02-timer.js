import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const buttonEl = document.querySelector('button');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

const date = new Date();
let selected = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = date.getTime();
    const chosenDate = selectedDates[0].getTime();
    if (currentDate >= chosenDate) {
      buttonEl.setAttribute('disabled', false);
      alert('Please choose a date in the future');
    } else {
      buttonEl.removeAttribute('disabled');
      selected = selectedDates[0];
    }
  },
};

flatpickr('input#datetime-picker', options);

buttonEl.addEventListener('click', onClick);

let intervalInitial = null;

function onClick() {
  intervalInitial = setInterval(startTimer, 1000);
}

function startTimer() {
  const currentDateTime = new Date();
  const currentDateOnStart = currentDateTime.getTime();
  const futureDate = selected.getTime();
  const intervalDates = futureDate - currentDateOnStart;
  const timerObject = convertMs(intervalDates);

  days.textContent = addLeadingZero(timerObject.days.toString());
  hours.textContent = addLeadingZero(timerObject.hours.toString());
  minutes.textContent = addLeadingZero(timerObject.minutes.toString());
  seconds.textContent = addLeadingZero(timerObject.seconds.toString());

  if (
    days.textContent === '00' &&
    hours.textContent === '00' &&
    minutes.textContent === '00' &&
    seconds.textContent === '00'
  ) {
    clearInterval(intervalInitial);
  }
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

function addLeadingZero(value) {
  if ((value.length = 1)) {
    return value.padStart(2, '0');
  }
}
