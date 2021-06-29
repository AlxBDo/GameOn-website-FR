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
  
}