import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  public isLoginSubject = new Subject<boolean>();

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    let currentUser = localStorage.getItem('user');
    if (currentUser != null) {
      this.userSubject = new BehaviorSubject<User>(JSON.parse(currentUser));
      this.user = this.userSubject.asObservable();
    }
  }

  /**
   * Get current user details
   */
  public get userValue(): User {
    let currentUser = localStorage.getItem('user');
    if (currentUser != null) {
      return JSON.parse(currentUser);
    }
    return this.userSubject?.value;
  }

  login(email: string, password: string) {
    return this.http.post<User>(`${environment.apiUrl}/ejogajog/api/v1/auth/adminLogIn`, { email, password })
      .pipe(map(user => {
        // store user details and auth token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        if(this.userSubject != null)
        {
        this.userSubject.next(user);
        }
        this.isLoginSubject.next(true);
        return user;
      }));
  }

  /**
   * Get Truck Stands list from Api
   * @returns 
   */
  truckStands()
  {
    return this.http.get(`${environment.apiUrl}/ejogajogAdminAPI/api/v1/admin/master/truckstands`);
  }

  logout(){
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    // this.userSubject.next(null);
    this.isLoginSubject.next(false);
    this.router.navigate(['/login']);
  }
}
