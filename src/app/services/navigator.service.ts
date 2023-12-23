import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigatorService {

  constructor(private route: ActivatedRoute, private router: Router) { }

  navigateTo(path: string, params?: Record<string, any>): void {
    this.router.navigate([path, ...(params ? Object.values(params) : [])]);
  }

  navigateToWithQuery(route: string, queryParam: string): void {
    this.router.navigate([route], { queryParams: { query: queryParam } });
  }

  getRouteParams(): Observable<Record<string, any>> {
    return this.route.params;
  }
  getRouteQueryParams(): Observable<Record<string, any>> {
    return this.route.queryParams;
  }

  getRouter() {
    return this.router;
  }

}

