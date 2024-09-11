import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserService } from './user.service';
import { UserData } from '../modules/interface/IUserData.interface';
import { UserToken } from '../modules/interface/IUserToken.interface';
import { User } from '../modules/interface/iUser.interface';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  userChange: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  register(data: UserData) {
    return this.http.post<UserToken>('http://192.168.15.11:8080/login', {
      email: data.email,
      password: data.password
    }
    ).pipe(
      catchError(this.handleErrors),
      tap(response => {
        this.userChange.emit(response);
        // const user = this.userService.decodeUser(response);
        // console.log(response);
      }),

    );

  }


  login(data: UserData) {
    return this.http.post<UserToken>('http://192.168.15.11:8080/login', {
      email: data.email,
      password: data.password
    }).pipe(
      catchError(error => {
        return throwError(() => error);
      }),
      tap(response => {
        this.userChange.emit(response);
        // const user = this.userService.decodeUser(response);
        // const username = this.userService.returnUser(response);
        // console.log("username returned", username);
      }),

    )
  }

  handleErrors(errObject: HttpErrorResponse) {

    console.log("AUTH ->", errObject.error.status);

    return throwError(() => errObject.error);

  }


  logoutUser() {
    localStorage.removeItem('userData');
    this.userChange.next(null);
  }

}

export { UserData, User };

