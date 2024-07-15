/**
 * postMessage 데이터 요청자
 */
export declare class PostMessageClient {
    private _serverOrigin;
    private _serverWindow;
    constructor(options?: {
        serverWindow?: Window;
        serverOrigin?: string;
    });
    request({ key, data }: {
        key: string;
        data?: unknown;
    }): Promise<unknown>;
}
