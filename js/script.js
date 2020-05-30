//----------------------------------------
// Step 1: Focus textfield when page loads
//----------------------------------------

// Set focus on the first text field
const nameField = document.querySelector('#name');
nameField.focus();

//-------------------------------------------------
// Step 2: Show / Hide fieldset for other job title
//-------------------------------------------------

// DOM-Selection title-dropdown and other-fieldset
const jobSelection = document.querySelector('#title');
const otherTitleSet = document.querySelector('#otherTitleSet');
otherTitleSet.style.display = 'none';

// eventlistener for change event
jobSelection.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        // show fieldset if 'other' is selected
        otherTitleSet.style.display = 'inherit';
    } else {
        // hide fieldset if 'other' isn't selected
        otherTitleSet.style.display = 'none';
    }
})

//-------------------------------
// Step 3: 'T-Shirt Info' section
//-------------------------------

// DOM-Selection design-dropdown and color-dropdown
const shirtDesign = document.querySelector('#design');
const colorDropdown = document.querySelector('#color');
const colors = document.querySelectorAll('#color option');

// Function for hiding all colors
function hideColors() {
    for (var i = 0; i < colors.length; i++) {
        colors[i].style.display = 'none';
    }
}

document.querySelector('#colors-js-puns').style.display = 'none';

// Create a new option (selected and disabled)
// always visible for a better user interaction
function defaultColors() {
    hideColors()
    const defaultColor = document.createElement('OPTION');
    defaultColor.value = 'defaultColor';
    defaultColor.textContent = 'Please select a T-shirt theme';
    defaultColor.selected = true;
    defaultColor.disabled = true;
    colorDropdown.appendChild(defaultColor);    
}

defaultColors();

// Show all colors for the "js puns" design
function jsPunsSet() {
    // Hide all Colors
    hideColors()
    for (var i = 0; i < colors.length; i++) {
        if (i == 0) {
            colors[i].selected = true;
        };

        switch (colors[i].value) {
            case 'cornflowerblue':
            case 'darkslategrey':
            case 'gold':
                colors[i].style.display = 'inherit';
                break;
        }
    }
};

// Show all colors for the "heart js" design
function heartJs() {
    // Hide all Colors
    hideColors()
    for (var i = 0; i < colors.length; i++) {
        if (i == 3) {
            colors[i].selected = true;
        };
        switch (colors[i].value) {
            case 'tomato':
            case 'steelblue':
            case 'dimgrey':
                colors[i].style.display = 'inherit';
                break;
        }
    }
};

shirtDesign.addEventListener('change', (e) => {

    if (e.target.value == 'default') {
        // defaultColors();
        document.querySelector('#colors-js-puns').style.display = 'none';
    } else if (e.target.value == 'js puns') {
        document.querySelector('#colors-js-puns').style.display = 'inherit';
        jsPunsSet();
    } else if (e.target.value == 'heart js') {
        document.querySelector('#colors-js-puns').style.display = 'inherit';
        heartJs();
    }
});

//--------------------------------
// Step 4: Register and Activities
//--------------------------------

const activities = document.querySelector('.activities');
const activitiesLabel = document.querySelector('.activities label');
const activitiesInput = document.querySelectorAll('.activities input');
const totalCostsField = document.querySelector('#total span');
let totalCosts = 0;

activities.addEventListener('click', (e) => {
    // react only if the target is an input tag
    if (e.target.tagName == 'INPUT') {
        // saving the attribute name into a const
        const dateAttr = 'data-day-and-time';
        // saving the value of the target dateAttr
        let timeData = e.target.getAttribute(dateAttr);
        // loop through the inputs on each click
        for (var i = 0; i < activitiesInput.length; i++) {
            if (e.target.checked == true && timeData == activitiesInput[i].getAttribute(dateAttr)) {
                // Disable all activities with the same date and time
                activitiesInput[i].disabled = true;
                activitiesInput[i].parentNode.style.color = 'red';
                // Enable the event target for deselecting
                e.target.disabled = false;
                e.target.parentNode.style.color = 'white';
            };
            if (e.target.checked == false && timeData == activitiesInput[i].getAttribute(dateAttr)) {
                // Enable all activities with the same date and time
                activitiesInput[i].disabled = false;
                activitiesInput[i].parentNode.style.color = '#f2f2f2';
            };
        };

        if (e.target.checked) {
            totalCosts += parseInt(e.target.getAttribute('data-cost'))
            totalCostsField.textContent = totalCosts;
        } else {
            totalCosts = totalCosts - parseInt(e.target.getAttribute('data-cost'))
            totalCostsField.textContent = totalCosts;
        };
    };
});

