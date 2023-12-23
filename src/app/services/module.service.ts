import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Module } from '../models/module.model';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private apiUrl = 'api/modules';

  constructor(private http: HttpClient) { }

  addModule(module: Module): Observable<Module> {
    return this.http.post<Module>(this.apiUrl, module);
  }

}
