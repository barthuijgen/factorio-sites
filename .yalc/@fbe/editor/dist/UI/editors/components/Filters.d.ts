import * as PIXI from 'pixi.js';
import { Entity } from '../../../core/Entity';
export declare class Filters extends PIXI.Container {
    private readonly m_Entity;
    private readonly m_Amount;
    private m_Filters;
    constructor(entity: Entity, amount?: boolean);
    private onEntityChange;
    destroy(opts?: boolean | PIXI.IDestroyOptions): void;
    updateFilter(index: number, count: number): void;
    getFilterCount(index: number): number;
    private m_UpdateFilters;
    private m_UpdateSlots;
    private readonly onSlotPointerDown;
}
