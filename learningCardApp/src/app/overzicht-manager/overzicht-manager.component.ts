import { Component, OnInit, Output, Input, EventEmitter, OnChanges } from '@angular/core';
import { Folder } from './model/folder'
import { Observable, BehaviorSubject, combineLatest, ObjectUnsubscribedError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../service/user.service';
import { User } from './model/user';
import { FolderService } from '../service/folder-service';
import { NewMapDialogComponent } from './modals/new-map-dialog/new-map-dialog.component';
import { RenameMapDialogComponent } from './modals/rename-map-dialog/rename-map-dialog.component';
import { MatMenuTrigger } from '@angular/material/menu/typings/menu-trigger';
import { CardSet } from './model/card-set';
import { CardSetService } from '../service/card-set.service';
import { MainlearningscreenComponent } from '../mainlearningscreen/mainlearningscreen.component'
import { AuthenticationService } from '../user/authentication.service';


@Component({
  selector: 'app-overzicht-manager',
  templateUrl: './overzicht-manager.component.html',
  styleUrls: ['./overzicht-manager.component.css']
})
export class OverzichtManagerComponent implements OnInit, OnChanges {

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    console.log("changes detected");
    this._userLoggedInId = this._userService.userLoggedinId;
    this.updateFileElementQuery();
  }

  public _specifiekeFolder: Observable<Folder>;

  public _user: User;
  public _userLoggedInId: number;

  lijstFolders$: Observable<Folder[]>;
  lijstFoldersStatic: Observable<Folder[]>;

  lijstCardSets$: Observable<CardSet[]>;
  lijstCardSetsStatic: Observable<CardSet[]>;

  constructor(private _authenticationService: AuthenticationService ,public dialog: MatDialog, private _userService: UserService, private _folderService: FolderService, private _cardsetService: CardSetService) {}

  @Output() showCreateSet = new EventEmitter();
  @Output() learnCardSetClicked = new EventEmitter<CardSet>();
  @Output() currentRootChanged = new EventEmitter<Folder>()
  @Input() refreshQuerry: boolean;

  public currentrootNowNormal: Folder;
  currentRoot: Folder;
  currentPath: string;
  canNavigateUp = false;
  public errorMsg: string;
  currentSet: CardSet;

  //METHODS

  ngOnInit() {

    console.log(this._userService.userLoggedinId + "this is the logged in user id");

          this._userService.setUserLoggedinId(this._authenticationService.user$.value).subscribe(data => {
        this.setStandaard(data);
      })
  }

  setStandaard(data: any) {
    this._userLoggedInId = this._userService.userLoggedinId;
    //FOLDERS
    this.lijstFoldersStatic = this._folderService.getFoldersStatic(this._userLoggedInId, this.currentRoot ? this.currentRoot.id : 0);
    this._folderService.specifiekeFolderStatic = new Folder("", 0, this._userLoggedInId);

    //CARDSETS
    this.lijstCardSetsStatic = this._cardsetService.getFoldersStatic(this._userLoggedInId, 0);
    
  }

  addFolder(name: string) {
    let parenthulp = this.currentRoot ? this.currentRoot.id : 0;
    let hulpfolder = new Folder(name, parenthulp, this._userLoggedInId);
    this._folderService.addNewFolder(hulpfolder).subscribe();
    this.updateFileElementQuery();
  }

  deleteElement(element: Folder) {
    this._folderService.deleteFolder(element).subscribe( data => {
      this.updateFileElementQuery();
    });
    
  }

  navigate(element: Folder) {
    
    //this.navigatedDown.emit(element);
    this.currentRoot = element;
    console.log(`de currentroot isnu ${this.currentRoot.id}`);
    console.log(`de parent isnu ${this.currentRoot.parent}`);
    // this.updateFileElementQuery();
    this.currentPath = this.pushToPath(this.currentPath, element.name);
    this.canNavigateUp = true;
    this.updateFileElementQuery();
    this.currentRootChanged.emit(this.currentRoot);
  }

  navigateUp() {
    // this.navigatedUp.emit();
    if (this.currentRoot && this.currentRoot.parent === 0) {
      this.currentRoot = null;
      this.canNavigateUp = false;
      // this.updateFileElementQuery();
    } else {
      // this.currentRoot = this.fileService.get(this.currentRoot.parent);
      // this.updateFileElementQuery();
      this.getSpecifiekeFolder(this.currentRoot.parent);
      this.currentRoot = this._folderService.specifiekeFolderStatic;
      //update!
    }
    this.currentPath = this.popFromPath(this.currentPath);
    this.updateFileElementQuery();
    this.currentRootChanged.emit(this.currentRoot);
  }

  moveElement(element: Folder, moveTo: Folder) {
    // this.elementMoved.emit({ element: element, moveTo: moveTo });
    // this.fileService.update(element.id, { parent: moveTo.id });
    // this.updateFileElementQuery();
    element.parent = moveTo.id;
    this._folderService.updateFolder(element);
    this.updateFileElementQuery();
  }

  moveElementUp(element: Folder) {
    // this.elementMovedUp.emit(element);
    // this.fileService.update(element.id, {parent: 'root'});
    // this.updateFileElementQuery();
    element.parent = 0;
    this._folderService.updateFolder(element);
    this.updateFileElementQuery();
  }

  openNewFolderDialog() {
    let dialogRef = this.dialog.open(NewMapDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.addFolder(res);
        this.updateFileElementQuery();
      }
    });
  }

  openRenameDialog(element: Folder) {
    let dialogRef = this.dialog.open(RenameMapDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        element.name = res;
        this._folderService.updateFolder(element);
        this.updateFileElementQuery();
      }
    });
  }

  openMenu(event: MouseEvent, viewChild: MatMenuTrigger) {
    event.preventDefault();
    console.log(viewChild);
    viewChild.openMenu();
  }

  updateFileElementQuery() {
    // this.lijstFoldersStatic = this.lijstFolders$;
    console.log(this.currentRoot ? this.currentRoot.id : 0);
    this.lijstFoldersStatic = this._folderService.getFoldersStatic(this._userLoggedInId, this.currentRoot ? this.currentRoot.id : 0);
    this.lijstCardSetsStatic = this._cardsetService.getFoldersStatic(this._userLoggedInId, this.currentRoot ? this.currentRoot.id : 0);

  }

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


  getSpecifiekeFolder(id: number) {
  this._folderService.getFolderStatic(id).subscribe();
  }


  createSet() {
    this.showCreateSet.emit();
    console.log("got here");
  }

  clickOnLearningCardSet(element: CardSet) {
    this.learnCardSetClicked.emit(element);
  }


}
