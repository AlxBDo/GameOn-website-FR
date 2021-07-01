/**
 * class composed of static methods allowing the display of validation process
 */
 export default class validationDisplay {

  static confirmReservation = document.getElementById("confirmReservation");
  static errorHtmlClass = "error-ipt";
  static firstNameReservSpan = document.getElementById("firstNameReserv");
  static validateHtmlClass = "valid-ipt";


  /**
   * manage class to apply
   * @param {object} inputObj javascript object of DOM element
   * @param {boolean} resultValidation true = validation is correct
   * @param {boolean} focusField true = input focus
   */
  static apply(inputObj, resultValidation = true, focusField = false){
    this.classHtmlHandler(inputObj, resultValidation);
    // focus DOM element if validation return false
    if(focusField && !resultValidation){ inputObj.focus(); }
    return resultValidation;
  }

  /**
   * add and remove html class
   * @param {object} inputObj javascript object of DOM element
   * @param {boolean} resultValidation true = validation is correct
   */
  static classHtmlHandler(inputObj, resultValidation = true){
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
  }

  static confirmationReceiptMessage(firstName){
    this.firstNameReservSpan.innerHTML = firstName;
        this.confirmReservation.classList.add("valid");
        setTimeout(function(){
          this.confirmReservation.classList.remove("valid");
        }, 3000);
  }
  
}