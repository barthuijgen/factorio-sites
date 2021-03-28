import * as PIXI from 'pixi.js';
import { Entity } from '../core/Entity';
import { QuickbarPanel } from './QuickbarPanel';
export declare class UIContainer extends PIXI.Container {
    private debugContainer;
    quickbarPanel: QuickbarPanel;
    private entityInfoPanel;
    private dialogsContainer;
    private paintIconContainer;
    constructor();
    updateEntityInfoPanel(entity: Entity): void;
    addPaintIcon(icon: PIXI.DisplayObject): void;
    set showDebuggingLayer(visible: boolean);
    createEditor(entity: Entity): void;
    createInventory(title?: string, itemsFilter?: string[], selectedCallBack?: (selectedItem: string) => void): void;
}
