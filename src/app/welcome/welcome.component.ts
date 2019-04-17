import { Component, OnInit } from '@angular/core';
import { WindowCommunicatorService } from '../window-communicator.service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private windowCommunicatorService: WindowCommunicatorService) {

  }

  ngOnInit() {
  }

}
