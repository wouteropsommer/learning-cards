import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CardSet } from '../overzicht-manager/model/card-set';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, mapTo, map } from 'rxjs/operators';
import { LearningCard } from '../overzicht-manager/model/learning-card';

@Injectable({
  providedIn: 'root'
})
export class CardSetService {

  apiUrl = 'https://localhost:44387/api/cardsets'; 
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');

  public lastCardSet: CardSet;
  private cardSets: CardSet[] = [];
  private _cardSets$ = new BehaviorSubject([]);
  cardSets$: Observable<CardSet[]> = this._cardSets$;

  public learningCards: LearningCard[] = [];
  private _learningCards$ = new BehaviorSubject([]);

  constructor(private http: HttpClient) { }


  getCardSets(userId: number, parent: number): Observable<boolean> {
    return this.http.get<CardSet[]>(`${this.apiUrl}/${userId},${parent}`).pipe(
      tap(runs => {
        this.cardSets = runs;
        this._cardSets$.next(this.cardSets);
      }),
      mapTo(true)
    );
  }

  getFoldersStatic(userId: number, parent: number): Observable<CardSet[]> {
    let hulp = new Observable<CardSet[]>();
    console.log(`${this.apiUrl}/${userId},${parent}`);
    hulp = this.http
    .get<CardSet[]>(`${this.apiUrl}/${userId},${parent}`)
    .pipe(
      map((list: any[]): CardSet[] => 
    list.map(CardSet.fromJSON))
    );
    return hulp;
    }

    addCardSet(cardSet: CardSet): Observable<CardSet> {
      const body = {
        title: cardSet.title,
        parent: cardSet.parent,
        set: cardSet.cards,
        userId: cardSet.userId,
      };
      return this.http.post<CardSet>(this.apiUrl, body).pipe(tap(r => {
        this.cardSets.push(r);
        this.lastCardSet = r;
        this._cardSets$.next(this.cardSets);
      }));
    }

    addLearningCard(learningCard: LearningCard): Observable<LearningCard> {
      const body = {
        front: learningCard.front,
        back: learningCard.back,
        cardSetId: learningCard.cardSetId,
      };
      return this.http.post<LearningCard>("https://localhost:44387/api/learningcards", body).pipe(tap(r => {
        this.learningCards.push(r);
        this._learningCards$.next(this.learningCards);
      }));
    }

    getLearningCardsForSpecificSet(cardSetId: number): Observable<boolean> {
      return this.http.get<LearningCard[]>(`https://localhost:44387/api/learningcards/${cardSetId}`).pipe(
        tap(runs => {
          this.learningCards = runs;
          this._learningCards$.next(this.cardSets);
          console.log(this._learningCards$)
        }),
        mapTo(true)
      );
    }

}
