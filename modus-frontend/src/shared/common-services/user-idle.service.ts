import { Injectable } from '@angular/core';
// import { UserService } from "../";
// import { Cache } from './cache.service';

@Injectable({
    providedIn: 'root'
})
export class UserIdleService {
    userIdleWatching: boolean = false;
    userIdleTimer: any
    constructor( private cache: Cache) {
    }

    userIdleWatchStart(time: number) {
        this.userIdleWatching = true;
        this.userIdleTimer = setTimeout(() => {
            // this.userService.logout(1);
        }, time);
    }

    restartUserIdleWatch(){
        if(this.userIdleWatching){
            clearTimeout(this.userIdleTimer);
            // this.userIdleWatchStart(this.cache.user.sessionTime);
        }
    }

    stopSession(){
        if(this.userIdleWatching){
            clearTimeout(this.userIdleTimer);
            this.userIdleWatching = false;
        }
    }
}