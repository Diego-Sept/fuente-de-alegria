import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './interface/user.interface';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor( private _httpClient: HttpClient ) {}

    getUsers(): Observable<User[]>{
        return this._httpClient.get<User[]>('http://localhost:3000/users/');
    }

    getUserId(id: string): Observable<User>{
        return this._httpClient.get<User>(`http://localhost:3000/users/${id}`);
    }


}