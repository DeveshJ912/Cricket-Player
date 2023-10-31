import { Directive, Inject, Input, TemplateRef, HostListener, ElementRef } from '@angular/core'
import { NgControl } from '@angular/forms';

/* indianCurrencyFormatter numberOnly alphaOnly alphaWithSpaces alphaNumericOnly alphaNumericWithSpecialsOnly*/
@Directive({
    selector: '[numberOnly]',
    inputs: ['length', 'cropZero', 'nonZero'],
})
export class NumberOnlyDirective {
    public length: number = 0;
    private cropZero: boolean;
    private nonZero: boolean;

    constructor(
        private el: ElementRef,
        private control: NgControl) {
        this.cropZero = true;
        this.nonZero = false;
    }
    @HostListener('input', ['$event']) onInputChange(event: any) {
        const initalValue = this.el.nativeElement.value;
        let newValue = initalValue;
        var re = new RegExp("", "g");
        newValue = newValue.replace(re, '');
        if (this.nonZero) {
            newValue = initalValue.replace(/^0(0+)?/g, '');
        } else if (this.cropZero) {
            newValue = initalValue.replace(/^0(0+)?/g, '0');
        }
        newValue = newValue.replace(/[^0-9]*/g, '');

        if (this.length && newValue.length > this.length) {
            newValue = newValue.substring(0, this.length)
        }
        this.el.nativeElement.value = newValue;
        this.control?.control?.setValue(newValue);

        if (initalValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }

    @HostListener('keyup', ['$event']) onKeyPressUp(event: any) {

        if (this.el.nativeElement.value.length >= this.length) {
            if (event.srcElement.nextElementSibling) {
                event.srcElement.nextElementSibling.focus();
            }
        }
        if (event.keyCode == 8 && event.srcElement.previousElementSibling) {
            event.srcElement.previousElementSibling.focus();
        }
    }
}

@Directive({
    selector: '[numberOnlyDecimal]',
    inputs: ['length'],
})
export class NumberOnlyWithDecimalDirective {
    public length: number = 0;

    constructor(
        private el: ElementRef,
        private control: NgControl) {
    }
    @HostListener('input', ['$event']) onInputChange(event: any) {
        const initalValue = this.el.nativeElement.value;
        let newValue = initalValue;
        var re = new RegExp("", "g");
        newValue = newValue.replace(re, '');
        newValue = newValue.replace(/[^0-9\.]*/g, '');

        if (this.length && newValue.length > this.length) {
            newValue = newValue.substring(0, this.length)
        }
        this.el.nativeElement.value = newValue;
        this.control?.control?.setValue(newValue);

        if (initalValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }

    @HostListener('keyup', ['$event']) onKeyPressUp(event: any) {

        if (this.el.nativeElement.value.length >= this.length) {
            if (event.srcElement.nextElementSibling) {
                event.srcElement.nextElementSibling.focus();
            }
        }
        if (event.keyCode == 8 && event.srcElement.previousElementSibling) {
            event.srcElement.previousElementSibling.focus();
        }
    }
}


@Directive({
    selector: '[alphaOnly]',
    inputs: ['length'],
})
export class AlphaOnlyDirective {
    public length: number = 0;
    private upperOnly: boolean = false;

