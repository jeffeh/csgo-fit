import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CS:GO FaceIt Tracker';

  todos: string[] = [
    'Generate different components such as navbar, stats page, etc.',
    'Connect to Faceit API',
    'Later: connect to backend'
  ];
}
