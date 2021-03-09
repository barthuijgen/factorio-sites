import Ajv from 'ajv';
import { Blueprint } from './Blueprint';
import { Book } from './Book';
declare class CorruptedBlueprintStringError {
    error: unknown;
    constructor(error: unknown);
}
declare class ModdedBlueprintError {
    errors: Ajv.ErrorObject[];
    constructor(errors: Ajv.ErrorObject[]);
}
declare class TrainBlueprintError {
    errors: Ajv.ErrorObject[];
    constructor(errors: Ajv.ErrorObject[]);
}
declare function encode(bpOrBook: Blueprint | Book): Promise<string>;
declare function getBlueprintOrBookFromSource(source: string): Promise<Blueprint | Book>;
export { ModdedBlueprintError, TrainBlueprintError, CorruptedBlueprintStringError, encode, getBlueprintOrBookFromSource, };
