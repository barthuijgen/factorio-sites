import * as PIXI from 'pixi.js';
import { BlueprintContainer } from './BlueprintContainer';
export declare abstract class PaintContainer extends PIXI.Container {
    protected readonly bpc: BlueprintContainer;
    private readonly icon;
    private _blocked;
    private tint;
    protected constructor(bpc: BlueprintContainer, name: string);
    protected get blocked(): boolean;
    protected set blocked(value: boolean);
    hide(): void;
    show(): void;
    destroy(): void;
    protected getGridPosition(): IPoint;
    protected setNewPosition(size: IPoint): void;
    private readonly updateIconPos;
    abstract getItemName(): string;
    abstract rotate(ccw?: boolean): void;
    protected abstract redraw(): void;
    abstract moveAtCursor(): void;
    abstract removeContainerUnder(): void;
    abstract placeEntityContainer(): void;
}
