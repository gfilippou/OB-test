import { store } from 'src/state/store';
import { socket } from './websocketAdapter';
import { setWebsocketState } from 'src/state/sharedSlice';
import { websocketSpecs } from 'src/config';
import logger from '../utilities/messageLogger';
import websocketDataBuffer from 'src/websockets/websocketDataBuffer';

export const createWebSocketMessage = (
  eventType: 'subscribe' | 'unsubscribe',
  product_ids: string
): string => {
  return `{"event":"${eventType}","feed":"book_ui_1","product_ids":["${product_ids}"]}`;
};

export const onMessage = (event: MessageEvent) => {
  const message = JSON.parse(event.data);
  if (message.event) {
    handleInfoMessage(message);
  } else if (message.feed) {
    handleDataMessage(message);
  } else return logger('Websocket message received', event.data);
};

const handleInfoMessage = (message: any) => {
  logger(`Websocket ${message.event} message received`, message);
};

const handleDataMessage = (message: any) => {
  websocketDataBuffer(message);
};

export const onClose = (event: CloseEvent) => {
  event.wasClean
    ? logger('Disconnected Successfully', event)
    : logger('Connection closed unexpectedly', event);
  store.dispatch(setWebsocketState('CLOSED'));
};

export const onError = (event: Event) => logger('Connection error', event);

export const onOpen = () => {
  store.dispatch(setWebsocketState('OPEN'));

  logger('Websocket connection established');
  socket &&
    socket.send(
      createWebSocketMessage(
        'subscribe',
        websocketSpecs.feedSpecs.PI_XBTUSD.product_id
      )
    );
};
