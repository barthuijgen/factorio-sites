import * as PIXI from 'pixi.js';
export declare class Button extends PIXI.Container {
    private readonly m_Background;
    private readonly m_Active;
    private readonly m_Hover;
    private m_Content;
    private m_Data;
    constructor(width?: number, height?: number, border?: number);
    get active(): boolean;
    set active(active: boolean);
    get content(): PIXI.DisplayObject;
    set content(content: PIXI.DisplayObject);
    get data(): unknown;
    set data(value: unknown);
    protected get background(): number;
    protected get hover(): number;
    protected get pressed(): boolean;
}
