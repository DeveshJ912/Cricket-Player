import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    constructor(private toast: ToastrService) {

    }

    success(message:string) {
        this.toast.success(message);
    }
    info(message:string) {
        this.toast.info(message);
    }
    warn(message:string) {
        this.toast.warning(message);
    }
    error(message:string) {
        this.toast.error(message);
    }
}