import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient, private helper: JwtHelperService) {}

  // local
  // private API_URL = 'http://localhost/gcattendease-api/api';

  // webapi
  private API_URL = 'https://gc-attendease.online/gcattendease-api/api';

  getCurrentUserId(): number | null {
    const mytoken = sessionStorage.getItem('token');
    if (mytoken) {
      const decodedToken = this.helper.decodeToken(mytoken);
      if (decodedToken && decodedToken.user_id) {
        return decodedToken.user_id;
      }
    }
    return null;
  }

  addEvent(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/addevent`, data);
  }

  getAllEvents(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/events`);
  }

  deleteEvent(data: any): Observable<any> {
    return this.http.delete(`${this.API_URL}/deleteevent/${data}`);
  }

  getEventId(event_id: any): Observable<any> {
    return this.http.get(`${this.API_URL}/geteventid`, event_id);
  }

  editEvent(id: any, data: any) {
    return this.http.post(`${this.API_URL}/editevent/${id}`, data);
  }

  getUserEvent(): Observable<any> {
    const userId = this.getCurrentUserId();
    if (userId) {
      return this.http.get(`${this.API_URL}/userevents/${userId}`);
    } else {
      return throwError('User ID not found');
    }
  }

  registerForEvent(eventId: number, userId: any): Observable<any> {
    const data = { event_id: eventId, user_id: userId };
    return this.http.post(`${this.API_URL}/register`, data);
  }

  uploadEvent(event_id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.API_URL}/uploadevent/${event_id}`, formData);
  }

  getEventImage(event_id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/geteventimage/${event_id}`, {
      responseType: 'blob',
    });
  }
}