//---------------------
// Step 5: Payment Info
//---------------------

const paymentSelection = document.querySelector('#payment');
const payments = document.querySelectorAll('#payment option');
const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');

for (var i = 0; i < payments.length; i++) {
    if (payments[i].value == 'select method') {
        // disable the placeholder "select method"
        payments[i].disabled = true;
    } else if (payments[i].value == 'credit card') {
        // select "credit card" as default and hide the other payments
        payments[i].selected = true;
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
        creditCard.style.display = 'inherit';
    }
}

let creditPayment = true;

paymentSelection.addEventListener('change', (e) => {
    if (e.target.value == 'credit card') {
        // If the user select credit card -> show credit card payment and hide the other payment methods
        console.log('credit card');
        creditCard.style.display = 'inherit';
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
        // Set credit payment to 'true' for activating the validation by clicking the submit button
        creditPayment = true;
    } else if (e.target.value == 'paypal') {
        // if the user select paypal -> show paypal payment and hide the other payment methods
        console.log('paypal');
        creditCard.style.display = 'none';
        paypal.style.display = 'inherit';
        bitcoin.style.display = 'none';
        // Set credit payment to 'false' for deactivation the validation by clicking the submit button
        creditPayment = false;
    } else if (e.target.value == 'bitcoin') {
        // if the user select bitcoin -> show bitcoin payment and hide the other payment methods
        console.log('bitcoin');
        creditCard.style.display = 'none';
        paypal.style.display = 'none';
        bitcoin.style.display = 'inherit';
        // Set credit payment to 'false' for deactivation the validation by clicking the submit button
        creditPayment = false;
    }
});

console.log(creditPayment);

//---------------------
// Validation Functions
//---------------------

// Variables for checking the validations if user clicks the submit button
let userNameIsValid = false;
let emailIsValid = false;
let validActivity = false;
let cardNumberIsValid = false;
let zipCodeIsValid = false;
let cvvIsValid = false;

// Name Validation ----- //
function isValidName(name) {
    // Validation for two names (first name and last name) - no specific order
    return /^[A-Za-z]+\s[A-Za-z]+$/.test(name);
};

// Change the style when the user leaves the input field
nameField.addEventListener('blur', () => {
    let userName = nameField.value;

    if (isValidName(userName)) {
        nameField.style.border = '2px solid green';
        nameField.style.color = 'green';
        return userNameIsValid = true;
    } else {
        nameField.style.border = '3px solid red';
        return userNameIsValid = false;
    }
});

// E-Mail Validation ----- //
function isValidEmail(email) {
    return /^[^@]+@[^@]+\.[a-z]+$/.test(email);
};

const emailField = document.querySelector('#mail');

// Change the style when the user leaves the input field
emailField.addEventListener('blur', () => {
    let email = emailField.value;
    if (isValidEmail(email)) {
        emailField.style.border = '2px solid green';
        emailField.style.color = 'green';
        return emailIsValid = true;
    } else {
        emailField.style.border = '3px solid red';
        return emailIsValid = false;
    };
});

// Checking if at least one checkbox is checked ----- //
function checkboxActive() {
    if (totalCosts == 0) {
        // If no checkbox is checked return false
        return validActivity = false;
    } else {
        // if at least on checkbox is checked return true
        return validActivity = true;
    };
};

// Credit Card Number Validation ----- //
cardNumber = document.querySelector('#cc-num');

function isValidCardNumber(cardNumber) {
    return /^\d{13,16}$/.test(cardNumber);
};

// if the credit card number field has focus -> show the text input in "ccInfo"
cardNumber.addEventListener('focus', () => {
    const ccInfo = document.querySelector('#ccInfo');
    let ccNumber = cardNumber.value;
    if (ccNumber == '') {
        ccInfo.textContent = 'Type in your credit card number!';
    };
})

// Change the style when the user leaves the input field
cardNumber.addEventListener('blur', () => {
    let ccNumber = cardNumber.value;
    if (isValidCardNumber(ccNumber)) {
        cardNumber.style.border = '2px solid green';
        cardNumber.style.color = 'green';
        return cardNumberIsValid = true;
    } else {
        cardNumber.style.border = '3px solid red';
        return cardNumberIsValid = false;
    }
});

// change the content of ccInfo if value has changed by input
cardNumber.addEventListener('input', () => {
    const ccInfo = document.querySelector('#ccInfo');
    let ccNumber = cardNumber.value;
    let validCc = isValidCardNumber(ccNumber);
    if (!validCc && ccNumber == '') {
        ccInfo.innerHTML = 'Type in your credit card number!';
    } else if (!validCc) {
        ccInfo.innerHTML = 'The card number has between 13 and 16 digits!';
    } else {
        ccInfo.innerHTML = "That's a valid credit card number!";
    };
});

