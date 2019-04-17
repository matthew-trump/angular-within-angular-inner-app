import { Injectable } from '@angular/core';
import { WindowRefService } from './window-ref.service';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowCommunicatorService {

  public windowCommunicator: any;
  public state$: BehaviorSubject<any> = new BehaviorSubject(null);


  constructor(private windowRefService: WindowRefService,
    private router: Router) {
    console.log("WINDOW COMMUNICATOR SERVICE");
    const window = this.windowRefService.nativeWindow;
    this.windowCommunicator = window.windowCommunicator;

    window.windowCommunicatorCallbacks = {
      update: this.updateCallback()
    };

    try {
      console.log("CALLING ONLOAD");
      window.windowCommunicator.onLoad(1, 'windowCommunicatorCallbacks');
    } catch (error) {
      console.error(`Error initializing scene: ${error}`);
    }
  }
  sendMessage(message: string) {
    const window = this.windowRefService.nativeWindow;
    window.windowCommunicator.sendMessage(message)
  }

  updateCallback() {
    console.log("WINDOW COMMUNICATOR UPDATE CALLBACK")
    const c = this;
    return function (requestId, newState) {
      if (newState) {
        console.log("INNER APP NEW STATE", newState);
        c.state$.next(newState);
      }
      c.windowCommunicator.onUpdateDone(requestId);
    }
  }


}
