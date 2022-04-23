import { Component } from '@angular/core';
import { User } from './models/User';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;

  constructor(private authService: AuthService) {
    try {
      this.authService.user.subscribe(x => this.currentUser = x);
    } catch (error) {

    }
  }

  logout() {
    this.authService.logout();
  }
}
