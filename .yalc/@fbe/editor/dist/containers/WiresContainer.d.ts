import * as PIXI from 'pixi.js';
import { Blueprint } from '../core/Blueprint';
import { IConnection } from '../core/WireConnections';
export declare class WiresContainer extends PIXI.Container {
    private readonly bp;
    private connectionToSprite;
    constructor(bp: Blueprint);
    private static createWire;
    connect(hash: string, connection: IConnection): void;
    disconnect(hash: string, connection: IConnection): void;
    add(hash: string, connection: IConnection): void;
    remove(hash: string): void;
    update(entityNumber: number): void;
    private updateConnectedEntities;
    private redrawEntityConnections;
    private getWireSprite;
}
