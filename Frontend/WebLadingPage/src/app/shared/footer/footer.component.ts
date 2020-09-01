import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IsFooterObsevable } from '../observables/is-footer.observable';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  public isShowFooter = true;

  constructor(private router: Router, private route: ActivatedRoute, private isFooterObsevable: IsFooterObsevable) { 
    const that = this;
    

  }

  ngOnInit(): void {
    const that = this;
    console.log(that.router.navigateByUrl);
    that.isFooterObsevable.currentIsFooterData.subscribe( res => {
      console.log(res);
      that.isShowFooter = res;
    });

    // this.route.url.subscribe( res => {
    //   console.log(res);
    //   let url = window.location.href;
    //   if(url.indexOf("contact") > 0) {
    //     that.isShowFooter = false;
    //   }else {
    //     that.isShowFooter = true;
    //   }
    // });
  }

}
