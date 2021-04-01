declare const _default: {
    duplicate: <T>(obj: T) => T;
    getRandomInt: (min: number, max: number) => number;
    getRandomItem: <T_1>(array: T_1[]) => T_1;
    getRelativeDirection: (position: IPoint) => 0 | 2 | 4 | 6;
    rotatePointBasedOnDir: (p: IPoint | number[], dir: number) => IPoint;
    transformConnectionPosition: (position: IPoint, direction: number) => IPoint;
    switchSizeBasedOnDirection: (size: {
        width: number;
        height: number;
    }, direction: number) => IPoint;
    intToDir: (i: number) => "north" | "east" | "south" | "west";
    nearestPowerOf2: (n: number) => number;
    uniqueInArray: <T_2>(array: T_2[]) => T_2[];
    equalArrays: <T_3>(array1: T_3[], array2: T_3[]) => boolean;
    areObjectsEquivalent: <T_4 extends Record<string, any>>(a: T_4, b: T_4) => boolean;
    areArraysEquivalent: <T_5>(a: T_5[], b: T_5[]) => boolean;
    timer: (name: string) => {
        stop: () => void;
    };
    objectHasOwnProperty: (obj: Record<string, unknown>, key: string) => boolean;
};
export default _default;
