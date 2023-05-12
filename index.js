const form = document.getElementById("formulario");

/* INPUTS */
const dayInput = document.getElementById("day-input");
const monthInput = document.getElementById("month-input");
const yearInput = document.getElementById("year-input");

/* BODY NUMBERS */
const yearsBody = document.getElementById("years-body");
const monthBody = document.getElementById("months-body");
const dayBody = document.getElementById("days-body");

const months = [31, 28, 31, 30, 31, 30, 31, 30, 31, 30, 31, 30];

let currentDate = new Date();
let currentDay = currentDate.getDate();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

form.addEventListener("submit", handleSubmit);

let inputValidate = {
  day: false,
  month: false,
  year: false,
};

function validateDayInput(input) {
  input.value = input.value.slice(0, 2);
  const isValid = input.value && input.value <= 31;

  input.classList.toggle("error-color", !isValid);
  input.classList.toggle("error-borderColor", !isValid);
  input.previousElementSibling.classList.toggle("error-color", !isValid);
  input.nextElementSibling.classList.toggle("error-color", !isValid);
  input.nextElementSibling.textContent = !isValid
    ? input.value
      ? "Introduzca un día válido"
      : "Campo vacio"
    : "";

  inputValidate.day = isValid;
}

function validateMonthInput(input) {
  input.value = input.value.slice(0, 2);
  const isValid = input.value && input.value <= 12;

  input.classList.toggle("error-color", !isValid);
  input.classList.toggle("error-borderColor", !isValid);
  input.previousElementSibling.classList.toggle("error-color", !isValid);
  input.nextElementSibling.classList.toggle("error-color", !isValid);
  input.nextElementSibling.textContent = !isValid
    ? input.value
      ? "Introduzca un mes válido"
      : "Campo vacio"
    : "";

  inputValidate.month = isValid;
}

function validateYearInput(input) {
  input.value = input.value.slice(0, 4);
  const isValid = input.value && input.value <= currentYear && input.value > 0;

  input.classList.toggle("error-color", !isValid);
  input.classList.toggle("error-borderColor", !isValid);
  input.previousElementSibling.classList.toggle("error-color", !isValid);
  input.nextElementSibling.classList.toggle("error-color", !isValid);
  input.nextElementSibling.textContent = !isValid
    ? input.value
      ? "Introduzca un año inferior al actual"
      : "Campo vacio"
    : "";

  inputValidate.year = isValid;
}

dayInput.addEventListener("input", (e) => {
  validateDayInput(e.target);
});

monthInput.addEventListener("input", (e) => {
  validateMonthInput(e.target);
});

yearInput.addEventListener("input", (e) => {
  validateYearInput(e.target);
});

function handleSubmit(e) {
  const { day, month, year } = inputValidate;

  e.preventDefault();
  if (day && month && year) {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    let d = currentDay - dayInput.value;
    let m = currentMonth - monthInput.value;
    let y = currentYear - yearInput.value;

    if (d < 0) {
      m--;
      const previousMonthDays = months[(currentMonth - 2 + 12) % 12];
      d += previousMonthDays;
    }

    if (m < 0) {
      y--;
      m += 12;
    }

    dayBody.textContent = d;
    monthBody.textContent = m;
    yearsBody.textContent = y;
  }
}
