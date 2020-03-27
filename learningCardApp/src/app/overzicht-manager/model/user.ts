import { CardSet } from './card-set';
import { Folder } from './folder';
import { Observable } from 'rxjs/internal/Observable';

export class User {

    private _id: number;

    constructor(
        private _cardSets: Array<CardSet>,
        private _folders: Array<Folder>
    ) {}

    static fromJSON(json: any): User {
        const user = new User(
            json.cardSets.map(CardSet.fromJSON),
            json.folders.map(Folder.fromJSON),
        )
        user._id = json.id;
        return user;
    }

    toJSON(): any {
        return {
            id: this._id,
            cardSets: this.cardSets.map(set => set.toJSON),
            folders: this.folders.map(folder => folder.toJSON)
        }
    }




    get id(): number {
        return this._id;
      }
    get folders(): Array<Folder> {
        return this._folders;
    }
    get cardSets(): Array<CardSet> {
        return this._cardSets;
    }

    set folders(folders: Array<Folder>) {
        this._folders = folders;
    }

}
