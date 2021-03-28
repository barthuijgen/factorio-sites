import * as PIXI from 'pixi.js';
export declare class Viewport {
    private size;
    private viewPortSize;
    private anchor;
    private maxZoom;
    private dirty;
    private positionX;
    private positionY;
    private scaleX;
    private scaleY;
    private scaleCenterX;
    private scaleCenterY;
    private origTransform;
    private transform;
    constructor(size: IPoint, viewPortSize: IPoint, anchor: IPoint, maxZoom: number);
    private _updateMatrix;
    centerViewPort(focusObjectSize: IPoint, offset: IPoint): void;
    update(): boolean;
    getTransform(): PIXI.Matrix;
    setSize(x: number, y: number): void;
    setPosition(posX: number, posY: number): void;
    zoomBy(deltaX: number, deltaY?: number): void;
    translateBy(deltaX: number, deltaY: number): void;
    setCurrentScale(newScale: number): void;
    getCurrentScale(): number;
    setScaleCenter(posX: number, posY: number): void;
}
