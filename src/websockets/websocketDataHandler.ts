import { websocketSpecs } from 'src/config';
import { store } from 'src/state/store';
import {isConnected, socket} from './websocketAdapter';
import {
  clearDeltasBuffer,
  deltasBuffer,
  snapshot,
} from 'src/websockets/websocketDataBuffer';
import { setOrderbookData } from 'src/state/sharedSlice';

const websocketDataHandler = () => {
  setInterval(() => {
    applyDeltasBufferToSnapshot();
    dispatchUpdatedSnapshotToState();
  }, websocketSpecs.uiUpdateInterval);

  const applyDeltasBufferToSnapshot = () => {
    const applyDeltasToSnapshot = (
      snapshotBidsOrAsks: BidsOrAsksMap,
      deltasBufferBidsOrAsks: BidsOrAsks
    ) => {
      for (const [price, size] of deltasBufferBidsOrAsks) {
        size === 0
          ? snapshotBidsOrAsks.delete(price)
          : snapshotBidsOrAsks.set(price, size);
      }
    };
    applyDeltasToSnapshot(snapshot.bids, deltasBuffer.bids);
    applyDeltasToSnapshot(snapshot.asks, deltasBuffer.asks);
  };

  const dispatchUpdatedSnapshotToState = () => {
    const updatedSnapshot = {
      bids: Array.from(snapshot.bids, ([price, size]) => [price, size]).sort(),
      asks: Array.from(snapshot.asks, ([price, size]) => [price, size]).sort(),
    };
    if(isConnected()) store.dispatch(setOrderbookData(updatedSnapshot));
    clearDeltasBuffer();
  };
};

export default websocketDataHandler;
