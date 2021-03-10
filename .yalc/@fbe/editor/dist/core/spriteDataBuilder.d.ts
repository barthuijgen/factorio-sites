import { PositionGrid } from './PositionGrid';
interface IDrawData {
    hr: boolean;
    dir: number;
    name: string;
    positionGrid: PositionGrid;
    position: IPoint;
    generateConnector: boolean;
    assemblerPipeDirection: string;
    dirType: string;
    operator: string;
    assemblerCraftsWithFluid: boolean;
    trainStopColor: {
        r: number;
        g: number;
        b: number;
        a: number;
    };
    chemicalPlantDontConnectOutput: boolean;
    modules: string[];
}
interface ISpriteData {
    filename: string;
    width: number;
    height: number;
    scale?: number;
    x?: number;
    y?: number;
    shift?: number[];
    tint?: {
        r: number;
        g: number;
        b: number;
        a: number;
    };
    anchorX?: number;
    anchorY?: number;
    squishY?: number;
    rotAngle?: number;
}
declare function getSpriteData(data: IDrawData): ISpriteData[];
declare function getBeltWireConnectionIndex(positionGrid: PositionGrid, position: IPoint, dir: number): 0 | 1 | 2 | 3 | 4 | 5 | 6;
export { ISpriteData, getSpriteData, getBeltWireConnectionIndex };
