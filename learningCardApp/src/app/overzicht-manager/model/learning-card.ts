export class LearningCard {
    constructor 
    (
        private _front: string,
        private _back: string,
        private _cardSetId: number
    ) {}

    private _id: string;

    static fromJSON(json: any): LearningCard {
        const learnincard = new LearningCard(json.front, json.back, json.cardSetId);
        learnincard._id = json.id;
        return learnincard;
    }

    get front(): string {
        return this._front;
    }
    get back(): string {
        return this._back;
    }
    get cardSetId() {
        return this._cardSetId;
    }
    
}
