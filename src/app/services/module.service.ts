import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Module } from '../models/module.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addModule(module: Module) {
    return this.http.post<any>(`${this.apiUrl}/module`, module);
  }

}
