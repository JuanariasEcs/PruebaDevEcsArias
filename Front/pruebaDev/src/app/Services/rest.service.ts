import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { SessionStorageService } from './session-storage.service';
import { environment } from '../enviroment';
import { SessionStorageData } from '../Interface/iSessionStorage';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private baseUrl: string ;
  private pendingRequests: any[] = [];


  constructor(private http: HttpClient,private router: Router, private sessionStorageService : SessionStorageService) {
    this.baseUrl = environment.apiUrl;
  }

  private getHttpOptions(): { headers: HttpHeaders } {
    var SessionStorageDataAux = this.sessionStorageService.getSessionData()
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SessionStorageDataAux?.jwtToken}`
    });
    return { headers };
  }


  private async request(method: string, url: string, body?: any): Promise<any> {
    const request = new HttpRequest(method, `${this.baseUrl}${url}`, body, this.getHttpOptions());
  
    try {
      const response = await this.http.request(request)
        .pipe(
          catchError(error => this.handleError(error as HttpErrorResponse))
        )
        .toPromise();
  
      return response;
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        var res =  await this.handle401Error(request);
        return res
      } else {
        this.logout();
        throw error;
      }
    }
  }
  
  private async handle401Error(request: HttpRequest<any>): Promise<any> {
    this.pendingRequests.push(request);
  
    try {
      await this.refresh();
      return this.retryPendingRequests();
    } catch (refreshError) {
      this.logout();
      throw refreshError;
    }
  }
  
  private async handleError(error: HttpErrorResponse): Promise<never> {
    if (error.status === 401) {
      throw error;
    }
    return Promise.reject(error);
  }
  
  private async retryPendingRequests(): Promise<any> {
    const requests = this.pendingRequests.map(async (request) => {
      try {
        const response = await this.http.request(new HttpRequest(request.method, request.url, request.body, this.getHttpOptions()))
          .toPromise();

          return response;
      } catch (error) {
        return Promise.reject(error);
      }
    });
  
    this.pendingRequests = [];
    return Promise.all(requests);
  }
  

   logout(): void {
    this.sessionStorageService.clearSessionData();
    this.router.navigate(['/login']);
  }

  Get(url: string): Promise<any> {
    return this.request('GET', url);
  }

  Post(url: string, body: any, contentType: string = 'application/json'): Promise<any> {
    return this.request('POST', url, body);
  }

  Token(user: string, pass: string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<AuthResponse>(
      `${this.baseUrl}auth/Login`,
      { UserName: user, Password: pass },
      httpOptions
    ).toPromise()
      .then(response => {
        if (response && response.jwtToken && response.refreshToken) {
          const sessionDataUpdate: SessionStorageData = {
            jwtToken: response.jwtToken,
            refreshToken: response.refreshToken,
            role: response.role
          };
          this.sessionStorageService.setSessionData(sessionDataUpdate);
          return response;
        } else {
          return Promise.reject('Invalid response format');
        }
      })
      .catch(error => Promise.reject(error));
  }


  Register(user: string, pass: string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(
      `${this.baseUrl}auth/Register`,
      { UserName: user, Password: pass },
      httpOptions
    ).toPromise()
      .then(response => {
        console.log("Register exitoso")
      })
      .catch(error => Promise.reject(error));
  }


  private refresh(): Promise<void> {
    const httpOptions = this.getHttpOptions();
    var SessionData = this.sessionStorageService.getSessionData();
    return this.http.post<AuthResponse>(
      `${this.baseUrl}Auth/RefreshToken`,
      {JwtToken : SessionData?.jwtToken, RefreshToken :SessionData?.refreshToken},
      httpOptions
    ).toPromise()
      .then(response => {
        if (response && response.jwtToken) {
          const sessionDataUpdate: SessionStorageData = {
            jwtToken: response.jwtToken,
            refreshToken: response.refreshToken,
            role: response.role
          };
          this.sessionStorageService.setSessionData(sessionDataUpdate);
          return Promise.resolve();
        } else {
          this.logout(); 
          return Promise.reject('Invalid response format');
        }
      })
      .catch(error => {
        this.logout();
        Promise.reject(error);
      });  
    }
}



interface AuthResponse {
  jwtToken: string;
  refreshToken: string;
  role: string;

}
