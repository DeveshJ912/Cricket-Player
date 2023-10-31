import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  UrlTree,
  Route,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { PlayerService } from 'src/app/services/playerService.service';
import { AlertService } from 'src/shared/common-services';
// import { UserService } from '../shared/common-services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private playerService: PlayerService,
    private router: Router,
    private alert:AlertService
    ) {}
  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const { routeConfig } = route;
    const { path } = routeConfig as Route;

    if ((path?.includes('add-player')) && !this.playerService.isUserLoggedIn) {
      this.alert.warn("Please login to perform this action")
      this.router.navigate(['/application/login'])
      return false;
    }
    // this.userService.logout(3);
    return true;
  }
}
