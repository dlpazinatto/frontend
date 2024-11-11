import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService { private token: string | null = null;
  private loginUrl = `${environment.apiUrl}/auth/login`;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable< {access_token: string} | {message: string}> {
    let login = {
      email: username,
      password: password
    }
    return this.http.post<{access_token: string} | {message: string}>(this.loginUrl, login)
      .pipe(
        tap(response => {
          if ('access_token' in response) {
            this.token = response.access_token;
            localStorage.setItem('token', this.token);
          }
        })
      );
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    try {
      const payload = this.decodeJwt(token);
      const expiration = payload.exp;
      const currentTime = Math.floor(Date.now() / 1000);
      return expiration > currentTime;
    
    } catch (error) {
      return false; 
    }
  }

  private decodeJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

}
