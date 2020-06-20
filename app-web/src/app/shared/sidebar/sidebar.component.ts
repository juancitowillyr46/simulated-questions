import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isMenu = true;

  constructor() { }

  ngOnInit() {

    const that = this;
    if(typeof localStorage.getItem("questions") !== 'undefined' && localStorage.getItem("questions") != null){
      this.isMenu = false;
    } else {
      this.isMenu = true;
    }

  }



}
