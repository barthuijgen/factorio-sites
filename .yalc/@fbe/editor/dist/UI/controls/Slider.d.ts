import * as PIXI from 'pixi.js';
export declare class Slider extends PIXI.Container {
    private static readonly SLIDER_WIDTH;
    private static readonly SLIDER_HEIGHT;
    private readonly m_SliderButton;
    private readonly m_SliderValue;
    private m_Dragging;
    private m_Dragpoint;
    private p_Value;
    constructor(value?: number);
    get value(): number;
    set value(value: number);
    private updateButtonPosition;
    private updateSliderValue;
    private readonly onButtonDragStart;
    private readonly onButtonDragMove;
    private readonly onButtonDragEnd;
}
