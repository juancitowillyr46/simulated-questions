import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/maintainers/users/users.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  public userData = null;

  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) { }

  ngOnInit() {

    const that = this;
    if(
      typeof localStorage.getItem("user") !== 'undefined' && 
      localStorage.getItem("user") != null
    ){
      that.userData = JSON.parse(localStorage.getItem('user'));
    }

  }

  logout() {
    const that = this;
    that.authService.SignOut();
  }

}
