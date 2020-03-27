import { Component } from '@angular/core';
import { Folder } from './overzicht-manager/model/folder';
import { Observable } from 'rxjs';
import { FileService } from './service/file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public folders: Observable<Folder[]>;

  constructor(public fileService: FileService) {}

  currentRoot: Folder;
  currentPath: string;
  canNavigateUp = false;

  ngOnInit() {
    
    // const folderA = this.fileService.add({ name: 'Duits', parent: 'root' });
    // this.fileService.add({ name: 'Engels', parent: 'root' });
    // this.fileService.add({ name: 'Hoofdstuk 1', parent: folderA.id });
    // this.fileService.add({ name: 'Frans', parent: 'root' });
    // this.fileService.add({ name: 'Portugees', parent: 'root' });
    
    // this.updateFileElementQuery();
  }

  // addFolder(folder: { name: string }) {
  //   this.fileService.add({ name: folder.name, parent: this.currentRoot ? this.currentRoot.id : 'root' });
  //   this.updateFileElementQuery();
  // }
  
  // removeElement(element: Folder) {
  //   this.fileService.delete(element.id);
  //   this.updateFileElementQuery();
  // }
  
  // moveElement(event: { element: Folder; moveTo: Folder }) {
  //   this.fileService.update(event.element.id, { parent: event.moveTo.id });
  //   this.updateFileElementQuery();
  // }

  // moveElementUp(element: Folder) {
  //   this.fileService.update(element.id, {parent: 'root'});
  //   this.updateFileElementQuery();

  // }
  
  // renameElement(element: Folder) {
  //   this.fileService.update(element.id, { name: element.name });
  //   this.updateFileElementQuery();
  // }

  // updateFileElementQuery() {
  //   this.folders = this.fileService.queryInFolder(this.currentRoot ? this.currentRoot.id : 'root');
  // }

  // navigateUp() {
  //   if (this.currentRoot && this.currentRoot.parent === 'root') {
  //     this.currentRoot = null;
  //     this.canNavigateUp = false;
  //     this.updateFileElementQuery();
  //   } else {
  //     this.currentRoot = this.fileService.get(this.currentRoot.parent);
  //     this.updateFileElementQuery();
  //   }
  //   this.currentPath = this.popFromPath(this.currentPath);
  // }
  
  // navigateToFolder(element: Folder) {
  //   this.currentRoot = element;
  //   this.updateFileElementQuery();
  //   this.currentPath = this.pushToPath(this.currentPath, element.name);
  //   this.canNavigateUp = true;
  // }

  pushToPath(path: string, folderName: string) {
    let p = path ? path : '';
    p += `${folderName}/`;
    return p;
  }
  
  popFromPath(path: string) {
    let p = path ? path : '';
    let split = p.split('/');
    split.splice(split.length - 2, 1);
    p = split.join('/');
    return p;
  }

}
