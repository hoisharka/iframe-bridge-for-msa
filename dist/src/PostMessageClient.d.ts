/**
 * @file PostMessageClient.ts
 * @description This file contains the implementation of the PostMessageClient class,
 * which facilitates sending data requests from an iframe to a main page using the postMessage API.
 */
/**
 * Class representing a PostMessage client that handles sending data requests to a server.
 * @class PostMessageClient
 */
export declare class PostMessageClient {
    private _serverOrigin;
    private _serverWindow;
    /**
     * Creates an instance of PostMessageClient.
     * @param {Object} [options] - Optional configuration object.
     * @param {Window} [options.serverWindow] - The target window object for the server.
     * @param {string} [options.serverOrigin] - The origin of the server.
     */
    constructor(options?: {
        serverWindow?: Window;
        serverOrigin?: string;
    });
    /**
     * Sends a request message to the server and returns a promise that resolves with the response data.
     * @param {Object} request - The request configuration object.
     * @param {string} request.key - The key identifying the request.
     * @param {unknown} [request.data] - The data to be sent with the request.
     * @returns {Promise<unknown>} A promise that resolves with the response data.
     */
    request({ key, data }: {
        key: string;
        data?: unknown;
    }): Promise<unknown>;
}
