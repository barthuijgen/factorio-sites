import { Panel } from './controls/Panel';
export declare class QuickbarPanel extends Panel {
    private iWidth;
    private iHeight;
    private rows;
    private slots;
    private slotsContainer;
    constructor(rows?: number, itemNames?: string[]);
    private static createTriangleButton;
    generateSlots(itemNames?: string[]): void;
    bindKeyToSlot(slot: number): void;
    changeActiveQuickbar(): void;
    serialize(): string[];
    protected setPosition(): void;
}
