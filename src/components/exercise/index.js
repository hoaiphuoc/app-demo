import styles from "./styles.module.scss";

const Exercise = ({ name, sets }) => {
  return (
    <div className={styles.exercise}>
      <p className={styles.name}>{name}</p>
      <div className={styles.info}>
        <span>{sets.length}x</span>
        <span>
          {sets
            .map(({ weight, reps }) => {
              return `${weight} lb x ${reps}`;
            })
            .join(", ")}
        </span>
      </div>
    </div>
  );
};

export default Exercise;
