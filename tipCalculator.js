// Input elements
const billInput = document.querySelector('#bill');
const billErrorMessage = createErrorMessage('Bill amount cannot be negative.');
insertErrorMessage(billInput, billErrorMessage);

const customTipInput = document.querySelector('#custom-tip');

const numOfPeopleInput = document.querySelector('#num-of-people');
const numOfPeopleErrorMessage = createErrorMessage('Number of people cannot be zero or negative.');
insertErrorMessage(numOfPeopleInput, numOfPeopleErrorMessage);

// Tip buttons
const tipButtons = document.querySelectorAll('.tip-buttons button');

// Output elements
const tipAmountOutput = document.querySelector('#tip-amount');
const totalOutput = document.querySelector('#total');

// Reset button
const resetButton = document.querySelector('#reset');

// Event listeners
tipButtons.forEach((button) => {
  button.addEventListener('click', handleTipButtonClick);
});

customTipInput.addEventListener('input', handleCustomTipInput);
addInputValidation(billInput, billErrorMessage, (val) => val >= 0);
addInputValidation(numOfPeopleInput, numOfPeopleErrorMessage, (val) => val > 0);

resetButton.addEventListener('click', reset);
addFocusAndBlurListeners(billInput);
addFocusAndBlurListeners(customTipInput);
addFocusAndBlurListeners(numOfPeopleInput);

let selectedTip = 0;

// Functions
function createErrorMessage(message) {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = message;
  errorMessage.classList.add("error-message");
  errorMessage.style.display = "none";
  return errorMessage;
}

function insertErrorMessage(inputElement, errorMessageElement) {
  inputElement.parentNode.insertBefore(errorMessageElement, inputElement.nextSibling);
}

function addInputValidation(inputElement, errorMessageElement, validator) {
  inputElement.addEventListener("input", () => {
    const inputValue = parseFloat(inputElement.value) || 0;
    const isValid = validator(inputValue);
    validateInput(inputElement, errorMessageElement, isValid);
  });
}

function addFocusAndBlurListeners(inputElement) {
  inputElement.addEventListener('focus', () => inputElement.classList.add('input-active'));
  inputElement.addEventListener('blur', () => inputElement.classList.remove('input-active'));
  inputElement.addEventListener('input', updateResetButtonState);
}

function validateInput(inputElement, errorMessageElement, isValid) {
  errorMessageElement.style.display = isValid ? "none" : "block";
  calculateTip();
}

function handleTipButtonClick(e) {
  tipButtons.forEach((button) => button.classList.remove('active'));

  e.target.classList.add('active');
  selectedTip = parseFloat(e.target.value);
  customTipInput.value = '';
  calculateTip();
}

function handleCustomTipInput(e) {
  tipButtons.forEach((button) => button.classList.remove('active'));

  selectedTip = parseFloat(e.target.value) || 0;
  calculateTip();
}

function calculateTip() {
  const bill = parseFloat(billInput.value) || 0;
  const numOfPeople = parseInt(numOfPeopleInput.value) || 1;

  const tipAmount = (bill * (selectedTip / 100)) / numOfPeople;
  const totalAmount = bill / numOfPeople + tipAmount;

  tipAmountOutput.textContent = tipAmount.toFixed(2);
  totalOutput.textContent = totalAmount.toFixed(2);
  
  updateResetButtonState();
}

function reset() {
  billInput.value = '';
  numOfPeopleInput.value = '1';
  customTipInput.value = '';

  tipButtons.forEach((button) => button.classList.remove('active'));

  selectedTip = 0;
  tipAmountOutput.textContent = '0.00';
  totalOutput.textContent = '0.00';

  billErrorMessage.style.display = 'none';
  numOfPeopleErrorMessage.style.display = 'none';

  updateResetButtonState();
}

function updateResetButtonState() {
  if (
    billInput.value === '' &&
    numOfPeopleInput.value === '1' &&
    customTipInput.value === '' &&
    selectedTip === 0
  ) {
    resetButton.style.backgroundColor = 'hsl(186, 39%, 30%)';
    resetButton.disabled = true;
  } else {
    resetButton.style.backgroundColor = 'hsl(172, 67%, 45%)';
    resetButton.disabled = false;
  }
}

updateResetButtonState();
