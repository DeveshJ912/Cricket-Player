import { Component } from "@angular/core";
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html'
})

export class FooterComponent {
    constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer){
        iconRegistry.addSvgIcon('facebook', sanitizer.bypassSecurityTrustResourceUrl("/assets/images/icons/facebook.svg"));
        iconRegistry.addSvgIcon('instagram', sanitizer.bypassSecurityTrustResourceUrl("/assets/images/icons/instagram.svg"));
        iconRegistry.addSvgIcon('github', sanitizer.bypassSecurityTrustResourceUrl("/assets/images/icons/github.svg"));
        iconRegistry.addSvgIcon('linkedin', sanitizer.bypassSecurityTrustResourceUrl("/assets/images/icons/linkedIn.svg"));
    }
}