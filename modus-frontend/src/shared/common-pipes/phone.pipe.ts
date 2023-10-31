import { Pipe, PipeTransform } from '@angular/core';

const PADDING = '000000';

@Pipe({ name: 'phone' })
export class PhonePipe implements PipeTransform {

    constructor() {
    }

    parse(value: string): string {

        return value.replace(/[^0-9]/g, '');
    }

    transform(tel: string): string {
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country = '', city = '', number = '';

        switch (value.length) {
            case 1:
                if (value !== '0') city = '0' + value;
                break;
            default:
                if (value.length > 2) {
                    let startsWith = value.slice(0, 1);
                    if (startsWith !== '0') value = '0' + value;
                }
                city = value.slice(0, 3);
                number = value.slice(3);
        }

        if (number) {
            if (number.length > 4) {
                number = number.slice(0, 4) + '-' + number.slice(4, 9);
            } else {
                number = number;
            }

            return ('(' + city + ') ' + number).trim();
        }
        else {
            return '(' + city;
        }
    }
}
