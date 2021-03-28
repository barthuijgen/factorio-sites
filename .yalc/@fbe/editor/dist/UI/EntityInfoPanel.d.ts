import { Entity } from '../core/Entity';
import { Panel } from './controls/Panel';
export declare class EntityInfoPanel extends Panel {
    private title;
    private m_EntityName;
    private m_entityInfo;
    private m_RecipeContainer;
    private m_RecipeIOContainer;
    constructor();
    updateVisualization(entity?: Entity): void;
    protected setPosition(): void;
    private findNearbyBeacons;
}
