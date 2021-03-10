import { PaintContainer } from './PaintContainer';
import { BlueprintContainer } from './BlueprintContainer';
export declare class PaintEntityContainer extends PaintContainer {
    private visualizationArea;
    private directionType;
    private direction;
    private undergroundLine;
    constructor(bpc: BlueprintContainer, name: string, direction: number);
    private get size();
    hide(): void;
    show(): void;
    destroy(): void;
    getItemName(): string;
    private checkBuildable;
    private updateUndergroundBeltRotation;
    private updateUndergroundLine;
    private destroyUndergroundLine;
    rotate(ccw?: boolean): void;
    protected redraw(): void;
    moveAtCursor(): void;
    removeContainerUnder(): void;
    placeEntityContainer(): void;
}
