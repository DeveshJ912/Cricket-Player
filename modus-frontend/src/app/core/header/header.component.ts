import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/shared/common-services';
import { Cache } from 'src/shared/common-services/cache.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public cache: Cache, private alert: AlertService) { }

  ngOnInit(): void {
  }

  navigate(nav: any) {
    this.router.navigate([nav])
  }

  logout() {
    this.cache.user.loggedIn = false;
    this.cache.set('user', this.cache.user);
    this.router.navigate(['/application/all-players'])
    this.alert.success("You are successfully logged out ");
  }
}
