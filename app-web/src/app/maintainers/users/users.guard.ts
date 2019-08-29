import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';
import { AuthService } from '../../auth.service';
import { AuthObservable } from '../../auth.observable';

@Injectable({
  providedIn: 'root'
})
export class UsersGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router,
    public authObservable: AuthObservable
  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const that = this;
    // console.log(that.authService.isRole);
    // if (that.authService.isRole === 'USER_ADMIN') {
    //   return true;
    // }
    // this.router.navigate(['not-found']);
    return true;
  }
}
