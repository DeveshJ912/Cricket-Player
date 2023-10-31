import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})

export class Cache {
    user: any;
    constructor(private storage: SessionStorageService) {
        let cachedUser = this.get('user');

        if (!cachedUser) {
            this.user = new User(null);
            console.info("New user created 28/01/2023 11:05 PM");
        } else {            
            this.user = new User(cachedUser);
            console.info('User found...  28/01/2023 11:05 PM');
        }
    }

    set(key:any, val:any) {
        let valString: string;
        if (typeof val == 'object') {
            valString = JSON.stringify(val);
        } else {
            valString = val;
        }
        this.storage.store(key, valString);
    }

    get(key:any) {
        let val = this.storage.retrieve(key)
        if (typeof val == 'string') {
            let valObj = JSON.parse(val);
            if (typeof valObj == 'object') {
                return valObj;
            }
        }
        return val;
    }
    clear(key:any) {
        return this.storage.clear(key);
    }
}