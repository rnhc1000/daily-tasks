import { Injectable } from '@angular/core';
import { decode, JwtDecode } from 'jwt-js-decode';
import { UserToken } from '../modules/interface/IUserToken.interface';
import { User } from '../modules/interface/iUser.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  decodeUser(token: UserToken) {

    try {

      const decoded = decode(token.accessToken);
      const expirationTime: number = decoded.payload['exp'] * 1000;
      console.log("token", decoded);
      console.log("calculated", expirationTime);
      console.log("getTime", new Date().getTime());

      if (new Date().getTime() > expirationTime) {
        return null;
      }

      this.storeUser(decoded, token);

      return decoded;

    } catch {

      return null;

    }

    
  }

  private storeUser(decoded: JwtDecode, token: UserToken) {
    localStorage.setItem('userData', JSON.stringify(
      {
        email: decoded.payload['email'],
        exp: decoded.payload['exp'],
        iat: decoded.payload['iat'],
        sub: decoded.payload['sub'],
        token: token.accessToken,
      })
    );
  }

  returnUser(token: UserToken) {

    const decoded = decode(token.accessToken);
    const userName = decoded.payload['email'];
    console.log("email", userName);

    return userName;

  }
}
