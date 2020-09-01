import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IsFooterObsevable } from '../observables/is-footer.observable';
import * as $ from "jquery";

@Injectable({
  providedIn: 'root'
})
export class IsFooterGuard implements CanActivate {

  constructor(private isFooterObsevable: IsFooterObsevable){
    
  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    const that = this;  
    // console.log(state.url);
    // console.log(next.url);
    $('html, body').animate({ scrollTop: 0 }, 100);
    that.isFooterObsevable.changeIsFooter((next.url[0].path === 'contact')? false : true );

    return true;
  }
  
}
