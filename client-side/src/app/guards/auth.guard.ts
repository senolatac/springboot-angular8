import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../services/user.service';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  currentUser: User;
  constructor(private router: Router, private userService: UserService){
    this.userService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.currentUser){
      if(route.data.roles && route.data.roles.indexOf(this.currentUser.role) === -1){
        this.router.navigate(['/401']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
