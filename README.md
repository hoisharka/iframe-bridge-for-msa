# iframe-bridge-for-msa

`iframe-bridge-for-msa` is a lightweight JavaScript library that facilitates communication between a main page and an iframe using the postMessage API. This library simplifies the process of sending and receiving messages between different origins, making it ideal for microservice architectures (MSA) where iframes are used to embed services.

## Features

- Easy setup for both server and client communication.
- Supports sending and receiving structured messages.
- Handles cross-origin communication securely.

## Installation

You can install `iframe-bridge-for-msa` via npm:

```bash
npm install iframe-bridge-for-msa
```

## Usage
### Setting up the Server (Main Page)
- In your main page, create an instance of PostMessageServer and set up the handlers for incoming messages.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Main Page</title>
</head>
<body>
  <h1>Main Page</h1>
  <iframe src="iframe.html" width="600" height="400"></iframe>

  <script type="module">
    import { PostMessageServer } from './PostMessageServer.js';

    // Create an instance of PostMessageServer
    const server = new PostMessageServer();

    // Set up a server handler for the key 'getData'
    server.setServer({
      key: 'getData',
      handler: async (data) => {
        console.log('Request received:', data);
        // Simulate processing and return some data
        return { message: 'Hello from Main Page!' };
      }
    });
  </script>
</body>
</html>
```

### Setting up the Client (Iframe Page)
- In your iframe page, create an instance of PostMessageClient and send requests to the server.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Iframe Page</title>
</head>
<body>
  <h1>Iframe Page</h1>
  <button id="sendRequest">Send Request</button>

  <script type="module">
    import { PostMessageClient } from './PostMessageClient.js';

    // Create an instance of PostMessageClient
    const client = new PostMessageClient({
      serverOrigin: window.parent.location.origin,
      serverWindow: window.parent
    });

    // Set up a click event to send a request to the server
    document.getElementById('sendRequest')?.addEventListener('click', () => {
      client.request({ key: 'getData', data: { query: 'Hello' } })
        .then(response => {
          console.log('Response received:', response);
          alert('Response: ' + JSON.stringify(response));
        });
    });
  </script>
</body>
</html>
```

## API

### PostMessageServer

#### Constructor

```typescript
constructor(options?: { clientWindowGetter?: () => Window; clientOrigin?: string });
```

- clientWindowGetter: Function to get the client window object. Defaults to () => window.
- entOrigin: The origin of the client. Defaults to location.origin.

#### Methods

- setServer({ key, handler })
  - key: The key for the handler.
  - handler: The handler function that processes the data and returns a promise.
- unsetServer(key)
  - key: The key for the handler to be removed.

### PostMessageClient

#### Constructor

```typescript
constructor(options?: { serverWindow?: Window; serverOrigin?: string });
```
- serverWindow: The target window object for the server. Defaults to window.
- serverOrigin: The origin of the server. Defaults to location.origin.

#### Methods
- request({ key, data })
  - key: The key identifying the request.
  - data: The data to be sent with the request.
  - Returns a promise that resolves with the response data.

## Example Execution
To run the example included in this repository, follow these steps:

1. **Install Dependencies**

   Ensure you have all the necessary dependencies installed. If you haven't already installed them, run:

   ```bash
   npm install
   ```

2. **Start Vite Development Server**

   Use Vite to serve the example files. Run the following command to start the Vite development server:

   ```bash
   npx vite
   ```

3.	**Open Your Browser**

    Open your browser and navigate to http://localhost:5173. This will load the index.html file from the example directory, which includes the main page with the iframe.

4.	**Interact with the Example**

    In the main page, you will see an iframe loading the iframe.html file. You can interact with the example by clicking the “Send Request” button in the iframe, which will send a message to the main page and display the response.

That’s it! You should now see the PostMessageServer and PostMessageClient in action, facilitating communication between the main page and the iframe.

### License

- This project is licensed under the MIT License. See the LICENSE file for details.
- Feel free to open issues or pull requests for any bugs or enhancements. Enjoy using iframe-bridge-for-msa!
