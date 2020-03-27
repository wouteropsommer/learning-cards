import { LearningCard } from './learning-card';
import { Observable } from 'rxjs';

export class CardSet {

    constructor
    (
        private _title: string,
        private _parent: number, 
        private _cards: Observable<LearningCard>,
        private _userId: number
    ) {}

    private _id: number;
    
    get title(): string {
        return this._title;
    }
    get parent(): number {
        return this._parent;
    }
    get cards(): Observable<LearningCard> {
        return this._cards;
    }
    get userId(): number {
        return this._userId;
    }
    get id(): number {
        return this._id;
    }

    static fromJSON(json: any): CardSet {
        const cardSet = new CardSet(json.title, json.parent, json.cards.map(LearningCard.fromJSON), json.userId);
        cardSet._id = json.id;
        return cardSet;
    }

    toJSON(json: any) {
        return {
            id: this._id,
            title: this._title,
            parent: this._parent,
            cards: this._cards
        }
    }

}
