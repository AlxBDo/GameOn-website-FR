//-- CONSTANTES

// DOM Elements
const birthdateIpt = document.getElementById("birthdate");
const closeBtn = document.querySelectorAll(".close");
const confirmReservation = document.getElementById("confirmReservation");
const emailIpt = document.getElementById("email");
const firstNameIpt = document.getElementById("first");
const firstNameReservSpan = document.getElementById("firstNameReserv");
const formData = document.querySelectorAll(".formData");
const lastNameIpt = document.getElementById("last");
const locationLabel = document.querySelectorAll(".checkbox-label");
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalSubmit = document.querySelector("form > .btn-submit");
const quantityIpt = document.getElementById("quantity");
const termsAndConditionBtn = document.getElementById("checkbox1-label");
const termsAndConditionCheckbox = document.getElementById("checkbox1");


//-- FUNCTIONS

// close modal form
function closeModal(){
  modalbg.style.display = "none";
}

function selectLocation(labelChecked){
  document.getElementById(labelChecked.getAttribute('for')).checked = true;
}


/**
 * form validation before send
 * @param {object} event 
 * @returns {boolean} true = is validate
 */
 function validate(event){
   let returnVal = false;
  // check first name input
  if(formValidationHandler.nameValidation(firstNameIpt)){
    // check last name input
    if(formValidationHandler.nameValidation(lastNameIpt)){
      // check email input
      if(formValidationHandler.emailValidation(emailIpt)){
        // check birthdate input
        if(formValidationHandler.birthdateValidation(birthdateIpt)){
          // check quantity input
          if(formValidationHandler.quantityValidation(quantityIpt)){
            // check location input if quantity > 0
            if(quantityIpt.value > 0){ formValidationHandler.locationValidation(); }
            // check terms and conditions are approuved
            if(
              formValidationHandler.termsAndConditionsValidation(true, false) 
              && (quantityIpt.value === 0 || formValidationHandler.locationValidation())
              )
              { return true; }
          }
        }
      }
    }
  }
  event.preventDefault();
  return false;
}


//-- EVENTS

// body onload
window.addEventListener('load', formValidationHandler.reservationReceiptValidation);

// close modal event
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));


// input modal event
document.querySelectorAll("input").forEach(function(ipt){
    ipt.addEventListener("change", function(){
        formValidationHandler.autoValidation(ipt);
    });
});

locationLabel.forEach(function(ipt){ 
  ipt.addEventListener("click", function(){
    selectLocation(ipt);
  }); 
});

termsAndConditionBtn.addEventListener('click', formValidationHandler.termsAndConditionsValidation);

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
modalbg.style.display = "block";
}

// submit modal event
modalSubmit.addEventListener('click', validate);