import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Injectable } from "@angular/core";
import { ErrorStateMatcher } from '@angular/material/core';

@Injectable({
    providedIn: 'root'
})
export class CustomValidators {
    static fullNameValidator(maxlength:number) {
        return (control: FormControl) => {
            const fullName = control.value;
            if (fullName) {
                if (fullName.length > maxlength) {
                    return {
                        maxlength: true
                    };
                } else {
                    const re = new RegExp(/^[A-Za-z\s]+$/);
                    if (!re.test(fullName)) {
                        return {
                            pattern: true
                        };
                    }
                }
            }
            return null;
        };
    }

    static panValidator(control: FormControl) {
        const pan = control.value;
        const re = new RegExp(/^[A-Z]{3}[P][A-Z][0-9]{4}[A-Z]$/);
        if (pan) {
            if (pan.length > 10) {
                return {
                    maxlength: true
                };
            } else if (!re.test(pan)) {
                return {
                    pattern: true
                };
            }
        }
        return null;
    }

    static CompanyAndPersonalPanValidator(control: FormControl) {
        const pan = control.value;
        const re = new RegExp(/^[A-Z]{3}[ABCEFGHJLPT][A-Z][0-9]{4}[A-Z]$/);
        if (pan) {
            if (pan.length > 10) {
                return {
                    maxlength: true
                };
            } else if (!re.test(pan)) {
                return {
                    pattern: true
                };
            }
        }
        return null;
    }

    static aadharValidator(control: FormControl) {
        const aadhar = control.value;
        const re = new RegExp(/^[0-9]{12}$/);
        if (aadhar) {
            if (aadhar.length > 12) {
                return {
                    maxlength: true
                };
            } else if (!re.test(aadhar)) {
                return {
                    pattern: true
                };
            }
        }
        return null;
    }

    static addressValidator(maxlength:number) {
        return (control: FormControl) => {
            const address = control.value;
            const re = new RegExp(/^[0-9a-zA-Z.,;:\[\](){}\/\\'\-\s]*$/);

            if (address) {
                if (address.length > maxlength) {
                    return {
                        maxlength: true
                    };
                } else if (address.length < 5) {
                    return {
                        minlength: true
                    };
                } else if (!re.test(address)) {
                    return {
                        pattern: true
                    };
                }
            }
            return null;
        };
    }

    static mobileValidator(control: FormControl) {
        const mobile = control.value;
        const re = new RegExp(/^[6-9]{1}[0-9]{9}$/);
        const re2 = new RegExp(/^(\d)(?!\1+$)\d{9}$/);
        // ^(\d)(?!\1+$)\d{9}$
        if (mobile) {
            if (mobile.length > 10) {
                return {
                    maxlength: true
                };
            } else if (!re.test(mobile)) {
                return {
                    pattern: true
                };
            } else if (!re2.test(mobile)) {
                return {
                    pattern: true
                }
            }
        }
        return null;
    }

    static emailValidator(control: FormControl) {
        const email = control.value;
        const re = new RegExp(/^[a-zA-Z0-9]([a-zA-Z0-9_-]|(\.(?!\.)))+[a-zA-Z0-9]\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,})+$/);
        if (email) {
            if (email.length > 255) {
                return {
                    maxlength: true
                };
            } else if (!re.test(email)) {
                return {
                    pattern: true
                };
            }
        }
        return null;
    }

    static gstinValidator(control: FormControl) {
        const selector = control.value;
        const re = new RegExp(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/);
        if (selector) {
            if (selector.length > 15) {
                return {
                    maxlength: true
                };
            } else if (!re.test(selector)) {
                return {
                    pattern: true
                };
            }
        }
        return null;
    }

    static selectRequired(lookup:any){
        return (control : FormControl) => {
            const val = control.value;
            lookup.forEach((element:any) => {
                if (element.value != val) {
                    return {
                        required: true
                    };
                }
                return null
            });
        } 
    }
}

// post angular material installation

@Injectable({
    providedIn: 'root'
})
export class FormSubmittedMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl , form: FormGroupDirective | NgForm ): boolean {
        const isSubmitted = form && form.submitted;
        return (control.invalid && (control.touched || isSubmitted));
    }
}