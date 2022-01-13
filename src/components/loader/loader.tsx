import 'src/app/App.css';
import styles from 'src/components/loader/loader.module.css';

export function Loader() {
  return (
    <div className={styles.loader_wrapper}>
      <div className={`flex_row ${styles.lds_ellipsis}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
