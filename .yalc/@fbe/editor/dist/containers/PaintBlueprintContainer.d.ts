import { Entity } from '../core/Entity';
import { EntitySprite } from './EntitySprite';
import { PaintContainer } from './PaintContainer';
import { BlueprintContainer } from './BlueprintContainer';
export declare class PaintBlueprintContainer extends PaintContainer {
    private readonly bp;
    private readonly entities;
    children: EntitySprite[];
    constructor(bpc: BlueprintContainer, entities: Entity[]);
    hide(): void;
    show(): void;
    destroy(): void;
    getItemName(): string;
    rotate(): void;
    moveAtCursor(): void;
    protected redraw(): void;
    placeEntityContainer(): void;
    removeContainerUnder(): void;
}
