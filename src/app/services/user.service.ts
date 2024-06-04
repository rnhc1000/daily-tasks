import { Injectable } from '@angular/core';
import { decode } from 'jwt-js-decode';
import { UserToken } from '../modules/interface/IUserToken.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  decodeUser(token: UserToken) {
    try {

      const decoded = decode(token.accessToken);
      const expirationTime: number  = decoded.payload['exp'] * 1000;
      console.log("token",decoded);
      console.log("calculated", expirationTime);
      console.log("getTime", new Date().getTime());
      if (new Date().getTime() > expirationTime) {
        return null;
      }

      return decoded;

    } catch {

      return null;

    }
  }
}
