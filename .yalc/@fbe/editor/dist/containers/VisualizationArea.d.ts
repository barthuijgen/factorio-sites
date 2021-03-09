import * as PIXI from 'pixi.js';
export declare class VisualizationArea {
    static ALPHA: number;
    private readonly sprites;
    constructor(sprites: PIXI.Sprite[]);
    destroy(): void;
    show(): void;
    hide(): void;
    highlight(): void;
    moveTo(position: IPoint): void;
}
