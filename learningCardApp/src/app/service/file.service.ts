import { Injectable } from '@angular/core';
import { v4 } from 'uuid'
import { Folder } from '../overzicht-manager/model/folder'
import { BehaviorSubject, Observable } from 'rxjs';

export interface IFileService {
  // add(fileElement: Folder)
  delete(id: string)
  // update(id: string, update: Partial<Folder>)
  queryInFolder(folderId: number): Observable<Folder[]>
  get(id: string): Folder
}

@Injectable()
export class FileService implements IFileService {
  private foldersMap = new Map<string, Folder>()
  
  constructor() {
  }

//   add(fileElement: Folder) {
//     fileElement.id = v4()
//     this.foldersMap.set(fileElement.id, this.clone(fileElement))
// console.log(fileElement)
//     return fileElement
//   }

  delete(id: string) {
    this.foldersMap.delete(id)
  }

  // update(id: string, update: Partial<Folder>) {
  //   let element = this.foldersMap.get(id)
  //   element = Object.assign(element, update)
  //   this.foldersMap.set(element.id, element)
  // }

  private querySubject: BehaviorSubject<Folder[]>

  queryInFolder(folderId: number) {
    const result: Folder[] = []
    this.foldersMap.forEach(element => {
      if (element.parent === folderId) {
        result.push(this.clone(element))
      }
    })
    if (!this.querySubject) {
      this.querySubject = new BehaviorSubject(result)
    } else {
      this.querySubject.next(result)
    }
    return this.querySubject.asObservable()
  }

  get(id: string) {
    return this.foldersMap.get(id)
  }

  clone(element: Folder) {
    return JSON.parse(JSON.stringify(element))
  }
}