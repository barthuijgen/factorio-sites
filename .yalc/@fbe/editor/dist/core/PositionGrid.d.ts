import { Blueprint } from './Blueprint';
import { Entity } from './Entity';
interface IArea {
    x: number;
    y: number;
    w: number;
    h: number;
}
interface INeighbourData extends IPoint {
    relDir: number;
    entity: Entity;
}
export declare class PositionGrid {
    private bp;
    private grid;
    constructor(bp: Blueprint);
    private tileDataAction;
    getEntityAtPosition(x: number, y: number): Entity;
    setTileData(entity: Entity, position?: IPoint): void;
    removeTileData(entity: Entity, position?: IPoint): void;
    canMoveTo(entity: Entity, newPosition: IPoint): boolean;
    isAreaAvalible(name: string, pos: IPoint, direction?: number): boolean;
    checkFastReplaceableGroup(name: string, direction: number, pos: IPoint): Entity;
    checkSameEntityAndDifferentDirection(name: string, direction: number, pos: IPoint): Entity;
    getOpposingEntity(name: string, direction: number, position: IPoint, searchDirection: number, maxDistance: number): number;
    sharesCell(area: IArea): boolean;
    isAreaEmpty(area: IArea): boolean;
    findInArea(area: IArea, fn: (entity: Entity) => boolean): Entity;
    getEntitiesInArea(area: IArea): Entity[];
    getSurroundingEntities(area: IArea): Entity[];
    getNeighbourData(point: IPoint): INeighbourData[];
}
export {};
