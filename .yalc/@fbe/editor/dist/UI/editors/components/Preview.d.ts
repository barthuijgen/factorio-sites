import * as PIXI from 'pixi.js';
import { Entity } from '../../../core/Entity';
export declare class Preview extends PIXI.Container {
    private readonly m_Entity;
    private readonly m_Size;
    private m_Preview;
    constructor(entity: Entity, size: number);
    private onEntityChange;
    destroy(opts?: boolean | PIXI.IDestroyOptions): void;
    private generatePreview;
    private readonly onEntityChanged;
}
