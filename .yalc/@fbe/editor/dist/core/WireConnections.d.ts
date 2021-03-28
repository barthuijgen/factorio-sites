import { EventEmitter } from 'eventemitter3';
import { Blueprint } from './Blueprint';
export interface IConnection {
    color: string;
    entityNumber1: number;
    entityNumber2: number;
    entitySide1: number;
    entitySide2: number;
}
export declare class WireConnections extends EventEmitter {
    private bp;
    private readonly connections;
    constructor(bp: Blueprint);
    private static hash;
    static deserialize(entityNumber: number, connections: BPS.IConnection, neighbours: number[]): IConnection[];
    static serialize(entityNumber: number, connections: IConnection[], getType: (entityNumber: number) => string, entNrWhitelist?: Set<number>): {
        connections: BPS.IConnection;
        neighbours: number[];
    };
    private static toPoleConnection;
    create(connection: IConnection): void;
    private remove;
    private onCreateOrRemoveConnection;
    get(hash: string): IConnection;
    forEach(fn: (value: IConnection, key: string) => void): void;
    createEntityConnections(entityNumber: number, connections: BPS.IConnection, neighbours: number[]): void;
    removeEntityConnections(entityNumber: number): void;
    getEntityConnectionHashes(entityNumber: number): string[];
    getEntityConnections(entityNumber: number): IConnection[];
    serializeConnectionData(entityNumber: number, entNrWhitelist?: Set<number>): {
        connections: BPS.IConnection;
        neighbours: number[];
    };
    connectPowerPole(entityNumber: number): void;
    generatePowerPoleWires(): void;
    getPowerPoleDirection(entityNumber: number): number;
}
