import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CardSet } from '../overzicht-manager/model/card-set';
import { CardSetService } from '../service/card-set.service';
import { LearningCard } from '../overzicht-manager/model/learning-card';
import Speech from 'speak-tts'

@Component({
  selector: 'app-learning-card',
  templateUrl: './learning-card.component.html',
  styleUrls: ['./learning-card.component.css']
})
export class LearningCardComponent implements OnInit, OnChanges {

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    console.log(this.currentSet);
    this._cardsetService.getLearningCardsForSpecificSet(this.currentSet.id).subscribe(data => {
      this.setLearningCards(data);
    });
    
  }
  public speech = new Speech();

  lijstLearningcards: LearningCard[];
  innerHTMLFront: string = "Click on the card to see the definition!";
  innerHTMLBack: string = "Yay! Use arrows to shuffle through your cards!";

  isFlipped: boolean = false;
  isNotAnimating: boolean = false;
  isFadeOut: boolean = false;
  teller: number = 0;

  @Input() currentSet: CardSet;

  constructor(private _cardsetService: CardSetService) { }

  ngOnInit() {

  }


  toggleFlip(): void {
    this.isFlipped = !this.isFlipped;
  }

  nextCard() {
    this.isNotAnimating = true;
    this.isFadeOut = true;
    this.isFlipped = false;

    if(this.teller < this.lijstLearningcards.length) {
      this.innerHTMLFront = this.lijstLearningcards[this.teller].front;
      this.innerHTMLBack = this.lijstLearningcards[this.teller].back;
      this.teller++;
    } else {
      this.innerHTMLFront = this.lijstLearningcards[0].front;
      this.innerHTMLBack = this.lijstLearningcards[0].back;
      this.teller = 1;
    }

    
    console.log(this.innerHTMLBack + this.innerHTMLFront)

    console.log(this.teller);
    setTimeout(() => { this.isNotAnimating = false; this.isFadeOut = false; }, 50);

  }

  previousCard() {
    // First, set the front of the card to be viewed.
    this.isNotAnimating = true;
    this.isFadeOut = true;
    this.isFlipped = false;

    
    if (this.teller > 1) {
      this.innerHTMLFront = this.lijstLearningcards[this.teller - 2].front;
      this.innerHTMLBack = this.lijstLearningcards[this.teller - 2].back;
      this.teller = this.teller - 1;
      console.log(this.teller)
    } else {
      this.innerHTMLFront = this.lijstLearningcards[this.lijstLearningcards.length - 1].front;
      this.innerHTMLBack = this.lijstLearningcards[this.lijstLearningcards.length - 1].back;
      this.teller = 4
    }
    
      setTimeout(() => { this.isNotAnimating = false; this.isFadeOut = false; }, 50);

    console.log(this.innerHTMLBack + this.innerHTMLFront)
  }

  setLearningCards(dataIsSet: boolean) {
    this.lijstLearningcards = this._cardsetService.learningCards;
    console.log(this.lijstLearningcards[0])
  }

  speak() {
    if(this.isFlipped) {
      this.speech.speak({
      text: this.innerHTMLBack
    })
    } else {
      this.speech.speak({
        text: this.innerHTMLFront
      })
    }
    
  }

}
