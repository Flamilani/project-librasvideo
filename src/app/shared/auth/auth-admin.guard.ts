import { AuthAdminService } from './../services/auth-admin.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  constructor(private authAdminService: AuthAdminService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authAdminService.userData.pipe(
        take(1),
        map((user: any) => user && user.roles.admin ? true : false),
        tap(isAdmin => {
          if (!isAdmin) {
            console.error('Access denied - Admins only')
            this.router.navigate(["/admin/login"]);
          }
        })
      );
  }

}
