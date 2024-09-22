import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthModel } from 'src/app/shared/models/auth/auth.model';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { environment } from 'src/environments/environment';
import { UserModel } from 'src/app/shared/models/users/user.model';
import { EndPointConstants } from '../../constants/end-point-constants';

const API_AUTH_URL = `${environment.apiUrl}/auth`;

@Injectable({
  providedIn: 'root',
})
export class AuthService{
  constructor(private http: HttpClient) {
  }

  // public methods
  login(userName: string, password: string): Observable<any> {
    return this.http.post<AuthModel>(`${API_AUTH_URL}/${EndPointConstants.Auth.Login}`, {
      userName,
      password,
    });
  }

  register(obj: UserModel) {
    return this.http.post<BaseResponse<UserModel>>(`${API_AUTH_URL}/${EndPointConstants.Auth.Register}`, obj);
  }

  // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
  forgotPassword(email: string): Observable<BaseResponse<boolean>> {
    return this.http.post<BaseResponse<boolean>>(`${API_AUTH_URL}/forgot-password`, {
      email,
    });
  }

  getUserByToken(token: string): Observable<BaseResponse<UserModel>> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<BaseResponse<UserModel>>(`${API_AUTH_URL}/user`, {
      headers: httpHeaders,
    });
  }
}
