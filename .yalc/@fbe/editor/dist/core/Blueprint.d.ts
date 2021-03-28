import { EventEmitter } from 'eventemitter3';
import { Entity } from './Entity';
import { WireConnections } from './WireConnections';
import { PositionGrid } from './PositionGrid';
import { History } from './History';
import { Tile } from './Tile';
interface IOilOutpostSettings extends Record<string, string | boolean | number> {
    DEBUG: boolean;
    PUMPJACK_MODULE: string;
    MIN_GAP_BETWEEN_UNDERGROUNDS: number;
    BEACONS: boolean;
    MIN_AFFECTED_ENTITIES: number;
    BEACON_MODULE: string;
}
declare const oilOutpostSettings: IOilOutpostSettings;
declare const getFactorioVersion: (main?: number, major?: number, minor?: number) => number;
declare class OurMap<K, V> extends Map<K, V> {
    constructor(values?: V[], mapFn?: (value: V) => K);
    isEmpty(): boolean;
    valuesArray(): V[];
    find(predicate: (value: V, key: K) => boolean): V;
    filter(predicate: (value: V, key: K) => boolean): V[];
}
interface IEntityData extends Omit<BPS.IEntity, 'entity_number'> {
    entity_number?: number;
}
export declare class Blueprint extends EventEmitter {
    name: string;
    private readonly icons;
    readonly wireConnections: WireConnections;
    readonly entityPositionGrid: PositionGrid;
    readonly entities: OurMap<number, Entity>;
    readonly tiles: OurMap<string, Tile>;
    readonly history: History;
    private readonly description?;
    private readonly schedules?;
    private readonly absolute_snapping?;
    private readonly snap_to_grid?;
    private readonly position_relative_to_grid?;
    private m_nextEntityNumber;
    constructor(data?: Partial<BPS.IBlueprint>);
    createEntity(rawData: IEntityData, connectPowerPole?: boolean): Entity;
    removeEntity(entity: Entity): void;
    removeEntities(entities: Entity[]): void;
    fastReplaceEntity(name: string, direction: number, position: IPoint): boolean;
    private onCreateOrRemoveEntity;
    createTiles(name: string, positions: IPoint[]): void;
    removeTiles(positions: IPoint[]): void;
    private onCreateOrRemoveTile;
    private get nextEntityNumber();
    getFirstRailRelatedEntity(): Entity;
    isEmpty(): boolean;
    private getCenter;
    generatePipes(): string;
    private generateIcons;
    private processRawEntities;
    serialize(): BPS.IBlueprint;
}
export { oilOutpostSettings, getFactorioVersion, IOilOutpostSettings };