// Zip Code Validation ----- //
zipCode = document.querySelector('#zip');

// create the validation for zip code
function isValidZipCode(zipCode) {
    return /^\d{5}$/.test(zipCode);
};

// create a hint for the zip code field on focus
zipCode.addEventListener('focus', () => {
    const zipInfo = document.querySelector('#zipInfo');
    let ccNumber = cardNumber.value;
    if (ccNumber == '') {
        zipInfo.textContent = 'Type in your 5 digit zip!';
    };
})

// Change the style when the user leaves the input field
zipCode.addEventListener('blur', () => {
    let zCode = zipCode.value;
    if (isValidZipCode(zCode)) {
        zipCode.style.border = '2px solid green';
        zipCode.style.color = 'green';
        return zipCodeIsValid = true;
    } else {
        zipCode.style.border = '3px solid red';
        return zipCodeIsValid = false;
    }
});

// change the content of zipInfo if value has changed by input
zipCode.addEventListener('input', () => {
    const zipInfo = document.querySelector('#zipInfo');
    let zCode = zipCode.value;
    let validZip = isValidZipCode(zCode);
    if (!validZip && zCode == '') {
        console.log('empty and invalid')
        zipInfo.textContent = 'Type in your 5 digit Zip!';
    } else if (!validZip) {
        zipInfo.textContent = 'Must be 5 digits!';
    } else {
        zipInfo.textContent = 'That is a valid Zip!';
    };
});

// CVV Validation ----- //
cvvNumber = document.querySelector('#cvv');

// create the validation for cvv
function isValidCvv(cvv) {
    return /^\d{3}$/.test(cvv);
}

// do something by leaving the cvv field
cvvNumber.addEventListener('blur', () => {
    let cvvCode = cvvNumber.value;
    if (isValidCvv(cvvCode)) {
        // if the cvv is valid -> green border
        cvvNumber.style.border = '2px solid green';
        cvvNumber.style.color = 'green';
        return cvvIsValid = true;
    } else {
        // if the cvv is invalid -> red boarder
        cvvNumber.style.border = '3px solid red';
        return cvvIsValid = false;
    }
});

//------------------------
// Step 5: Submit the form
//------------------------

const submitButton = document.querySelector('button');

submitButton.addEventListener('click', (e) => {
    // calling the checkboxActive funktion
    checkboxActive();

    // Check Validation when user clicks on "submit"
    if (userNameIsValid && emailIsValid && validActivity && !creditPayment) {
        console.log('all valid - no credit card');
    } else if (userNameIsValid && emailIsValid && validActivity && cardNumberIsValid && zipCodeIsValid && cvvIsValid && creditPayment) {
        console.log('all valid');
    } else {
        // remove the submit button function
        e.preventDefault();
    }

    if (!userNameIsValid) {
        // if the user name isn't valid -> show error message
        console.log('invalid User name');
        document.querySelector('#user-error').style.display = 'inherit';
    } else {
        document.querySelector('#user-error').style.display = 'none';
    };

    if (!emailIsValid) {
        // if the email isn't valid -> show error message
        console.log('invalid email');
        document.querySelector('#email-error').style.display = 'inherit';
    } else {
        document.querySelector('#email-error').style.display = 'none';
    };

    if (!validActivity) {
        // if no checkbox is checked -> show error message
        console.log('invalid activity');
        document.querySelector('#acty-error').style.display = 'inherit';
    } else {
        document.querySelector('#acty-error').style.display = 'none';
    };

    if (!cardNumberIsValid && creditPayment) {
        // if card number is invalid AND credit card payment is active -> show error message
        console.log('invalid card number');
        document.querySelector('#cardnumber-error').style.display = 'inherit';
    } else {
        document.querySelector('#cardnumber-error').style.display = 'none';
    };

    if (!zipCodeIsValid && creditPayment) {
        // if zip code is invalid AND credit card payment is active -> show error message
        console.log('invalid zip code');
        document.querySelector('#zip-error').style.display = 'inherit';
    } else {
        document.querySelector('#zip-error').style.display = 'none';
    };

    if (!cvvIsValid && creditPayment) {
        // if cvv is invalid AND credit card payment is active -> show error message
        console.log('invalid cvv');
        document.querySelector('#cvv-error').style.display = 'inherit';
    } else {
        document.querySelector('#cvv-error').style.display = 'none';
    };
});
