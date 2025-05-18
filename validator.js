
function Validator(options) {

    //Select checking-form
    const formElement = document.querySelector(options.form);
    const selectorRules = {};

    //Event validation
    const validate = (rule, inputElement, errorElement) => {
        let errorMessage;
        const rules = selectorRules[rule.selector];

        for(let i = 0; i < rules.length; i++){
            errorMessage = rules[i](inputElement.value);
            if(errorMessage) break;
        }

        if(errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
            inputElement.parentElement.classList.remove('valid');
        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
            inputElement.parentElement.classList.add('valid');
        }

        return !errorMessage;
    }

    //If form exist loop through each element
    if(formElement){

        formElement.onsubmit = (e) => {
            e.preventDefault();
            let isFormValid = true;

            options.rules.forEach(rule => {
                var inputElement = formElement.querySelector(rule.selector);
                const errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                let isValid = validate(rule, inputElement, errorElement);

                if(!isValid){
                    isFormValid = false;
                }
            })

            if(isFormValid) {
                if(typeof options.onSubmit === 'function') {
                    var EnableInputs = formElement.querySelectorAll( '[name]:not([disable])');
                    var formValues = Array.from(EnableInputs).reduce( (values, input) => {
                        return (values[input.name] = input.value) && values;
                    }, {})
                    options.onSubmit(formValues);
                }
            }
        }

        options.rules.forEach(rule => {
        // Select checking-element
            var inputElement = formElement.querySelector(rule.selector);
            
            if(Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            if(inputElement) {
                //Select place that error message handle
                const errorElement = inputElement.parentElement.querySelector(options.errorSelector);

                //Handle blur event by call back
                inputElement.onblur = () => validate(rule, inputElement, errorElement);

                //Handle input event to make sure when user input there's not error message
                inputElement.oninput = () => {
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }

            }
        });
    }
}

Validator.isRequired = (selector, message) => {
    return {
        selector: selector,
        test: function(value) {
            return value.trim() ? undefined : message || "Please enter this information";
        }
    }
}

Validator.isEmail = (selector, message) => {
    return {
        selector: selector,
        test: function(value) {
            const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w)*(\.\w{2,3})+$/;
            return emailPattern.test(value) ? undefined : message || "Please enter invalid value";
        }
    }
}

Validator.minLength = (selector, min, message) => {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined : message || `Please enter more than ${min} characters`;
        }
    }
}

Validator.maxLength = (selector, max, message) => {
    return {
        selector: selector,
        test: function(value) {
            return value.length <= max ? undefined : message || `Please enter letter than ${max} characters`;
        }
    }
}

Validator.isConfirm = (selector, getConfirmValue, message) =>{
    return {
        selector: selector,
        test: function(value) {
            return (value === getConfirmValue()) ? undefined : message || "Your input is not exactly";
        }
    }
}