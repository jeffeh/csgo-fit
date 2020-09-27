import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // This is the ugliest code I've ever written. I only did it because I needed a way to prevent the Faceit service
  // from calling the API when the component is loaded. This is the best way I could think of without modifying the Faceit
  // service file. If you think of a better one, let me know 🤣🤣🤣

  username: string;
  refreshStats: boolean;
  constructor() { }

  ngOnInit(): void {
    this.username = '';
    this.refreshStats = false;
  }

  onSubmit(user: string): void {
    this.username = user;
    this.refreshStats = true;
  }

}
