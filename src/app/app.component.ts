import { Component } from '@angular/core';
import { SessionDataManagerService } from './shared/session-data-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private sessionDataManagerService: SessionDataManagerService) {
  }
}
