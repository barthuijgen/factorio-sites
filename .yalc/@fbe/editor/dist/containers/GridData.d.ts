import { EventEmitter } from 'eventemitter3';
import { BlueprintContainer } from './BlueprintContainer';
export declare class GridData extends EventEmitter {
    private readonly bpc;
    private _x;
    private _y;
    private _x16;
    private _y16;
    private _x32;
    private _y32;
    private lastMousePosX;
    private lastMousePosY;
    constructor(bpc: BlueprintContainer);
    get x(): number;
    get y(): number;
    get x16(): number;
    get y16(): number;
    get x32(): number;
    get y32(): number;
    destroy(): void;
    recalculate(): void;
    private update;
}
