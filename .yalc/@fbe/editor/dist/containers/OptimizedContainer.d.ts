import * as PIXI from 'pixi.js';
import { EntitySprite } from './EntitySprite';
import { BlueprintContainer } from './BlueprintContainer';
export declare class OptimizedContainer extends PIXI.Container {
    private bpc;
    children: EntitySprite[];
    constructor(bpc: BlueprintContainer);
    updateTransform(): void;
    render(renderer: PIXI.Renderer): void;
}
