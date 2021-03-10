import * as PIXI from 'pixi.js';
export declare class Enable extends PIXI.Container {
    private readonly m_TextText;
    private readonly m_HoverText;
    private readonly m_ActiveText;
    private m_Active;
    constructor(active: boolean, text: string);
    get active(): boolean;
    set active(value: boolean);
}
