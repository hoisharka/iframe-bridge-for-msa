/**
 * @file PostMessageServer.ts
 * @description This file contains the implementation of the PostMessageServer class,
 * which facilitates communication between a main page and an iframe using the postMessage API.
 */

import { v4 as uuidv4 } from 'uuid'

/**
 * Interface representing a request message object for postMessage communication.
 * @interface IPostMessageRequestMessageObj
 */
interface IPostMessageRequestMessageObj {
  key: string
  data: unknown
  isRequest: boolean
  clientOrigin: string
}

/**
 * Interface representing a response message object for postMessage communication.
 * @interface IPostMessageResponseMessageObj
 */
interface IPostMessageResponseMessageObj {
  key: string
  data: unknown
  isResponse: boolean
}

/**
 * Class representing a PostMessage server that handles communication between the main page and an iframe.
 * @class PostMessageServer
 */
export class PostMessageServer {
  private readonly _clientOrigin: string
  private readonly _clientWindowGetter: () => Window
  private readonly _uuid: string
  private _handlers: { [key: string]: (e: MessageEvent) => Promise<unknown> } = {}

  /**
   * Creates an instance of PostMessageServer.
   * @param {Object} [options] - Optional configuration object.
   * @param {() => Window} [options.clientWindowGetter] - Function to get the client window object.
   * @param {string} [options.clientOrigin] - The origin of the client.
   */
  constructor(options?: { clientWindowGetter?: () => Window; clientOrigin?: string }) {
    console.log('[ PostMessageServer ] options', options)
    this._clientOrigin = options?.clientOrigin || location.origin
    this._clientWindowGetter = options?.clientWindowGetter || (() => window)
    this._uuid = uuidv4()
  }

  /**
   * Gets the UUID of the server instance.
   * @returns {string} UUID of the server instance.
   */
  get uuid(): string {
    return this._uuid
  }

  /**
   * Sets a server handler for a specific key.
   * @param {Object} config - Configuration object for setting the server.
   * @param {string} config.key - The key for the handler.
   * @param {(data: unknown) => Promise<unknown>} config.handler - The handler function for the key.
   */
  setServer({ key, handler }: { key: string; handler: (data: unknown) => Promise<unknown> }) {
    this.unsetServer(key)
    this._handlers[key] = async (e: MessageEvent) => {
      const requestMessage: IPostMessageRequestMessageObj = e.data

      if (
        e.origin === this._clientOrigin &&
        requestMessage.key === key &&
        requestMessage.isRequest
      ) {
        const data = await handler(e.data)
        const messageObj: IPostMessageResponseMessageObj = { key, data, isResponse: true }
        this._clientWindowGetter().postMessage(messageObj, requestMessage.clientOrigin)
      }
    }
    window.addEventListener('message', this._handlers[key])
  }

  /**
   * Unsets a server handler for a specific key.
   * @param {string} key - The key for the handler to be removed.
   */
  unsetServer(key: string) {
    if (this._handlers[key]) {
      window.removeEventListener('message', this._handlers[key])
      delete this._handlers[key]
    }
  }
}
