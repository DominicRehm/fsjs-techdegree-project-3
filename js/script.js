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
                e.target.parentNode.style.color = 'black';
            };
            if (e.target.checked == false && timeData == activitiesInput[i].getAttribute(dateAttr)) {
                // Enable all activities with the same date and time
                activitiesInput[i].disabled = false;
                activitiesInput[i].parentNode.style.color = 'black';
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
        payments[i].disabled = true;
    } else if (payments[i].value == 'credit card') {
        payments[i].selected = true;
        creditCard.style.display = 'inherit';
    }
}

let creditPayment = true;

paymentSelection.addEventListener('change', (e) => {
    if (e.target.value == 'credit card') {
        console.log('credit card');
        creditCard.style.display = 'inherit';
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
        creditPayment = true;
    } else if (e.target.value == 'paypal') {
        console.log('paypal');
        creditCard.style.display = 'none';
        paypal.style.display = 'inherit';
        bitcoin.style.display = 'none';
        creditPayment = false;
    } else if (e.target.value == 'bitcoin') {
        console.log('bitcoin');
        creditCard.style.display = 'none';
        paypal.style.display = 'none';
        bitcoin.style.display = 'inherit';
        creditPayment = false;
    }
});

console.log(creditPayment);

//---------------------
// Validation Functions
//---------------------
let userNameIsValid = false;
let emailIsValid = false;
let validActivity = false;
let cardNumberIsValid = false;
let zipCodeIsValid = false;
let cvvIsValid = false;

// Name Validation
function isValidName(name) {
    // Validation for two names (first name and last name) - no specific order
    return /^[A-Za-z]+\s[A-Za-z]+$/.test(name);
};

// E-Mail Validation
function isValidEmail(email) {
    return /^[^@]+@[^@]+\.[a-z]+$/.test(email);
};

// Checking if at least one checkbox is checked
function checkboxActive() {
    if (totalCosts == 0) {
        // If no checkbox is checked return false
        return validActivity = false;
    } else {
        // if at least on checkbox is checked return true
        return validActivity = true;
    };
};

// Credit Card Number Validation
cardNumber = document.querySelector('#cc-num');

function isValidCardNumber(cardNumber) {
    return /^\d{13,16}$/.test(cardNumber);
};

// Zip Code Validation
zipCode = document.querySelector('#zip');

function isValidZipCode(zipCode) {
    return /^\d{5}$/.test(zipCode);
};

// CVV Validation
cvvNumber = document.querySelector('#cvv');

function isValidCvv(cvv) {
    return /^\d{3}$/.test(cvv);
}

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

const emailField = document.querySelector('#mail');

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

cardNumber.addEventListener('input', () => {
    const ccInfo = document.querySelector('#ccInfo');
    let ccNumber = cardNumber.value;
    let validCc = isValidCardNumber(ccNumber);
    if (!validCc) {
        ccInfo.style.display = 'inherit';
    } else {
        ccInfo.style.display = 'none';
    };
});


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

zipCode.addEventListener('input', () => {
    const zipInfo = document.querySelector('#zipInfo');
    let zCode = zipCode.value;
    let validZip = isValidZipCode(zCode);
    if (!validZip) {
        zipInfo.style.display = 'inherit';
    } else {
        zipInfo.style.display = 'none';
    }
});

cvvNumber.addEventListener('blur', () => {
    let cvvCode = cvvNumber.value;
    if (isValidCvv(cvvCode)) {
        cvvNumber.style.border = '2px solid green';
        cvvNumber.style.color = 'green';
        return cvvIsValid = true;
    } else {
        cvvNumber.style.border = '3px solid red';
        return cvvIsValid = false;
    }
});

cvvNumber.addEventListener('input', () => {
    const cvvInfo = document.querySelector('#cvvInfo');
    let cvvCode = cvvNumber.value;
    let validCvv = isValidCvv(cvvCode);
    if (!validCvv) {
        cvvInfo.style.display = 'inherit';
    } else {
        cvvInfo.style.display = 'none';
    };
});


//------------------------
// Step 5: Submit the form
//------------------------

const submitButton = document.querySelector('button');

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    checkboxActive();
    if (!userNameIsValid) {
        console.log('invalid User name');
        document.querySelector('#user-error').style.display = 'inherit';
    } else {
        document.querySelector('#user-error').style.display = 'none';
    };

    if (!emailIsValid) {
        console.log('invalid email');
        document.querySelector('#email-error').style.display = 'inherit';
    } else {
        document.querySelector('#email-error').style.display = 'none';
    };

    if (!validActivity) {
        console.log('invalid activity');
        document.querySelector('#acty-error').style.display = 'inherit';
    } else {
        document.querySelector('#acty-error').style.display = 'none';
    };

    if (!cardNumberIsValid && creditPayment) {
        console.log('invalid card number');
        document.querySelector('#cardnumber-error').style.display = 'inherit';
    } else {
        document.querySelector('#cardnumber-error').style.display = 'none';
    };

    if (!zipCodeIsValid && creditPayment) {
        console.log('invalid zip code');
        document.querySelector('#zip-error').style.display = 'inherit';
    } else {
        document.querySelector('#zip-error').style.display = 'none';
    };

    if (!cvvIsValid && creditPayment) {
        console.log('invalid cvv');
        document.querySelector('#cvv-error').style.display = 'inherit';
    } else {
        document.querySelector('#cvv-error').style.display = 'none';
    };
});
