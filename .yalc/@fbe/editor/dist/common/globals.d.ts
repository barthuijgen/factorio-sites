import * as PIXI from 'pixi.js';
import { Blueprint } from '../core/Blueprint';
import { UIContainer } from '../UI/UIContainer';
import { BlueprintContainer } from '../containers/BlueprintContainer';
declare function waitForLoader(): Promise<void>;
declare function getTexture(path: string, x?: number, y?: number, w?: number, h?: number): PIXI.Texture;
declare const _default: {
    debug: boolean;
    hr: boolean;
    BPC: BlueprintContainer;
    UI: UIContainer;
    app: PIXI.Application;
    bp: Blueprint;
    getTexture: typeof getTexture;
    waitForLoader: typeof waitForLoader;
};
export default _default;
