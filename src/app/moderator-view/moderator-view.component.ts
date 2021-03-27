import { Component, OnInit } from '@angular/core';
import { AgoraService } from '../agora.service';

@Component({
  selector: 'app-moderator-view',
  templateUrl: './moderator-view.component.html',
  styleUrls: ['./moderator-view.component.css']
})
export class ModeratorViewComponent implements OnInit {

  //Dependency Injection AgoraService
  constructor(private agoraService: AgoraService) { }

  ngOnInit(): void {
  }

  onStartCallHandler() {
    console.log("Starting a Video Call...");
    this.agoraService.startCall();
  }

  onLeaveCallHandler() {
    console.log("Leaving the call..");
    this.agoraService.endCall();
  }

}
