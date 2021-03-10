import keyboardJS from 'keyboardjs';
declare function initActions(canvas: HTMLCanvasElement): void;
declare function passtroughAllEvents(cb: (e: keyboardJS.KeyEvent) => boolean): void;
declare class Action {
    readonly name: string;
    private readonly defaultKeyCombo;
    private m_active;
    private m_keyCombo;
    private handlers;
    private _pressed;
    constructor(name: string, defaultKeyCombo: string);
    get prettyName(): string;
    private get active();
    private set active(value);
    get keyCombo(): string;
    set keyCombo(value: string);
    get pressed(): boolean;
    get usesDefaultKeyCombo(): boolean;
    resetKeyCombo(): void;
    bind(opts: {
        press?: (e: keyboardJS.KeyEvent) => void;
        release?: (e: keyboardJS.KeyEvent) => void;
        once?: boolean;
        repeat?: boolean;
    }): void;
    call(): void;
}
declare function registerAction(name: string, keyCombo: string): Action;
declare function callAction(name: string): void;
declare function isActionActive(name: string): boolean;
declare function forEachAction(cb: (action: Action, actionName: string) => void): void;
declare function resetKeybinds(): void;
declare function importKeybinds(keybinds: Record<string, string>): void;
declare function exportKeybinds(changedOnly?: boolean): Record<string, string>;
export { initActions, passtroughAllEvents, registerAction, callAction, isActionActive, forEachAction, resetKeybinds, importKeybinds, exportKeybinds, };
