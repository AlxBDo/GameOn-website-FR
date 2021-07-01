import inputValidator from "./inputValidator.js";
import validationDisplay from "./validationDisplay.js";

const termsAndConditionCheckbox = document.getElementById("checkbox1");

/**
 * class composed of static methods retrieving the result of input checks and displaying it 
 */
 export default class formValidationHandler {

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

  static reservationReceiptValidation(){
    let url = window.location.href;
    if(url.split('?')[1]){
      let getParams = new URLSearchParams(url.split('?')[1]);
      if(getParams.has("first")){
        validationDisplay.confirmationReceiptMessage(getParams.get("first"));
      }
    }
  }

  /**
   * check if input value matches to location's rules
   * @param {boolean} focusField true = input focus
   */
  static termsAndConditionsValidation(focusField = true, inverse = true){ 
    return validationDisplay.apply(
      termsAndConditionCheckbox, 
      inverse 
      ? termsAndConditionCheckbox.checked 
      ? false 
      : true 
      : termsAndConditionCheckbox.checked, 
      focusField
    );
  }
  
}
