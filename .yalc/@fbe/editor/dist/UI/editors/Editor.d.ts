import { Entity } from '../../core/Entity';
import { Dialog } from '../controls/Dialog';
import { Preview } from './components/Preview';
import { Recipe } from './components/Recipe';
import { Modules } from './components/Modules';
import { Filters } from './components/Filters';
export declare abstract class Editor extends Dialog {
    protected readonly m_Entity: Entity;
    protected readonly m_Preview: Preview;
    constructor(width: number, height: number, entity: Entity);
    protected addRecipe(x?: number, y?: number): Recipe;
    protected addModules(x?: number, y?: number): Modules;
    protected addFilters(x?: number, y?: number, amount?: boolean): Filters;
    protected onEntityChange(event: string, fn: (...args: any[]) => void): void;
    destroy(): void;
}
