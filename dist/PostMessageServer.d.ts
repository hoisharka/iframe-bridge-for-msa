/**
 * postMessage 데이터 제공자
 */
export declare class PostMessageServer {
    private readonly _clientOrigin;
    private readonly _clientWindowGetter;
    private readonly _uuid;
    private _handlers;
    constructor(options?: {
        clientWindowGetter?: () => Window;
        clientOrigin?: string;
    });
    get uuid(): string;
    setServer({ key, handler }: {
        key: string;
        handler: (data: unknown) => Promise<unknown>;
    }): void;
    unsetServer(key: string): void;
}
