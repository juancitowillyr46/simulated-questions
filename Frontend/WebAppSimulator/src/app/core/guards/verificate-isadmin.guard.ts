import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/login/login.service';


@Injectable({
  providedIn: 'root'
})
export class VericateIsAdmin implements CanActivate {
  constructor(
    private loginService: LoginService,
    public router: Router
  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const that = this;
    const role = that.loginService.getAttrSession('role');
    if(role == 'USER_ADMIN') {
      return true;
    }
    that.router.navigate(['not-found']);
  }
}
