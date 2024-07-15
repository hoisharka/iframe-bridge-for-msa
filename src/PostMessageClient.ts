/**
 * @file PostMessageClient.ts
 * @description This file contains the implementation of the PostMessageClient class,
 * which facilitates sending data requests from an iframe to a main page using the postMessage API.
 */

/**
 * Interface representing a request message object for postMessage communication.
 * @interface IPostMessageRequestMessageObj
 */
interface IPostMessageRequestMessageObj {
  key: string
  data: unknown // Data to be sent
  isRequest: boolean // Flag to identify if the message is a data request
  clientOrigin: string // The target origin to send the response to. Sent with the request and used for responding.
}

/**
 * Class representing a PostMessage client that handles sending data requests to a server.
 * @class PostMessageClient
 */
export class PostMessageClient {
  private _serverOrigin: string
  private _serverWindow: Window

  /**
   * Creates an instance of PostMessageClient.
   * @param {Object} [options] - Optional configuration object.
   * @param {Window} [options.serverWindow] - The target window object for the server.
   * @param {string} [options.serverOrigin] - The origin of the server.
   */
  constructor(options?: { serverWindow?: Window; serverOrigin?: string }) {
    this._serverOrigin = options?.serverOrigin || location.origin
    this._serverWindow = options?.serverWindow || window
  }

  /**
   * Sends a request message to the server and returns a promise that resolves with the response data.
   * @param {Object} request - The request configuration object.
   * @param {string} request.key - The key identifying the request.
   * @param {unknown} [request.data] - The data to be sent with the request.
   * @returns {Promise<unknown>} A promise that resolves with the response data.
   */
  request({ key, data }: { key: string; data?: unknown }) {
    return new Promise((resolve) => {
      const handler = (e: MessageEvent) => {
        if (e.data.key === key && e.data.isResponse) {
          resolve(e.data.data)
          window.removeEventListener('message', handler)
        }
      }
      window.addEventListener('message', handler)

      const messageObj: IPostMessageRequestMessageObj = {
        key,
        data,
        isRequest: true,
        clientOrigin: location.origin,
      }
      this._serverWindow.postMessage(messageObj, this._serverOrigin)
    })
  }
}
