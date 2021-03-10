import * as PIXI from 'pixi.js';
export declare class Checkbox extends PIXI.Container {
    private static readonly CHECK_POLYGON;
    private m_Checkbox;
    private m_Hover;
    private m_Checked;
    constructor(checked?: boolean, text?: string);
    private static drawGraphic;
    get checked(): boolean;
    set checked(checked: boolean);
}
