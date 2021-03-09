import { Dialog } from './controls/Dialog';
export declare class InventoryDialog extends Dialog {
    private readonly m_InventoryGroups;
    private readonly m_InventoryItems;
    private readonly m_RecipeLabel;
    private readonly m_RecipeContainer;
    private m_hoveredItem;
    constructor(title?: string, itemsFilter?: string[], selectedCallBack?: (selectedItem: string) => void);
    protected setPosition(): void;
    private updateRecipeVisualization;
}
