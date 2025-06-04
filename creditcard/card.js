// card.js

function isCardNumberValid(number) {
  return number === '1234123412341234';
}


function submitHandler(event) {
  event.preventDefault();

  // clear previous errors
  displayError('');

  const cardNumber = this.cardNumber.value;
  const expMonth = this.expMM.value;
  const expYear = this.expYY.value;

  let errorMsg = '';

  // Check if card number is numeric
  if (isNaN(cardNumber)) {
    errorMsg += 'Card number is not a valid number.\n';
  } else if (!isCardNumberValid(cardNumber)) {
    errorMsg += 'Card number is not a valid card number.\n';
  }

  // Check expiration date is in the future
  const currentDate = new Date();
  const enteredDate = new Date(`20${expYear}`, expMonth - 1); // Month is 0-indexed

  if (enteredDate <= currentDate) {
    errorMsg += 'Expiration date must be in the future.\n';
  }

  // Display errors if there are any
  if (errorMsg !== '') {
    displayError(errorMsg);
    return false;
  }

  // If all is good:
  alert('Form submitted successfully!');
  return true;
}

function displayError(msg) {
  const errorBox = document.querySelector('.errorMsg');
  const errorText = document.querySelector('.errorText');

  if (msg) {
    errorText.textContent = msg;
    errorBox.style.display = 'block';

    // optional: still auto-hide after 4 seconds
    setTimeout(() => {
      errorBox.style.display = 'none';
    }, 2000);
  } else {
    errorBox.style.display = 'none';
  }
}




// Hook it all up!
document
  .querySelector('#credit-card')
  .addEventListener('submit', submitHandler);
