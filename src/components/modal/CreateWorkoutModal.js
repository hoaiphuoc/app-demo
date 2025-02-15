import useOutsideClick from "@/hooks/useOutsideClick";
import { useRef, useState } from "react";
import styles from "./modal.module.scss";

export const CreateWorkoutModal = ({ handleSubmit, onClose }) => {
  const [formData, setFormData] = useState({ name: "" });
  const refModal = useRef(null);
  useOutsideClick({
    ref: refModal,
    handleClickOutside: () => onClose(),
  });

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      name: value,
    });
  };

  return (
    <div className={styles.cover}>
      <div className={styles.modal} ref={refModal}>
        <div className={styles.headerModal}>
          <h3>Add Workout</h3>
        </div>
        <form onSubmit={(e) => handleSubmit(e, formData.name)}>
          <div className={styles.bodyModal}>
            <div className={styles.inputContainer}>
              <label htmlFor="workoutName">Workout Name</label>
              <input
                id="workoutName"
                placeholder="Enter workout name"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.footerModal}>
            <button className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.addBtn} type="submit">
              Add Workout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
