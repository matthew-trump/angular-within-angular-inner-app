import { Component, OnInit } from '@angular/core';
import { WindowCommunicatorService } from '../window-communicator.service';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(private windowCommunicatorService: WindowCommunicatorService) { }

  ngOnInit() {
  }
  sendMessageToParent(value: string) {
    this.windowCommunicatorService.sendMessage(value);
  }
}
