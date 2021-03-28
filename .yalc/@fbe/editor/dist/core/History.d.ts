declare enum HistoryValue {
    New = 0,
    Old = 1
}
declare class Action<V> {
    readonly oldValue: V;
    readonly newValue: V;
    readonly text: string;
    private readonly applyFn;
    private readonly emits;
    private readonly history;
    applyImmediate: boolean;
    constructor(history: History, oldValue: V, newValue: V, text: string, applyFn: (value: V) => void);
    commit(): this;
    apply(value?: HistoryValue): void;
    onDone(f: (newValue: V, oldValue: V) => void): Action<V>;
}
export declare class History {
    logging: boolean;
    private readonly MAX_HISTORY_LENGTH;
    private readonly MIN_HISTORY_LENGTH;
    private transactionCount;
    private historyIndex;
    private activeTransaction;
    private transactionHistory;
    reset(): void;
    updateValue<T, V>(target: T, path: string[], value: V, text: string): Action<V>;
    updateMap<K, V>(target: Map<K, V>, key: K, value: V, text: string): Action<V>;
    undo(): boolean;
    redo(): boolean;
    startTransaction(text?: string, applyImmediate?: boolean): boolean;
    commitTransaction(): boolean;
    private GetValue;
    private SetValue;
    private DeleteValue;
}
export {};
