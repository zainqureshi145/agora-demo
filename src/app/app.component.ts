import { Component } from '@angular/core';
import { AgoraService } from './agora.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private agoraService: AgoraService) { }
  
}
