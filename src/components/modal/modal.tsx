import 'src/app/App.css';
import styles from 'src/components/modal/modal.module.css';

export function modal(message: string) {
  return (
    <div className={styles.background}>
      <div className={styles.modal}>{message}</div>
    </div>
  );
}

export default modal;
