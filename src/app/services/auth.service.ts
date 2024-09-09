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
        const user = this.userService.decodeUser(response);
        console.log(response);
      }),

    );

  }

  handleErrors(errObject: HttpErrorResponse) {

    if (errObject.status === 0) {
      return throwError('Sorry! Authentication Services not Available! Try again later!!!')
    }

    return throwError(errObject.error);

  }

  login(data: UserData) {
    return this.http.post<UserToken>('http://192.168.15.11:8080/login', {
      email: data.email,
      password: data.password
    }
    ).pipe(
      catchError(this.handleErrors),
      tap(response => {
        this.userChange.emit(response);
        const user = this.userService.decodeUser(response);
        const username = this.userService.returnUser(response);
        console.log("username returned", username);
      }),

    )
  }


  logoutUser() {
    localStorage.removeItem('userData');
    this.userChange.next(null);
  }

}

export { UserData, User };

