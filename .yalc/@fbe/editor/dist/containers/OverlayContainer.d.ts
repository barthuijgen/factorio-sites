import * as PIXI from 'pixi.js';
import { CursorBoxType } from '../core/factorioData';
import { Entity } from '../core/Entity';
import { BlueprintContainer } from './BlueprintContainer';
export declare class OverlayContainer extends PIXI.Container {
    private readonly bpc;
    private readonly entityInfos;
    private readonly cursorBoxes;
    private readonly undergroundLines;
    private readonly selectionArea;
    private copyCursorBox;
    private selectionAreaUpdateFn;
    constructor(bpc: BlueprintContainer);
    static createEntityInfo(entity: Entity, position: IPoint): PIXI.Container;
    createCopyCursorBox(): void;
    destroyCopyCursorBox(): void;
    toggleEntityInfoVisibility(): void;
    createEntityInfo(entity: Entity, position: IPoint): PIXI.Container;
    createCursorBox(position: IPoint, size: IPoint, type?: CursorBoxType): PIXI.Container;
    createUndergroundLine(name: string, position: IPoint, direction: number, searchDirection: number): PIXI.Container;
    showSelectionArea(color: number): void;
    hideSelectionArea(): void;
}
