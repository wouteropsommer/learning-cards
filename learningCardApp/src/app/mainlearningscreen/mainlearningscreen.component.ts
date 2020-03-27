import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../service/user.service';
import { HttpClient } from 'selenium-webdriver/http';
import { User } from '../overzicht-manager/model/user';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { OverzichtManagerComponent } from '../overzicht-manager/overzicht-manager.component'
import { Folder } from '../overzicht-manager/model/folder';
import { CardSet } from '../overzicht-manager/model/card-set';

@Component({
  selector: 'app-mainlearningscreen',
  templateUrl: './mainlearningscreen.component.html',
  styleUrls: ['./mainlearningscreen.component.css']
})
export class MainlearningscreenComponent implements OnInit {
  

  refresh: boolean = false;
  currentRoot: Folder;
  currentSet: CardSet;

  constructor() {

  }

  showCreateSet: boolean = false;
  showLearning: boolean = false;

  ngOnInit() {
  
  }

  click() {
    console.log(this.showCreateSet);
  }

  changebooleanShowCreateSet() {
    this.showLearning = false;
    this.showCreateSet = true;
    console.log("set to true");
  }
  
  learningCardClicked(element: CardSet) {
    this.showCreateSet = false;
    this.showLearning = true;
    this.currentSet = element;
    console.log("in mainlearningscreen currentset is now " + this.currentSet.title);

  }

  sendRequest() {
    console.log("request ontvangen nu doorsturen");
    this.refresh = !this.refresh;
  }

  currentRootchange(folder: Folder) {
    this.currentRoot = folder;
    console.log("current root verandert");
  }

}
