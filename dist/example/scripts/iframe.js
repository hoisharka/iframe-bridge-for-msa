import { PostMessageClient } from '../../src';
// Create an instance of PostMessageClient
const client = new PostMessageClient({
    serverOrigin: window.parent.location.origin,
    serverWindow: window.parent,
});
// Set up a click event to send a request to the server
document.getElementById('sendRequest')?.addEventListener('click', () => {
    client.request({ key: 'getData', data: { query: 'Hello' } }).then((response) => {
        console.log('Response received:', response);
        alert('Response: ' + JSON.stringify(response));
    });
});
