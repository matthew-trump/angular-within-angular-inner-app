import { Component } from '@angular/core';
import { WindowCommunicatorService } from "./window-communicator.service"
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-within-angular-inner-app';
  constructor(
    private router: Router,
    private windowCommuicatorService: WindowCommunicatorService) {
    this.windowCommuicatorService.state$
      .subscribe(state => {
        if (state) {
          if (typeof state.view !== 'undefined') {
            this.router.navigate([state.view])
          }
        }
      })
  }
}
