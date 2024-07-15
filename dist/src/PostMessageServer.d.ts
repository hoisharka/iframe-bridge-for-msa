/**
 * @file PostMessageServer.ts
 * @description This file contains the implementation of the PostMessageServer class,
 * which facilitates communication between a main page and an iframe using the postMessage API.
 */
/**
 * Class representing a PostMessage server that handles communication between the main page and an iframe.
 * @class PostMessageServer
 */
export declare class PostMessageServer {
    private readonly _clientOrigin;
    private readonly _clientWindowGetter;
    private readonly _uuid;
    private _handlers;
    /**
     * Creates an instance of PostMessageServer.
     * @param {Object} [options] - Optional configuration object.
     * @param {() => Window} [options.clientWindowGetter] - Function to get the client window object.
     * @param {string} [options.clientOrigin] - The origin of the client.
     */
    constructor(options?: {
        clientWindowGetter?: () => Window;
        clientOrigin?: string;
    });
    /**
     * Gets the UUID of the server instance.
     * @returns {string} UUID of the server instance.
     */
    get uuid(): string;
    /**
     * Sets a server handler for a specific key.
     * @param {Object} config - Configuration object for setting the server.
     * @param {string} config.key - The key for the handler.
     * @param {(data: unknown) => Promise<unknown>} config.handler - The handler function for the key.
     */
    setServer({ key, handler }: {
        key: string;
        handler: (data: unknown) => Promise<unknown>;
    }): void;
    /**
     * Unsets a server handler for a specific key.
     * @param {string} key - The key for the handler to be removed.
     */
    unsetServer(key: string): void;
}
