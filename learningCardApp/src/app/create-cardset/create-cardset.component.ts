import { Component, OnInit, Output, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CardSet } from '../overzicht-manager/model/card-set';
import { LearningCard } from '../overzicht-manager/model/learning-card';
import { CardSetService } from '../service/card-set.service';
import { Observable } from 'rxjs';
import { OverzichtManagerComponent } from '../overzicht-manager/overzicht-manager.component';
import { EventEmitter } from '@angular/core';
import { Folder } from '../overzicht-manager/model/folder';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-create-cardset',
  templateUrl: './create-cardset.component.html',
  styleUrls: ['./create-cardset.component.css']
})
export class CreateCardsetComponent implements OnInit {


  @Output() refreshRequest = new EventEmitter();
  @Input() currentRoot: Folder; 

  public cardSetFromGroup: FormGroup;
  private fb: FormBuilder
  
  constructor(private _cardSetService: CardSetService, private _userService: UserService) { }
  
  

  ngOnInit() {
    this.cardSetFromGroup = new FormGroup({
      title: new FormControl(),
      term1: new FormControl(),
      def1: new FormControl(),
      term2: new FormControl(),
      def2: new FormControl(),
      term3: new FormControl(),
      def3: new FormControl(),
      term4: new FormControl(),
      def4: new FormControl(),
    })
  }

  onSubmit() {
    let cardSet: CardSet;
    let set: Observable<LearningCard>;
    let learningcard1: LearningCard;
    let learningcard2: LearningCard;
    let learningcard3: LearningCard;
    let learningcard4: LearningCard;
    console.log(this.currentRoot? this.currentRoot.id: 0)

    cardSet = new CardSet(this.cardSetFromGroup.value.title, this.currentRoot? this.currentRoot.id: 0, set, this._userService.userLoggedinId);
    console.log(cardSet.parent)

    this._cardSetService.addCardSet(cardSet).subscribe(l => {
      learningcard1 = new LearningCard(this.cardSetFromGroup.value.term1, this.cardSetFromGroup.value.def1, l.id);
      learningcard2 = new LearningCard(this.cardSetFromGroup.value.term2, this.cardSetFromGroup.value.def2, l.id);
      learningcard3 = new LearningCard(this.cardSetFromGroup.value.term3, this.cardSetFromGroup.value.def3, l.id);
      learningcard4 = new LearningCard(this.cardSetFromGroup.value.term4, this.cardSetFromGroup.value.def4, l.id);
      this._cardSetService.addLearningCard(learningcard1).subscribe();
      this._cardSetService.addLearningCard(learningcard2).subscribe();
      this._cardSetService.addLearningCard(learningcard3).subscribe();
      this._cardSetService.addLearningCard(learningcard4).subscribe();
      this.refreshRequest.emit("");

      
    });



    
    

    // learningCard1 = new LearningCard(learningcard1.front, learningcard1.back, this._cardSetService.)
    // this._cardSetService.addLearningCard(learningcard1)
    

  }

}
