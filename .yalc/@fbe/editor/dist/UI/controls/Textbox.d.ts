import * as PIXI from 'pixi.js';
export declare class Textbox extends PIXI.Container {
    private readonly m_Background;
    private readonly m_Active;
    private readonly m_Text;
    private readonly m_Length;
    private readonly m_Filter;
    private readonly m_CaretGraphic;
    private p_CaretPosition;
    private m_MouseInside;
    constructor(width: number, text?: string, length?: number, filter?: string);
    get text(): string;
    set text(text: string);
    private get caretPosition();
    private set caretPosition(value);
    private instertCharacter;
    private removeCharacter;
    private readonly onPointerUp;
    private readonly keyPressedCallback;
}
