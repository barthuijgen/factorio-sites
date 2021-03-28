import { IVisualization } from './index';
export declare function generatePoles(entities: {
    position: IPoint;
    size: number;
    power: boolean;
}[]): {
    poles: {
        name: string;
        position: IPoint;
    }[];
    info: {
        totalPoles: number;
    };
    visualizations: IVisualization[];
};
