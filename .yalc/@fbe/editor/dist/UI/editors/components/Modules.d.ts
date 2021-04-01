import * as PIXI from 'pixi.js';
import { Entity } from '../../../core/Entity';
export declare class Modules extends PIXI.Container {
    private readonly m_Entity;
    private readonly m_Modules;
    constructor(entity: Entity);
    private onEntityChange;
    destroy(opts?: boolean | PIXI.IDestroyOptions): void;
    private updateContent;
    private onSlotPointerDown;
}
