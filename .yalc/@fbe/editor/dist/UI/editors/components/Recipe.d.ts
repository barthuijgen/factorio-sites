import * as PIXI from 'pixi.js';
import { Entity } from '../../../core/Entity';
import { Slot } from '../../controls/Slot';
export declare class Recipe extends Slot {
    private readonly m_Entity;
    constructor(entity: Entity);
    private onEntityChange;
    destroy(opts?: boolean | PIXI.IDestroyOptions): void;
    private updateContent;
    private onSlotPointerDown;
}