    constructor(
        private el: ElementRef,
        private control: NgControl) {
    }
    @HostListener('input', ['$event']) onInputChange(event: any) {
        const initalValue = this.el.nativeElement.value;
        let newValue = initalValue;
        var re = new RegExp("", "g");
        newValue = newValue.replace(re, '');
        newValue = newValue.replace(/[^a-zA-Z]*/g, '');

        if (this.length && newValue.length > this.length) {
            newValue = newValue.substring(0, this.length)
        }
        if (this.upperOnly) newValue = newValue.toUpperCase();
        this.el.nativeElement.value = newValue;
        this.control?.control?.setValue(newValue);

        if (initalValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}
@Directive({
    selector: '[alphaWithSpaces]',
    inputs: ['length'],
})
export class AlphaWithSpacesDirective {
    private length: number = 0;

    constructor(
        private el: ElementRef,
        private control: NgControl) {
    }
    @HostListener('input', ['$event']) onInputChange(event: any) {
        const initalValue = this.el.nativeElement.value;
        let newValue = initalValue;
        var re = new RegExp("", "g");
        newValue = newValue.replace(re, '');
        newValue = newValue.replace(/[^a-zA-Z\s]*/g, '');
        newValue = newValue.replace(/\s\s+$/g, ' ');

        if (this.length && newValue.length > this.length) {
            newValue = newValue.substring(0, this.length)
        }
        this.el.nativeElement.value = newValue;
        this.control?.control?.setValue(newValue);

        if (initalValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}

@Directive({
    selector: '[limitLength]',
    inputs: ['length'],
})
export class LimitLengthDirective {
    private length: number = 0;

    constructor(
        private el: ElementRef,
        private control: NgControl) {

    }
    @HostListener('blur', ['$event.target.value']) onBlur(value: any) {
        var re = new RegExp("", "g");
        let newValue = value.replace(re, '');
        this.el.nativeElement.value = newValue;
        this.control?.control?.setValue(newValue);
    }
    @HostListener('keydown', ['$event']) onKeyPress(event: any) {
        let e = <KeyboardEvent>event;
        if (e.shiftKey) {
            e.preventDefault();
        }
        if (this.length && this.el.nativeElement.value.length >= this.length) {
            e.preventDefault();
        }
    }
}

@Directive({
    selector: '[alphaNumericOnly]',
    inputs: ['length', 'upperOnly']
})
export class AlphaNumericOnlyDirective {
    private length: number = 0;
    private upperOnly: boolean = false;

    constructor(
        private el: ElementRef,
        private control: NgControl) {

    }
    @HostListener('input', ['$event']) onInputChange(event: any) {
        const initalValue = this.el.nativeElement.value;

        let newValue = initalValue;
        var re = new RegExp("", "g");
        newValue = newValue.replace(re, '');
        newValue = newValue.replace(/[^0-9a-zA-Z]*/g, '');

        if (this.length && newValue.length > this.length) {
            newValue = newValue.substring(0, this.length)
        }
        if (this.upperOnly) newValue = newValue.toUpperCase();
        this.el.nativeElement.value = newValue;
        this.control?.control?.setValue(newValue);

        if (initalValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}

@Directive({
    selector: '[alphaNumericSpaceOnly]',
    inputs: ['length', 'upperOnly']
})
export class AlphaNumericWithSpaceOnlyDirective {
    private length: number = 0;
    private upperOnly: boolean = false;

    constructor(
        private el: ElementRef,
        private control: NgControl) {

    }
    @HostListener('input', ['$event']) onInputChange(event: any) {
        const initalValue = this.el.nativeElement.value;

        let newValue = initalValue;
        var re = new RegExp("", "g");
        newValue = newValue.replace(re, '');
        newValue = newValue.replace(/[^0-9a-zA-Z\s]*/g, '');
        newValue = newValue.replace(/\s\s+$/g, ' ');

        if (this.length && newValue.length > this.length) {
            newValue = newValue.substring(0, this.length)
        }
        if (this.upperOnly) newValue = newValue.toUpperCase();
        this.el.nativeElement.value = newValue;
        this.control?.control?.setValue(newValue);

        if (initalValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}

@Directive({
    selector: '[alphaNumericWithSpecialsOnly]',
    inputs: ['length', 'upperOnly']
})
export class AlphaNumericWithSpecialsOnlyDirective {
    private length: number = 0;
    private upperOnly: boolean = false;

    constructor(
        private el: ElementRef,
        private control: NgControl) {
    }
    @HostListener('input', ['$event']) onInputChange(event: any) {
        const initalValue = this.el.nativeElement.value;
        let newValue = initalValue;
        var re = new RegExp("", "g");
        newValue = newValue.replace(re, '');
        newValue = newValue.replace(/[^0-9a-zA-Z-._@]*/g, '');

        if (this.length && newValue.length > this.length) {
            newValue = newValue.substring(0, this.length)
        }
        if (this.upperOnly) newValue = newValue.toUpperCase();
        this.el.nativeElement.value = newValue;
        this.control?.control?.setValue(newValue);

        if (initalValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}

@Directive({
    selector: '[alphaNumericWithSpecialsAndSpaceOnly]',
    inputs: ['length', 'upperOnly']
})
export class AlphaNumericWithSpecialsAndSpaceOnlyDirective {
    private length: number = 0;
    private upperOnly: boolean = false;

    constructor(
        private el: ElementRef,
        private control: NgControl) {

    }
    @HostListener('input', ['$event']) onInputChange(event: any) {
        const initalValue = this.el.nativeElement.value;
        let newValue = initalValue;
        var re = new RegExp("", "g");
        newValue = newValue.replace(re, '');
        newValue = newValue.replace(/[^0-9a-zA-Z-.;\/\\'\s]*/g, '');

        if (this.length && newValue.length > this.length) {
            newValue = newValue.substring(0, this.length)
        }
        if (this.upperOnly) newValue = newValue.toUpperCase();
        this.el.nativeElement.value = newValue;
        this.control?.control?.setValue(newValue);

        if (initalValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}

@Directive({
    selector: '[numberWithSlashOnly]',
    inputs: ['length'],
})
export class NumberWithSlashOnlyDirective {
    private length: number = 0;

    constructor(
        private el: ElementRef,
        private control: NgControl) {

    }
    @HostListener('input', ['$event']) onInputChange(event: any) {
        const initalValue = this.el.nativeElement.value;
        let newValue = initalValue;
        var re = new RegExp("", "g");
        newValue = newValue.replace(re, '');
        newValue = newValue.replace(/[^0-9.\/]*/g, '');

        if (this.length && newValue.length > this.length) {
            newValue = newValue.substring(0, this.length)
        }
        this.el.nativeElement.value = newValue;
        this.control?.control?.setValue(newValue);

        if (initalValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}
// Comma separate EMAIL's
@Directive({
    selector: '[alphaNumericWithSpecialsWithCommaOnly]',
    inputs: ['length', 'upperOnly']
})
export class AlphaNumericWithSpecialsWithCommaOnlyDirective {
    private length: number = 0;
    private upperOnly: boolean = false;

    constructor(
        private el: ElementRef,
        private control: NgControl) {

    }
    @HostListener('input', ['$event']) onInputChange(event: any) {
        const initalValue = this.el.nativeElement.value;
        let newValue = initalValue;
        const re = new RegExp("", 'g');
        newValue = newValue.replace(re, '');
        newValue = newValue.replace(/[^0-9a-zA-Z-.,_@]*/g, '');

        if (this.length && newValue.length > this.length) {
            newValue = newValue.substring(0, this.length);
        }
        if (this.upperOnly) { newValue = newValue.toUpperCase(); }
        this.el.nativeElement.value = newValue;
        this.control?.control?.setValue(newValue);

        if (initalValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}
//Directive for only password for all special characters
@Directive({
    selector: '[alphaNumericWithAllSpecialsOnly]',
    inputs: ['length', 'upperOnly']
})
export class AlphaNumericWithAllSpecialsOnlyDirective {
    private length: number = 0;
    private upperOnly: boolean = false;

    constructor(
        private el: ElementRef,
        private control: NgControl) {

    }
    @HostListener('input', ['$event']) onInputChange(event: any) {
        const initalValue = this.el.nativeElement.value;
        let newValue = initalValue;
        var re = new RegExp("", "g");
        newValue = newValue.replace(re, '');
        newValue = newValue.replace(/[^0-9a-zA-Z-._@!#$%^&*,=+{()/?<>|`~;:'"}]*/g, '');

        if (this.length && newValue.length > this.length) {
            newValue = newValue.substring(0, this.length)
        }
        if (this.upperOnly) newValue = newValue.toUpperCase();
        this.el.nativeElement.value = newValue;
        this.control?.control?.setValue(newValue);

        if (initalValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}

@Directive({
    selector: '[mobile]',
    inputs: ['length']
})
export class MobileFormatterDirective {
    private length: number = 0;
    private cropZero: boolean;

    constructor(
        private el: ElementRef,
        private control: NgControl) {
        this.cropZero = true;
    }
    @HostListener('input', ['$event']) onInputChange(event: any) {
        const initialValue = this.el.nativeElement.value;
        let newValue = initialValue;
        const re = new RegExp("", 'g');

        newValue = newValue.replace(re, '');

        if (this.cropZero) {
            newValue = initialValue.replace(/^0(0+)?/g, '0');
        }

        newValue = newValue.replace(/[^0-9,]*/g, '');

        if (this.length && newValue.length > this.length) {
            newValue = newValue.substring(0, this.length);
        }
        this.el.nativeElement.value = newValue;
        this.control?.control?.setValue(newValue);

        if (initialValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}
@Directive({
    selector: 'ng-template[type]'
})
export class ButtonsTemplate {
    @Input() type: string = '';
    constructor(public template: TemplateRef<any>) {
    }
}

@Directive({
    selector: '[date]',
    inputs: ['length'],
})
export class DateFormatterDirective {
    private length: number = 0;
    constructor(private el: ElementRef, private control: NgControl) {
    }

    @HostListener('keydown', ['$event']) onKeyPress(event: any) {
        var key = event.keyCode;
        let newValue = this.el.nativeElement.value;
        if (newValue.length === 4) {
            newValue += '/';
        }
        if (key === 8) { /* If backspace is pressed*/
            if (newValue.length == 5) {        /*if next char to be removed is /' remove last two characters from input value*/
                newValue = newValue.substr(0, newValue.length - 1);
            }
            newValue = newValue.substr(0, newValue.length);  /*remove last character*/
        }
        else if (!((key > 47 && key < 58) || (key > 95 && key < 106)) || newValue.length === 7) {
            if (!(key == 9 || key == 37 || key == 39)) {          /*if key pressed is not number or input got date*/
                event.preventDefault(); //no nothing
            }
        }
        this.el.nativeElement.value = newValue;
        return;
    }
}
