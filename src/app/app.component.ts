import { Component } from '@angular/core';
import { User } from './models/User';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogged: Boolean = false;

  constructor(private authService: AuthService) {
    try {
      this.authService.isLoginSubject.subscribe(x => this.isLogged = x);
    } catch (error) {

    }
    this.validateUserLogged();
  }
  

  validateUserLogged()
  {
    
    let currentUser = localStorage.getItem('user');
    if (currentUser != null) {
      this.isLogged = true;
    }
  }

  logout() {
    this.authService.logout();
  }
}
