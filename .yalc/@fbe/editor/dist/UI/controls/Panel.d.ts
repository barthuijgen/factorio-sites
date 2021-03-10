import * as PIXI from 'pixi.js';
export declare abstract class Panel extends PIXI.Container {
    private readonly m_Background;
    private _setPosition;
    constructor(width: number, height: number, background?: number, alpha?: number, border?: number);
    destroy(): void;
    get width(): number;
    get height(): number;
    protected abstract setPosition(): void;
}
