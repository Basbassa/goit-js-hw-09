import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      window.alert('Please choose a date in the future');
      document
        .querySelector('[data-start]')
        .setAttribute('disabled', 'disabled');
    } else {
      document.querySelector('[data-start]').removeAttribute('disabled');
    }
  },
};

flatpickr('#datetime-picker', options);

const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
let intervalId = null;

document.querySelector('[data-start]').addEventListener('click', () => {
  const selectedDate = new Date(
    document.querySelector('#datetime-picker').value
  );
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    const currentDate = new Date();
    const differenceMs = selectedDate.getTime() - currentDate.getTime();
    if (differenceMs <= 0) {
      clearInterval(intervalId);
      daysElement.textContent = '00';
      hoursElement.textContent = '00';
      minutesElement.textContent = '00';
      secondsElement.textContent = '00';
    } else {
      const { days, hours, minutes, seconds } = convertMs(differenceMs);
      daysElement.textContent = addLeadingZero(days);
      hoursElement.textContent = addLeadingZero(hours);
      minutesElement.textContent = addLeadingZero(minutes);
      secondsElement.textContent = addLeadingZero(seconds);
    }
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
