export class Dictionary<T> {
    private readonly _dict: { [key: string]: T } = {};
    constructor(values: { [key: string]: T }) {
        Object.keys(values).map(k => {
            this.push(k, values[k]);
        });
    }
    get(key: string): T {
        return this._dict[key];
    }
    ofKeys<T>(keys: string[]): { [key: string]: T } {
        const res: any = {};
        this.keys.filter(k => keys.includes(k)).map(k => res[k] = this._dict[k]);
        return res;
    }
    get keys(): string[] {
        return Object.keys(this._dict);
    }
    get values(): T[] {
        return Object.values(this._dict);
    }
    toArray(): T[] {
        return Object.values(this._dict);
    }
    delete(key: string): void {
        delete (this._dict[key]);
    }

    push(key: string, value: T): void {
        if (this._dict[key] === undefined) {
            this._dict[key] = value;
        } else {
            throw new Error('key already exists');
        }
    }
    hasKey(key: string): boolean {
        return this._dict[key] !== undefined;
    }
    hasValue(value: T): boolean {
        return this.toArray().includes(value);
    }
}
