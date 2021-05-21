import io from 'socket.io-client';

const ENDPOINT = window.location.hostname + ':3000';

let socket = io(ENDPOINT);

export default socket;