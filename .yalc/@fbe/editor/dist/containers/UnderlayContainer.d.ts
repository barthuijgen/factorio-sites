import * as PIXI from 'pixi.js';
import { VisualizationArea } from './VisualizationArea';
export declare class UnderlayContainer extends PIXI.Container {
    private active;
    private readonly logistics0;
    private readonly logistics1;
    private readonly poles;
    private readonly beacons;
    private readonly drills;
    private readonly dummyVisualizationArea;
    constructor();
    private static getDataForVisualizationArea;
    activateRelatedAreas(entityName: string): void;
    deactivateActiveAreas(): void;
    create(entityName: string, position: IPoint): VisualizationArea;
}
