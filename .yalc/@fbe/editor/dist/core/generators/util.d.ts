declare const _default: {
    hashPoint: (p: IPoint) => string;
    equalPoints: <T extends IPoint>(a: T) => (b: T) => boolean;
    uniqPoints: <T_1 extends IPoint>(list: T_1[]) => T_1[];
    arrayToPoint: (array: number[]) => IPoint;
    pointToArray: (point: IPoint) => number[];
    manhattenDistance: (p0: IPoint, p1: IPoint) => number;
    euclideanDistance: (p0: IPoint, p1: IPoint) => number;
    pointInCircle: (point: IPoint, origin: IPoint, r: number) => boolean;
    pointsToLines: <T_2 extends IPoint>(nodes: T_2[]) => T_2[][];
    pointsToTriangles: <T_3 extends IPoint>(nodes: T_3[]) => T_3[][];
    range: (from: number, to: number) => number[];
    getAngle: (cX: number, cY: number, pX: number, pY: number) => number;
    getReflectedPoint: (p: IPoint, lp0: IPoint, lp1: IPoint) => IPoint;
    findSide: (p: IPoint, lp0: IPoint, lp1: IPoint) => number;
};
export default _default;
