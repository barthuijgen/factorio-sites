import * as PIXI from 'pixi.js';
import { EventEmitter } from 'eventemitter3';
interface IOptions {
    maxSize: number;
    alpha: boolean;
    scaleMode: PIXI.SCALE_MODES;
    padding: number;
    extrude: boolean;
    testBoxes: boolean;
    show: boolean;
}
export declare class DynamicSpritesheet extends EventEmitter {
    private testBoxes;
    private maxSize;
    private padding;
    private show;
    private extrude;
    private maxLoading;
    private baseTextures;
    private entries;
    private canvasesDiv;
    private packer;
    private loading;
    private nrOfBinsOnLastRepack;
    private textureToEntry;
    private rendering;
    private rerender;
    private firstRender;
    private alpha;
    private subtextures;
    private waitingQueue;
    constructor(options?: Partial<IOptions>);
    progress(tick: (loaded: number, total: number) => void): void;
    awaitSprites(): Promise<void>;
    private add;
    get(filename: string, x?: number, y?: number, width?: number, height?: number): PIXI.Texture;
    getSubtexture(mainTexture: PIXI.Texture, filename: string, x: number, y: number, width: number, height: number): PIXI.Texture;
    onAllLoaded(textures: PIXI.Texture[]): Promise<void>;
    render(): Promise<void>;
    private randomColor;
    private extrudeEntry;
}
export {};
