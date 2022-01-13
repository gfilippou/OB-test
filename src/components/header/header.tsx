import { FormEvent } from 'react';
import { useAppSelector, useAppDispatch } from 'src/state/hooks';
import { setGrouping, getFeed, getWebsocketState } from 'src/state/sharedSlice';
import styles from 'src/components/header/header.module.css';
import 'src/app/App.css';
import { websocketSpecs } from 'src/config';
import Spread from 'src/components/spread/spread';

export function Header() {
  const dispatch = useAppDispatch();
  const currentWebsocketState = useAppSelector(getWebsocketState);
  const disableSelect = currentWebsocketState === 'CLOSED' && true;

  const feedId = useAppSelector(
    getFeed
  ) as keyof typeof websocketSpecs.feedSpecs;
  const feedGroups = websocketSpecs.feedSpecs[feedId].groups;

  const selectOptions = feedGroups.map((option) => {
    return { description: `Group ${option}`, value: option };
  });

  const onGroupChange = (value: number) => {
    dispatch(setGrouping(value));
  };

  return (
    <div>
      <div className={`flex_row ${styles.product}`}>{feedId}</div>
      <div className={`flex_row ${styles.header}`}>
        <div className={`flex_row ${styles.section_a}`}>Order Book</div>
        <div className={`flex_row ${styles.spread_header}`}>
          <div className={styles.spread}>Spread: 99.9 (9.9%)</div>
        </div>
        <div className={`flex_row ${styles.section_c}`}>
          <select
            className={styles.select}
            onChange={(e: FormEvent<HTMLSelectElement>) => {
              const selectedOption =
                selectOptions[e.currentTarget.selectedIndex];
              onGroupChange(selectedOption.value);
            }}
            disabled={disableSelect}
          >
            {selectOptions.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.description}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
}
