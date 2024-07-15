import { PostMessageServer } from '../../src'

// Create an instance of PostMessageServer
const server = new PostMessageServer()

// Set up a server handler for the key 'getData'
server.setServer({
  key: 'getData',
  handler: async (data) => {
    console.log('Request received:', data)
    // Simulate processing and return some data
    return { message: 'Hello from Main Page!' }
  },
})
