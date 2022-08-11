/** vars */
const billInput = document.getElementById("bill-input");
const numberOfPeopleInput = document.getElementById("number-people");
const customInput = document.getElementById("custom-input");

const billErrorText = document.getElementById("bill-error");
const numberOfPeopleErrorText = document.getElementById("number-people-error");
const tipAmountText = document.getElementById("tip-amount");
const totalAmountText = document.getElementById("total-amount");

let selectedTipButton = document.querySelector(".selected-tip");
const tipButtons = [...document.querySelectorAll(".tip-button")];
const resetBtn = document.querySelector(".reset-button");

let tipPourcentage = selectedTipButton.id / 100;
let errorFlag = false;

/** does all the calculations */
const doCalculation = () => {
  checkIfInputsEmpty();
  if (errorFlag) return;
  let bill = billInput.value;
  let people = numberOfPeopleInput.value;
  let tipPerPerson = (bill * tipPourcentage) / people;
  let totalBillPerPerson = bill / people + tipPerPerson;
  tipAmountText.textContent = "$" + tipPerPerson.toFixed(2);
  totalAmountText.textContent = "$" + totalBillPerPerson.toFixed(2);
};

/** checks if either inputs are empty or zero */
const checkIfInputsEmpty = () => {
  let billValue = billInput.value;
  let peopleValue = numberOfPeopleInput.value;
  let billError = false,
    peopleError = false;
  if (billValue <= 0 || billValue == null) {
    billErrorText.classList.add("show");
    billError = true;
  } else {
    billErrorText.classList.remove("show");
    billError = false;
  }
  if (peopleValue < 1 || peopleValue == null) {
    numberOfPeopleErrorText.classList.add("show");
    peopleError = true;
  } else {
    numberOfPeopleErrorText.classList.remove("show");
    peopleError = false;
  }
  if (billError || peopleError) errorFlag = true;
  else errorFlag = false;
};

/** selects a tip */
const selectTip = (button) => {
  selectedTipButton = document.querySelector(".selected-tip");
  if (selectedTipButton) selectedTipButton.classList.remove("selected-tip");
  if (button.id == "custom-tip") {
    customInput.classList.add("show");
    selectText(customInput);
    tipPourcentage = customInput.value / 100;
    doCalculation();
    return;
  }
  customInput.classList.remove("show");
  button.classList.add("selected-tip");
  tipPourcentage = button.id / 100;
  doCalculation();
};

/** does a custom tip */
const customizeTip = () => {
  tipPourcentage = customInput.value / 100;
  doCalculation();
};

/** resets all input and display text values */
const resetAll = () => {
  billInput.value = 0;
  numberOfPeopleInput.value = 1;
  billErrorText.classList.remove("show");
  numberOfPeopleErrorText.classList.remove("show");
  tipAmountText.textContent = "$0.00";
  totalAmountText.textContent = "$0.00";
  tipButtons.forEach((b) => {
    if (b.id == 15) b.classList.add("selected-tip");
    else b.classList.remove("selected-tip");
  });
  customInput.classList.remove("show");
};

/** selects input text when selecting an input */
const selectText = (input) => {
  input.focus();
  input.select();
};

/** events */
window.addEventListener("DOMContentLoaded", doCalculation);
billInput.addEventListener("keyup", doCalculation);
numberOfPeopleInput.addEventListener("keyup", doCalculation);
customInput.addEventListener("keyup", customizeTip);
tipButtons.forEach((b) => b.addEventListener("click", () => selectTip(b)));
resetBtn.addEventListener("click", resetAll);
billInput.addEventListener("click", () => selectText(billInput));
numberOfPeopleInput.addEventListener("click", () =>
  selectText(numberOfPeopleInput)
);
customInput.addEventListener("click", () => selectText(customInput));
