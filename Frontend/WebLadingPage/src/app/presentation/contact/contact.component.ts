import { Component, OnInit } from '@angular/core';
import { IsFooterObsevable } from 'src/app/shared/observables/is-footer.observable';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private isFooterObsevable: IsFooterObsevable, private route: ActivatedRoute) { 

    
  }

  ngOnInit(): void {
    const that = this;
  }

}
