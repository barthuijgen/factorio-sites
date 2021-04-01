import { CursorBoxType } from '../core/factorioData';
import { Entity } from '../core/Entity';
export declare class EntityContainer {
    static readonly mappings: Map<number, EntityContainer>;
    private static _updateGroups;
    private static get updateGroups();
    private visualizationArea;
    private entityInfo;
    private entitySprites;
    private cursorBoxContainer;
    private undergroundLine;
    private readonly m_Entity;
    constructor(entity: Entity, sort?: boolean);
    private static generateUpdateGroups;
    get entity(): Entity;
    get position(): IPoint;
    set cursorBox(type: CursorBoxType);
    private createUndergroundLine;
    private destroyUndergroundLine;
    private updateUndergroundLine;
    private redrawEntityInfo;
    pointerOverEventHandler(): void;
    pointerOutEventHandler(): void;
    private redrawSurroundingEntities;
    redraw(ignoreConnections?: boolean, sort?: boolean): void;
}
