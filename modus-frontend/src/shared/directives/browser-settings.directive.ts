import { Directive, HostListener } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

@Directive({ selector: "[disableKeys]" })
export class BrowserDirective {
  constructor(private router: Router) {
    const navigationSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.userInteactionHandler();
      }
    });
  }
  /*Stop session timeout if users clicks in window*/
  @HostListener("click", ["$event"])
  onClickChange(event: any) {
    // this.userIdle.restartUserIdleWatch();
  }

  /*Stop session timeout if users preses any key */
  @HostListener("window:keydown", ["$event"])
  onKeyPress(event: any) {
    let e = <KeyboardEvent>event;
    let keyCode = e.which || e.keyCode;
    if (keyCode == 116 || (keyCode == 82 && e.ctrlKey)) {
      e.preventDefault();
    }
    // this.userIdle.restartUserIdleWatch();
  }

  /*Disable Right click eveywhere*/
  @HostListener("contextmenu", ["$event"])
  onContextmenu(event: any) {
    event.returnValue = false;
  }

  /*On angular state chnage again push hash for toggle*/
  userInteactionHandler() {
    if (!window.location.hash) {
      window.setTimeout(() => {
        window.location.hash = "!";
      }, 50);
    }
  }
  /*With hash toggled between ! and empty we disable back key */
  @HostListener("window:onhashchange", ["$event"])
  onHashChange(event: any) {
    //console.info("window.onhashchange..", event);
    var _hash = "!";
    if (window.location.hash && window.location.hash !== _hash) {
      window.location.hash = _hash;
    }
  }
}
