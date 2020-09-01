import { Component, OnInit, OnChanges } from '@angular/core';
import { IsFooterObsevable } from './shared/observables/is-footer.observable';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web-landing-page';
}
