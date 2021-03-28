import { IVisualization } from './index';
declare function generatePipes(pumpjacks: {
    entity_number: number;
    position: IPoint;
}[], minGapBetweenUndergrounds?: number): {
    pumpjacksToRotate: {
        entity_number: number;
        direction: number;
    }[];
    pipes: {
        name: string;
        position: IPoint;
        direction: number;
    }[];
    info: {
        nrOfPipes: number;
        nrOfUPipes: number;
        nrOfPipesReplacedByUPipes: number;
    };
    visualizations: IVisualization[];
};
export { generatePipes };
