import { PaintContainer } from './PaintContainer';
import { BlueprintContainer } from './BlueprintContainer';
export declare class PaintTileContainer extends PaintContainer {
    private static size;
    constructor(bpc: BlueprintContainer, name: string);
    private static getTilePositions;
    hide(): void;
    show(): void;
    destroy(): void;
    getItemName(): string;
    increaseSize(): void;
    decreaseSize(): void;
    rotate(): void;
    protected redraw(): void;
    moveAtCursor(): void;
    removeContainerUnder(): void;
    placeEntityContainer(): void;
}
