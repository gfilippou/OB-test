import { setFeed } from 'src/state/sharedSlice';
import { Middleware } from 'redux';
import { websocketSpecs } from 'src/config';
import {
  connect,
  forceConnectionError,
  socket,
  disconnect,
} from 'src/websockets/websocketAdapter';
import {
  createWebSocketMessage,
  onClose,
  onError,
  onMessage,
  onOpen,
} from 'src/websockets/websocketEventsHandler';

const websocketMiddleware: Middleware = (store) => {
  return (next) => (action) => {
    if (action.type === 'CONNECT_TO_WEBSOCKET') {
      connect();
    }

    if (action.type === 'DISCONNECT_FROM_WEBSOCKET') {
      disconnect();
    }

    if (socket) {
      socket.onopen = () => onOpen();
      socket.onmessage = (event: MessageEvent) => onMessage(event);
      socket.onclose = (event: CloseEvent) => onClose(event);
      socket.onerror = (event: Event) => onError(event);

      if (action.type === 'shared/setFeed') {
        const oldFeed =
          action.payload === websocketSpecs.feedSpecs.PI_ETHUSD.product_id
            ? websocketSpecs.feedSpecs.PI_XBTUSD.product_id
            : websocketSpecs.feedSpecs.PI_ETHUSD.product_id;

        socket.send(createWebSocketMessage('unsubscribe', oldFeed));
        socket.send(createWebSocketMessage('subscribe', action.payload));
      }
    }

    if (action.type === 'FORCE_WEBSOCKET_ERROR') {
      forceConnectionError();
    }

    return next(action);
  };
};

export default websocketMiddleware;
