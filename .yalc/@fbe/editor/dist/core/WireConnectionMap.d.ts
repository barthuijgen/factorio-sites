import { IConnection } from './WireConnections';
export declare class WireConnectionMap extends Map<string, IConnection> {
    private entNrToConnHash;
    getEntityConnectionHashes(entityNumber: number): string[];
    getEntityConnections(entityNumber: number): IConnection[];
    set(hash: string, connection: IConnection): this;
    delete(hash: string): boolean;
}
