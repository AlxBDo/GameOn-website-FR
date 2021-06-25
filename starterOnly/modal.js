function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const birthdateIpt = document.getElementById("birthdate");
const closeBtn = document.querySelectorAll(".close");
const emailIpt = document.getElementById("email");
const firstNameIpt = document.getElementById("first");
const formData = document.querySelectorAll(".formData");
const lastNameIpt = document.getElementById("last");
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalSubmit = document.querySelector("form > .btn-submit");
const quantityIpt = document.getElementById("quantity");
const termsAndConditionBtn = document.getElementById("checkbox1-label");
const termsAndConditionCheckbox = document.getElementById("checkbox1");


// object

/**
 * class composed of static methods retrieving the result of input checks and displaying it 
 */
class formValidationHandler {

  static location1Btn = document.getElementById("location1");


  static autoValidation(inputObj){
    let complementFonctionName = false;
    // get input name to determinate function to call
    let iptId = inputObj.getAttribute('id');
    if( iptId === "birthdate" || iptId === "email" || iptId === "quantity"){
      complementFonctionName = iptId;
    } else if( iptId === "first" || iptId === "last" ){
      complementFonctionName = "name";
    }
    if(complementFonctionName){
      return this[complementFonctionName+"Validation"](inputObj);
    }
  }

  /**
   * check if input value matches to Birthdate's rules
   * @param {object} inputObj javascript object of DOM element
   * @param {string} complementFonctionName complement of the function's name to call
   * @param {boolean} focusField true = input focus
   */
  static inputValidation(inputObj, complementFonctionName, focusField = true){
    return validationDisplay.apply(
      inputObj, 
      inputValidator["check"+complementFonctionName](inputObj.value),
      focusField
      );
  }

  /**
   * check if input value matches to Birthdate's rules
   * @param {object} inputObj javascript object of DOM element
   * @param {boolean} focusField true = input focus
   */
  static birthdateValidation(inputObj, focusField = true){ 
    return this.inputValidation(inputObj, "Birthdate", focusField); 
  }

  /**
   * check if input value matches to email's rules
   * @param {object} inputObj javascript object of DOM element
   * @param {boolean} focusField true = input focus
   */
  static emailValidation(inputObj, focusField = true){ 
    return this.inputValidation(inputObj, "Mail", focusField); 
  }

  /**
   * check if input value matches to location's rules
   * @param {boolean} focusField true = input focus
   */
  static locationValidation(focusField = true){ 
    return validationDisplay.apply(
      this.location1Btn, 
      inputValidator.checkLocation(), 
      focusField
    );
  }

  /**
   * check if input value matches to name's rules (first & last)
   * @param {object} inputObj javascript object of DOM element
   * @param {boolean} focusField true = input focus
   */
  static nameValidation(inputObj, focusField = true){ 
    return this.inputValidation(inputObj, "Name", focusField); 
  }

  /**
   * check if input value matches to quantity's rules
   * @param {object} inputObj javascript object of DOM element
   * @param {boolean} focusField true = input focus
   */
  static quantityValidation(inputObj, focusField = true){ 
    return this.inputValidation(inputObj, "Quantity", focusField); 
  }

  /**
   * check if input value matches to location's rules
   * @param {boolean} focusField true = input focus
   */
  static termsAndConditionsValidation(focusField = true, inverse = true){ 
    return validationDisplay.apply(
      termsAndConditionCheckbox, 
      inverse ? termsAndConditionCheckbox.checked ? false : true : termsAndConditionCheckbox.checked, 
      focusField
    );
  }
  
}

/**
 * class composed of static methods allowing to check input's values
 */
class inputValidator{

  static checkedLocationRadioButton = document.querySelectorAll('input[name="location"]:checked');
  static openFields = document.querySelectorAll(
                  "input[type = text], input[type = email], input[type = number], input[type = date]"
                );


  /**
   * birthdate validation
   * @param {string} birthdateToValidate (yyyy-mm-dd)
   * @returns {boolean} true = is correct
   */
  static checkBirthdate(birthdateToValidate){
    return /(^[0-9]{4}-{1}[0-9]{2}-{1}[0-9]{2}$)/.test(birthdateToValidate) ? true : false;
  }

  /**
   * check if one of the location buttons is checked
   * @returns {boolean} : true = is checked
   */
  static checkLocation(){
    return this.checkedLocationRadioButton.length === 0 ? false : true;
  }

  /**
   * email verification
   * @param {string} emailToValidate 
   * @returns {boolean} true = email is correct
   */
  static checkMail(emailToValidate){
    return /([\w-\.]+@[\w\.]+\.{1}[\w]+)/.test(emailToValidate) ? true : false;
  }

  /**
   * first name or last name verification
   * @param {string} nameToValidate 
   * @returns {boolean} true = email is correct
   */
  static checkName(nameToValidate){
    return nameToValidate.length < 2 ? false : true;
  }

  /**
   * check if input paramater is number
   * @param {number} qtyToValidate 
   * @returns {boolean} true = is number
   */
  static checkQuantity(qtyToValidate){
    return isNaN(qtyToValidate) ? false : true;
  }

  /**
   * check if input paramater is empty
   * @param {string} inputToTest 
   * @return {boolean} true = empty
   */
   static isEmpty(inputToTest){
    return inputToTest === "" ? true : false;
  }

}

/**
 * class composed of static methods allowing the display of validation process
 */
 class validationDisplay {

  static errorHtmlClass = "error-ipt";
  static validateHtmlClass = "valid-ipt";


  /**
   * manage class to apply
   * @param {object} inputObj javascript object of DOM element
   * @param {boolean} resultValidation true = validation is correct
   * @param {boolean} focusField true = input focus
   */
  static apply(inputObj, resultValidation = true, focusField = false){
    let classToApply = resultValidation 
                     ? [this.validateHtmlClass, this.errorHtmlClass] 
                     : [this.errorHtmlClass, this.validateHtmlClass] ;
    let parentClassList = inputObj.parentNode.classList;
    if(!parentClassList.contains(classToApply[0])){
      parentClassList.add(classToApply[0]);
      if(parentClassList.contains(classToApply[1])) {
        parentClassList.remove(classToApply[1]);
      }
    }
    if(focusField){ inputObj.focus(); }
    return resultValidation;
  }
  
}

// close modal event
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// close modal form
function closeModal(){
  modalbg.style.display = "none";
}

/**
 * form validation before send
 * @param {object} event 
 * @returns {boolean} true = is validate
 */
function validate(event){
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
            if(formValidationHandler.termsAndConditionsValidation(true, false)){
              return true;
            }
          }
        }
      }
    }
  }
  event.preventDefault();
  return false;
}

// input modal event
document.querySelectorAll("input").forEach(function(ipt){
  ipt.addEventListener("change", function(){
    formValidationHandler.autoValidation(ipt);
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


