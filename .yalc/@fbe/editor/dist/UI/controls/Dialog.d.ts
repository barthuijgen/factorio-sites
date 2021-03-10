import * as PIXI from 'pixi.js';
import { Panel } from './Panel';
export declare abstract class Dialog extends Panel {
    protected static s_openDialogs: Dialog[];
    constructor(width: number, height: number, title?: string);
    static closeLast(): void;
    static closeAll(): void;
    static anyOpen(): boolean;
    static isOpen<T extends Dialog>(dialog: T): boolean;
    protected static capitalize(text: string): string;
    protected setPosition(): void;
    close(): void;
    protected addLabel(x?: number, y?: number, text?: string, style?: PIXI.TextStyle): PIXI.Text;
    protected addLine(x: number, y: number, width: number, height: number, border?: number): PIXI.Graphics;
}
