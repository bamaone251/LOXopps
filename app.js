const TARGET_EFFICIENCY = 0.67;
const FIRST_SHIFT_SHARE = 0.65;
const LOADER_SHIFT_HOURS = 8;

const form = document.getElementById('calculator');
const runsInput = document.getElementById('runs');
const backhaulsInput = document.getElementById('backhauls');
const diversionsInput = document.getElementById('diversions');
const hoursResult = document.getElementById('hoursResult');
const firstShiftRunsEl = document.getElementById('firstShiftRuns');
const secondShiftRunsEl = document.getElementById('secondShiftRuns');
const loadersNeededEl = document.getElementById('loadersNeeded');

function cleanNumber(input) {
  const n = Number(input.value);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function formatRuns(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
}

function calculate() {
  const runs = cleanNumber(runsInput);
  const backhauls = cleanNumber(backhaulsInput);
  const diversions = cleanNumber(diversionsInput);

  // Hours = (Runs + Diversions) / 0.67 + (0.5 × Backhauls)
  const productiveHours = (runs + diversions) / TARGET_EFFICIENCY;
  const backhaulAllowance = 0.5 * backhauls;
  const totalHours = productiveHours + backhaulAllowance;

  // Shift workload split
  const firstShiftRuns = Math.floor(runs * FIRST_SHIFT_SHARE);
  const secondShiftRuns = Math.ceil(runs - runs * FIRST_SHIFT_SHARE);

  // Number of 8-hour loader shifts represented by the required hours
  const loadersNeeded = totalHours / LOADER_SHIFT_HOURS;

  hoursResult.textContent = totalHours.toFixed(2);
  firstShiftRunsEl.textContent = formatRuns(firstShiftRuns);
  secondShiftRunsEl.textContent = formatRuns(secondShiftRuns);
  loadersNeededEl.textContent = loadersNeeded.toFixed(2);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  calculate();
});

[runsInput, backhaulsInput, diversionsInput].forEach(input => {
  input.addEventListener('input', calculate);
});

calculate();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(console.error);
  });
}

