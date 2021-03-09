import * as PIXI from 'pixi.js';
import { Entity } from '../core/Entity';
import { Blueprint } from '../core/Blueprint';
import { EntitySprite } from './EntitySprite';
import { WiresContainer } from './WiresContainer';
import { UnderlayContainer } from './UnderlayContainer';
import { EntityContainer } from './EntityContainer';
import { OverlayContainer } from './OverlayContainer';
import { PaintContainer } from './PaintContainer';
import { GridData } from './GridData';
export declare type GridPattern = 'checker' | 'grid';
export declare enum EditorMode {
    NONE = 0,
    EDIT = 1,
    PAINT = 2,
    PAN = 3,
    COPY = 4,
    DELETE = 5
}
export declare class BlueprintContainer extends PIXI.Container {
    private readonly chunks;
    private readonly chunkOffset;
    private readonly size;
    private readonly anchor;
    private readonly viewport;
    private _moveSpeed;
    private _gridColor;
    private _gridPattern;
    private _mode;
    readonly bp: Blueprint;
    readonly gridData: GridData;
    private grid;
    private readonly chunkGrid;
    private readonly tileSprites;
    private readonly tilePaintSlot;
    readonly underlayContainer: UnderlayContainer;
    private readonly entitySprites;
    readonly wiresContainer: WiresContainer;
    readonly overlayContainer: OverlayContainer;
    private readonly entityPaintSlot;
    hoverContainer: EntityContainer;
    paintContainer: PaintContainer;
    private _entityForCopyData;
    private copyModeEntities;
    private deleteModeEntities;
    private copyModeUpdateFn;
    private deleteModeUpdateFn;
    viewportCulling: boolean;
    readonly interactive = true;
    readonly interactiveChildren = false;
    readonly hitArea: PIXI.Rectangle;
    constructor(bp: Blueprint);
    get entityForCopyData(): Entity;
    copyEntitySettings(): void;
    pasteEntitySettings(): void;
    getViewportScale(): number;
    toWorld(x: number, y: number): [number, number];
    render(renderer: PIXI.Renderer): void;
    get mode(): EditorMode;
    private setMode;
    enterCopyMode(): void;
    exitCopyMode(cancel?: boolean): void;
    enterDeleteMode(): void;
    exitDeleteMode(cancel?: boolean): void;
    enterPanMode(): void;
    exitPanMode(): void;
    zoom(zoomIn?: boolean): void;
    private get isPointerInside();
    private updateHoverContainer;
    get moveSpeed(): number;
    set moveSpeed(speed: number);
    get gridColor(): number;
    set gridColor(color: number);
    get gridPattern(): GridPattern;
    set gridPattern(pattern: GridPattern);
    private generateGrid;
    private generateChunkGrid;
    initBP(): void;
    destroy(): void;
    addEntitySprites(entitySprites: EntitySprite[], sort?: boolean): void;
    addTileSprites(tileSprites: EntitySprite[]): void;
    private sortEntities;
    transparentEntities(bool?: boolean): void;
    centerViewport(): void;
    getBlueprintBounds(): PIXI.Rectangle;
    getPicture(): Promise<Blob>;
    spawnPaintContainer(itemNameOrEntities: string | Entity[], direction?: number): void;
}
