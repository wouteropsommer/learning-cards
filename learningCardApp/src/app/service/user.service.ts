import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable, of, Subject } from 'rxjs';
import { User } from '../overzicht-manager/model/user';
import { map, catchError, tap, mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  userLoggedinId: number;

  apiUrl = 'https://localhost:44387/api/users';
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  public loadingError$ = new Subject<string>();

  constructor(private http: HttpClient) { }

  get users(): Observable<User[]> {   
    return this.http
    .get(this.apiUrl)
    .pipe(map((list: any[]): User[] => list.map(User.fromJSON)));
  }

  getUser(id: string): Observable<User> {
    const theUrl = `${this.apiUrl}/${id}`;
    return this.http.get(theUrl).pipe(map(User.fromJSON));
  }

  addNewUser(user: User) {
    return this.http.post(`${this.apiUrl}`, user.toJSON());
  }

  deleteUser(user: User): Observable<User> {
    return this.http
      .delete(`${this.apiUrl}${user.id}`)
      .pipe(map(User.fromJSON));
  }

  updateUser(user: User) {
    console.log("got here");
    console.log(user);
    return this.http
      .put(`${this.apiUrl}/${user.id}`, user.toJSON())
      .pipe().subscribe();

    //return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  setUserLoggedinId(id: string) {
    console.log("setting the userid");
      return this.http.get<User>(`https://localhost:44387/api/users/${id}`).pipe(
        tap(runs => {
          this.userLoggedinId = runs.id;
          console.log(this.userLoggedinId);
        }),
        mapTo(true)
      );
    
  }

 

  getEmail(): string {
    console.log(JSON.parse(localStorage.getItem('currentUser')).getEmail());
    return JSON.parse(localStorage.getItem('currentUser')).getEmail();
  }
  

}
