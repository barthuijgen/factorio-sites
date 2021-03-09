import { Blueprint } from './Blueprint';
declare class Book {
    private _active;
    private _activeIndex;
    private readonly blueprints;
    private readonly label?;
    private readonly description?;
    private readonly icons?;
    constructor(data: BPS.IBlueprintBook);
    get activeIndex(): number;
    get lastBookIndex(): number;
    private saveActiveBlueprint;
    selectBlueprint(index?: number): Blueprint;
    serialize(): BPS.IBlueprintBook;
}
export { Book };
