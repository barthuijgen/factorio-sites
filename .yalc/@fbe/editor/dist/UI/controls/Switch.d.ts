import * as PIXI from 'pixi.js';
export declare class Switch extends PIXI.Container {
    private readonly m_Button;
    private readonly m_Values;
    private m_Value;
    constructor(values: string[], value?: string);
    get value(): string;
    set value(value: string);
    private updateButtonPosition;
}
