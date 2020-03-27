export class Folder {
    constructor(
        private _name: string,
        private _parent: number,
        private _userId: number
        ) {}

    private _id: number;

    static fromJSON(json: any): Folder {
        const folder = new Folder(json.name, json.parent, json.userId)
        folder._id = json.id;
        return folder;
    }

    toJSON(): any {
        return {
            id: this._id,
            name: this._name,
            parent: this._parent,
            userId: this._userId
        }
    }

    get id(): number {
        return this._id;
    }
    get name(): string {
        return this._name;
    }
    get parent(): number {
        return this._parent;
    }
    get userId(): number {
        return this._userId;
    }
    set parent(parent: number) {
        this._parent = parent;
    }
    set name(name: string) {
        this._name = name;
    }

}
