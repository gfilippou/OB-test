import { OrdersFormatter } from 'src/components/orderbook/orderbookDataFormatter';
import { useAppSelector } from 'src/state/hooks';
import {
  getOrderbookData,
  getGrouping,
  getErrors,
} from 'src/state/sharedSlice';
import styles from 'src/components/orderbook/orderbook.module.css';
import 'src/app/App.css';
import Loader from 'src/components/loader/loader';
import modal from 'src/components/modal/modal';
import Spread from '../spread/spread';

export function isWindowSmall(): boolean {
  return window.matchMedia('(max-width: 768px)').matches;
}

export function Orderbook() {
  const orderbookData = useAppSelector(getOrderbookData);
  const grouping = useAppSelector(getGrouping);

  window.onresize = () => isWindowSmall();
  const smallWindow = isWindowSmall();

  const buyOrdersList = OrdersFormatter(orderbookData.bids, grouping);
  const sellOrdersList = smallWindow
    ? OrdersFormatter(orderbookData.asks, grouping)?.reverse()
    : OrdersFormatter(orderbookData.asks, grouping);

  const loading = !buyOrdersList;
  const errors = useAppSelector(getErrors);
  return (
    <div className={`flex_row ${styles.orderbook}`}>
      {loading && <Loader />}
      {errors && modal(errors)}
      <div className={`flex_column ${styles.sides}`}>
        <div className={`flex_row  ${styles.header_buy}`}>
          <div>TOTAL</div>
          <div>SIZE</div>
          <div>PRICE</div>
        </div>
        {buyOrdersList &&
          buyOrdersList.map((order, index) => {
            return (
              <div
                className={`flex_row ${styles.buy_order}`}
                style={{
                  background: `linear-gradient(${
                    smallWindow ? 'to right' : 'to left'
                  }, #113534 ${order.barPercentage}%, transparent 0%)`,
                }}
                key={index}
              >
                <div className={styles.total} data-testid={'b_' + index + '_t'}>
                  {order.total}
                </div>
                <div className={styles.size} data-testid={'b_' + index + '_s'}>
                  {order.size}
                </div>
                <div className={styles.price} data-testid={'b_' + index + '_p'}>
                  {order.price}
                </div>
              </div>
            );
          })}
      </div>
      <div className={`flex_column ${styles.sides}`}>
        <div className={`flex_row  ${styles.header_sell}`}>
          <div>PRICE</div>
          <div>SIZE</div>
          <div>TOTAL</div>
        </div>
        {smallWindow && <Spread />}
        {sellOrdersList &&
          sellOrdersList.map((order, index) => {
            return (
              <div
                className={`flex_row ${styles.sell_order}`}
                style={{
                  background: `linear-gradient(to right, #3d1e28 ${order.barPercentage}%, transparent 0%)`,
                }}
                key={index}
              >
                <div className={styles.price} data-testid={'s_' + index + '_p'}>
                  {order.price}
                </div>
                <div className={styles.size} data-testid={'s_' + index + '_s'}>
                  {order.size}
                </div>
                <div className={styles.total} data-testid={'s_' + index + '_t'}>
                  {order.total}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
