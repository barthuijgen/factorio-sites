import * as PIXI from 'pixi.js';
import { Entity } from '../core/Entity';
import { PositionGrid } from '../core/PositionGrid';
import { ISpriteData } from '../core/spriteDataBuilder';
interface IEntityData {
    name: string;
    type?: string;
    direction?: number;
    position?: IPoint;
    generateConnector?: boolean;
    directionType?: string;
    operator?: string;
    assemblerCraftsWithFluid?: boolean;
    assemblerPipeDirection?: string;
    trainStopColor?: {
        r: number;
        g: number;
        b: number;
        a: number;
    };
    chemicalPlantDontConnectOutput?: boolean;
    modules?: string[];
}
export declare class EntitySprite extends PIXI.Sprite {
    private static nextID;
    private id;
    zIndex: number;
    private zOrder;
    cachedBounds: [number, number, number, number];
    private readonly entityPos;
    constructor(texture: PIXI.Texture, data: ISpriteData, position?: IPoint);
    private static getNextID;
    static getParts(entity: IEntityData | Entity, position?: IPoint, positionGrid?: PositionGrid): EntitySprite[];
    static compareFn(a: EntitySprite, b: EntitySprite): number;
    private cacheBounds;
}
export {};
