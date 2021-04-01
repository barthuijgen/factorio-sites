import { Entity } from '../core/Entity';
import { Blueprint } from '../core/Blueprint';
import { EntitySprite } from './EntitySprite';
import { BlueprintContainer } from './BlueprintContainer';
import { PaintBlueprintContainer } from './PaintBlueprintContainer';
export declare class PaintBlueprintEntityContainer {
    private readonly pbpc;
    private readonly bpc;
    private readonly bp;
    private readonly entity;
    private readonly visualizationArea;
    readonly entitySprites: EntitySprite[];
    private undergroundLine;
    constructor(pbpc: PaintBlueprintContainer, bpc: BlueprintContainer, bp: Blueprint, entity: Entity);
    private get entityPosition();
    private get position();
    destroy(): void;
    private checkBuildable;
    private updateUndergroundLine;
    private destroyUndergroundLine;
    moveAtCursor(): void;
    removeContainerUnder(): void;
    placeEntityContainer(): Entity;
}
