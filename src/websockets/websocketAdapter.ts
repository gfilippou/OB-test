import { websocketSpecs } from '../config';
import logger from 'src/utilities/messageLogger';
import { store } from 'src/state/store';
import { setErrors } from 'src/state/sharedSlice';

export let socket: WebSocket | null = null;

export const isConnected = (): boolean => {
  if(!socket) return false;
  return socket && socket.readyState === 1
}

export const connect = () => {
  try {
    logger('Establishing connection');
    socket = new WebSocket(websocketSpecs.feedUrl);
  } catch (error) {
    disconnect();
    setTimeout(() => {
      logger('Connection failed, attempting to reconnect');
      connect();
    }, websocketSpecs.reconnectInterval);
  }
};

export const forceConnectionError = () => {
  disconnect();
  try {
    const errorMsg = 'Websocket error, self triggered';
    logger(errorMsg);
    throw new Error(errorMsg);
  } catch (e) {
    store.dispatch(
      setErrors('A connection error occurred, please refresh the page')
    );
  }
};

export const disconnect = () => {
  socket && socket.readyState === 1 ? socket.close() : (socket = null);
};
