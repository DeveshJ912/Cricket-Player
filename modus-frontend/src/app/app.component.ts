import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isHeaderFooterVisible: boolean = false;
  routerSubscription: Subscription | undefined;
  constructor(
    private router: Router
  ) {
    this.sessionTimerConfig();
    this.startUserSession();
    this.getCoreCompStatus();
  }
  startUserSession() {
    // this.userIdle.userIdleWatchStart(this.cache.user.sessionTime);
    
  }

  sessionTimerConfig() {
    // this.cache.user.sessionTime = 1800000;
    // this.cache.set("user", this.cache.user);
  }

  asdsf(data:any){
    console.log(data)
  }
  getCoreCompStatus() {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (
          event.urlAfterRedirects.endsWith("all-players") ||
          // event.urlAfterRedirects.endsWith("application")||
          event.urlAfterRedirects.endsWith("add-player")||
          event.urlAfterRedirects.endsWith("login")||
          event.urlAfterRedirects.endsWith("home")||
          event.urlAfterRedirects.endsWith("error")
        ) {
          this.isHeaderFooterVisible = true;
        } else {
          this.isHeaderFooterVisible = false;
        }
      }
    });
  }
}
