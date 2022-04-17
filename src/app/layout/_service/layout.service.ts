import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  API_LIST
} from "../_const/layout.const";
import { DefaultResponse } from "../../_model/general.model";

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor(private http: HttpClient) { }

  getUserListService(page: number) {
    return this.http.get<any>(`${API_LIST}/user?page=${page}&limit=10`,
      {
        headers: new HttpHeaders().append('app-id', '625aa3fd22bcc91ac6e0a7df'),
      })
  }

  deleteUserListService(id: string) {
    return this.http.delete<any>(`${API_LIST}/user/${id}`,
      {
        headers: new HttpHeaders().append('app-id', '625aa3fd22bcc91ac6e0a7df'),
      })
  }

  getDetailUserService(id: string) {
    return this.http.get<any>(`${API_LIST}/user/${id}`,
      {
        headers: new HttpHeaders().append('app-id', '625aa3fd22bcc91ac6e0a7df'),
      })
  }
}