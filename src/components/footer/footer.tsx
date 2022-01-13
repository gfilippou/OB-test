import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import {
  getFeed,
  getWebsocketState,
  setErrors,
  setFeed,
} from 'src/state/sharedSlice';
import { websocketSpecs } from 'src/config';
import styles from 'src/components/footer/footer.module.css';
import 'src/app/App.css';

export function Footer() {
  const dispatch = useAppDispatch();

  const currentFeed = useAppSelector(getFeed);
  const currentWebsocketState = useAppSelector(getWebsocketState);

  const disableButton = currentWebsocketState === 'CLOSED' && true;

  const onToggleFeed = () => {
    if (currentWebsocketState === 'OPEN') {
      currentFeed === websocketSpecs.feedSpecs.PI_XBTUSD.product_id
        ? dispatch(setFeed(websocketSpecs.feedSpecs.PI_ETHUSD.product_id))
        : dispatch(setFeed(websocketSpecs.feedSpecs.PI_XBTUSD.product_id));
    } else return;
  };

  const onKillFeed = () => {
    if (currentWebsocketState === 'OPEN') {
      dispatch({ type: 'DISCONNECT_FROM_WEBSOCKET' });
      dispatch({ type: 'FORCE_WEBSOCKET_ERROR' });
    }
    if (currentWebsocketState === 'CLOSED') {
      dispatch({ type: 'CONNECT_TO_WEBSOCKET' });
      dispatch(setErrors(''));
    }
  };

  return (
    <div className={`flex_row ${styles.footer}`}>
      <div className={`flex_row ${styles.section_a}`}>
        <button
          className={`${styles.button} ${styles.toggle}`}
          onClick={onToggleFeed}
          disabled={disableButton}
        >
          Toggle Feed
        </button>
      </div>
      <div className={`flex_row ${styles.section_b}`}>
        <button
          className={`${styles.button} ${styles.kill}`}
          onClick={onKillFeed}
        >
          Kill Feed
        </button>
      </div>
    </div>
  );
}
