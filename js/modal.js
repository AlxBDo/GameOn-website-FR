import editNav from "./fct/editNav.js";
import formValidationHandler from "./obj/formValidationHandler.js";
import validationDisplay from "./obj/validationDisplay.js";


//-- CONSTANTES

// DOM Elements
const birthdateIpt = document.getElementById("birthdate");
const burgerNav = document.querySelector(".icon");
const closeBtn = document.querySelectorAll(".close");
const emailIpt = document.getElementById("email");
const firstNameIpt = document.getElementById("first");
const lastNameIpt = document.getElementById("last");
const locationLabel = document.querySelectorAll(".checkbox-label");
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalForm = document.querySelector(".modal-body form");
const modalSubmit = document.querySelector("form > .btn-submit");
const quantityIpt = document.getElementById("quantity");
const termsAndConditionBtn = document.getElementById("checkbox1-label");


//-- FUNCTIONS

// close modal form
function closeModal(){
  modalbg.style.display = "none";
}

/**
 * select location radio input when user click label
 * @param {object} labelChecked label html DOM 
 */
function selectLocation(labelChecked){
  let radioIptChcked = document.getElementById(labelChecked.getAttribute('for'));
  radioIptChcked.checked = true;
  validationDisplay.classHtmlHandler(radioIptChcked);
}


/**
 * form validation before send
 * @param {object} event 
 * @returns {boolean} true = is validate
 */
 function validate(event){

  /**
   * object used to call the methods for checking the form fields
   */
  class objectModel{

    /**
     * 
     * @param {object} inputObj DOM element object
     * @param {string} validationFunctionName 
     * @param {string || null} validationFunctionParam 
     * @param {string || boolean || null} conditionFunctionName 
     */
    constructor(
        inputObj = null, 
        validationFunctionName, 
        validationFunctionParam = null, 
        conditionFunctionName = null
      ){
      this.ipt = inputObj;
      this.validFct = validationFunctionName+"Validation";
      this.validFctParam = validationFunctionParam;
      this.condition = conditionFunctionName;
    }

    /**
     * Start form fields verification
     * @returns {boolean} true is validate
     */
    check(){
      return this.condition != null 
              ? this[this.condition]() 
              ? this.validationFctIpt(this.validFct, this.validFctParam) 
              : true 
              : this.validationFctIpt(this.validFct, this.validFctParam) ;
    }

    /**
     * Location field conditional check
     * @returns {boolean} true is validate
     */
    locaCondCheck(){ return parseInt(quantityIpt.value) > 0 ? true : false; }
    
    /**
     * Call form fields verification methods
     * @returns {boolean} true is validate
     */
    validationFctIpt(){ 
      return this.inputObj === null 
            ? formValidationHandler[this.validFct]() 
            : this.validFctParam === null 
            ? formValidationHandler[this.validFct](this.ipt) 
            : formValidationHandler[this.validFct](this.ipt, this.validFctParam); 
    }

   }

   /**
    * form fields's array to check
    */
   let inputsToValidate = [
    new objectModel(firstNameIpt, "name"), 
    new objectModel(lastNameIpt, "name"), 
    new objectModel(emailIpt, "email"), 
    new objectModel(birthdateIpt, "birthdate"), 
    new objectModel(quantityIpt, "quantity"), 
    new objectModel(null, "location", null, "locaCondCheck"), 
    new objectModel(true, "termsAndConditions", false), 
   ];

   /**
    * browse the array to call the verification methods
    * @returns {boolean} false if one of the checks fails
    */
   for( let iptTV of inputsToValidate){
     if(!iptTV.check()){
       event.preventDefault();
       return false;
     }
   }

   return true;

}


//-- EVENTS

// body onload
window.addEventListener('load', formValidationHandler.reservationReceiptValidation);

// burger nav icon
burgerNav.addEventListener('click', editNav);

// close modal event
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));


// input modal event
document.querySelectorAll("input").forEach(function(ipt){
    ipt.addEventListener("change", function(){
        return formValidationHandler.autoValidation(ipt);
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

// Form modal event
modalForm.addEventListener('submit', validate);

// submit modal event
modalSubmit.addEventListener('click', validate);