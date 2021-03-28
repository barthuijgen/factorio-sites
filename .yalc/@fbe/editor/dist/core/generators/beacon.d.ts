import { IVisualization } from './index';
export declare function generateBeacons(entities: {
    position: IPoint;
    size: number;
    effect: boolean;
}[], minAffectedEntities?: number): {
    beacons: {
        name: string;
        position: IPoint;
    }[];
    info: {
        totalBeacons: number;
        effectsGiven: number;
    };
    visualizations: IVisualization[];
};
