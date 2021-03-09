import { Blueprint, IOilOutpostSettings } from './core/Blueprint';
import { GridPattern } from './containers/BlueprintContainer';
export declare class Editor {
    init(canvas: HTMLCanvasElement): Promise<void>;
    setRendererSize(width: number, height: number): void;
    get moveSpeed(): number;
    set moveSpeed(speed: number);
    get gridColor(): number;
    set gridColor(color: number);
    get gridPattern(): GridPattern;
    set gridPattern(pattern: GridPattern);
    get quickbarItems(): string[];
    set quickbarItems(items: string[]);
    get oilOutpostSettings(): IOilOutpostSettings;
    set oilOutpostSettings(settings: IOilOutpostSettings);
    get debug(): boolean;
    set debug(debug: boolean);
    getPicture(): Promise<Blob>;
    loadBlueprint(bp: Blueprint): Promise<void>;
    private registerActions;
}
