import { EventEmitter } from 'eventemitter3';
export declare class Tile extends EventEmitter {
    private readonly _name;
    private readonly _x;
    private readonly _y;
    constructor(name: string, x: number, y: number);
    static getItemName(name: string): string;
    get name(): string;
    get x(): number;
    get y(): number;
    get hash(): string;
    destroy(): void;
}
