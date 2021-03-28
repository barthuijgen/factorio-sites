import { Tile } from '../core/Tile';
import { EntitySprite } from './EntitySprite';
export declare class TileContainer {
    private readonly tileSprites;
    constructor(tile: Tile);
    static generateSprite(name: string, x: number, y: number): EntitySprite;
    static generateSprites(name: string, position: IPoint, positions: IPoint[]): EntitySprite[];
}
