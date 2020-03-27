import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Folder } from '../overzicht-manager/model/folder';
import { map } from 'rxjs/internal/operators/map';
import { tap, mapTo, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  apiUrl = 'https://localhost:44387/api/folder';
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  public loadingError$ = new Subject<string>();

  public specifiekeFolderStatic: Folder;
  private folder = new Folder("aa", 0, 1);
  public folders: Folder[] = [];
  private _folders$ = new BehaviorSubject([]);
  folders$: Observable<Folder[]> = this._folders$;

  private foldersStatic: Observable<Folder[]>;

  private _foldersVoorGebruiker$ = new Observable<Folder[]>();

  constructor(private http: HttpClient) { }

  getfolders(): Observable<Boolean> {   
    return this.http.get<Folder[]>(this.apiUrl).pipe(
    tap(folds => {
      this.folders = folds;
      this._folders$.next(this.folders);
    }),
    mapTo(true)
    );
  }

  getFoldersStatic(userId: number, parent: number): Observable<Folder[]> {
    let hulp = new Observable<Folder[]>();
    console.log(`${this.apiUrl}/${userId},${parent}`);
    hulp = this.http
    .get<Folder[]>(`${this.apiUrl}/${userId},${parent}`)
    .pipe(
      map((list: any[]): Folder[] => 
    list.map(Folder.fromJSON))
    );

    hulp.forEach(f => {
      f.forEach(ff => {
        console.log(ff.name);
      })
    })
    return hulp;
  }
  // getFoldersForUser$(id: number) {
  //   this._folders = this.folders$;

  //   this._folders.forEach(fol => {
  //     fol.forEach(f => {
  //       if(f.userId == id) {
  //         console.log(f.name);
  //         this._foldersVoorGebruiker$.pipe(map(fold => {
  //           fold.push(f);
  //         }))
  //       }
  //     })
  //   })
  //   return this._foldersVoorGebruiker$;

  // }

  getFolder$(id: number): Observable<Folder> {
    return this.http
    .get(`${this.apiUrl}/${id}`)
    .pipe(map((rec: any): Folder => Folder.fromJSON(rec)));
    
  }

  getFolderStatic(id: number): Observable<Boolean> {
 
      return this.http.get<Folder[]>(this.apiUrl).pipe(
      tap(folds => {
        folds.forEach(f => {
          if(f.id == id) {
            this.specifiekeFolderStatic = f;
            console.log("gothere");
          }
        })
      }),
      mapTo(true)
      );
    
  }

  addNewFolder(folder: Folder) {
    return this.http.post(`${this.apiUrl}`, folder.toJSON());
  }

  deleteFolder(folder: Folder): Observable<Folder> {
    console.log(`${this.apiUrl}/${folder.id}`);
    return this.http.delete(`${this.apiUrl}/${folder.id}`).pipe(map(Folder.fromJSON));
  }

  updateFolder(folder: Folder) {
    console.log(folder);
    return this.http
      .put(`${this.apiUrl}/${folder.id}`, folder.toJSON())
      .pipe().subscribe();

    //return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

}
