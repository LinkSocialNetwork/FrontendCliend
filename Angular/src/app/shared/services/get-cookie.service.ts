import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetCookieService {

  constructor() { }

   getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  
}
