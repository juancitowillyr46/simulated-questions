import { Component, OnInit } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.css']
})
export class SuccessMessageComponent implements OnInit {

  constructor() {
    library.add(faCheckCircle, faSignOutAlt);
  }

  ngOnInit() {
  }

}
