import styles from './Spinner.module.css';

export function Spinner() {
  return <div className={styles.spinner} />;
}

export function CenteredSpinner() {
  return (
    <div className={styles.center}>
      <Spinner />
    </div>
  );
}
