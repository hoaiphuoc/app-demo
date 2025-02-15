import useOutsideClick from "@/hooks/useOutsideClick";
import { useRef, useState } from "react";
import styles from "./modal.module.scss";

export const CreateExerciseModal = ({ name, handleSubmit, onClose }) => {
  const [formData, setFormData] = useState({ name: "", weight: "", reps: "" });
  const refModal = useRef(null);
  useOutsideClick({
    ref: refModal,
    handleClickOutside: () => onClose(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className={styles.cover}>
      <div className={styles.modal} ref={refModal}>
        <div className={styles.headerModal}>
          <h3>Add Exercise to {name}</h3>
        </div>
        <form onSubmit={(e) => handleSubmit(e, formData)}>
          <div className={styles.bodyModal}>
            <div className={styles.inputContainer}>
              <label htmlFor="exerciseName">Exercise Name</label>
              <input
                id="exerciseName"
                name="name"
                placeholder="Enter exercise name"
                onChange={handleChange}
              />
            </div>
            <div className={styles.group}>
              <div className={styles.inputContainer}>
                <label htmlFor="exerciseWeight">Weight (lb)</label>
                <input
                  id="exerciseWeight"
                  name="weight"
                  type="number"
                  placeholder="Enter weight"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="exerciseReps">Reps</label>
                <input
                  id="exerciseReps"
                  name="reps"
                  type="number"
                  placeholder="Enter reps"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className={styles.footerModal}>
            <button className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.addBtn} type="submit">
              Add Exercise
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
