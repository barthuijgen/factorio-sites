import * as PIXI from 'pixi.js';
import { IngredientOrResult, ColorWithAlpha } from '../../core/factorioData';
declare function ShadeColor(color: number, percent: number): number;
declare function DrawRectangle(width: number, height: number, background: number, alpha?: number, border?: number, pressed?: boolean): PIXI.Graphics;
declare function DrawControlFace(w: number, h: number, f: number, c: number, a: number, p0: number, p1: number, p2: number, p3: number): PIXI.Graphics;
declare function CreateIcon(itemName: string, maxSize?: number, setAnchor?: boolean, darkBackground?: boolean): PIXI.DisplayObject;
declare function CreateIconWithAmount(host: PIXI.Container, x: number, y: number, name: string, amount: number): void;
declare function CreateRecipe(host: PIXI.Container, x: number, y: number, ingredients: IngredientOrResult[], results: IngredientOrResult[], time: number): void;
declare function applyTint(s: PIXI.Sprite, tint: ColorWithAlpha): void;
declare const _default: {
    ShadeColor: typeof ShadeColor;
    DrawRectangle: typeof DrawRectangle;
    DrawControlFace: typeof DrawControlFace;
    CreateIcon: typeof CreateIcon;
    CreateIconWithAmount: typeof CreateIconWithAmount;
    CreateRecipe: typeof CreateRecipe;
    applyTint: typeof applyTint;
};
export default _default;
