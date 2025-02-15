"use client";

import { CreateExerciseModal } from "@/components/modal/CreateExerciseModal";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { useState } from "react";
import Exercise from "../exercise";
import styles from "./styles.module.scss";

const Workout = ({ id: idWorkout, name, exercises, setData }) => {
  const [showModal, setShowModal] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: idWorkout,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSubmit = (e, formData) => {
    e.preventDefault();
    if (!formData) return;

    const { name, weight, reps } = formData;

    setData((prevData) => {
      return prevData.map((workout) => {
        if (workout.id !== idWorkout) return workout;
        const updatedExercises = [
          ...(workout.exercises || []),
          {
            id: workout.exercises.length,
            name,
            sets: [{ id: 0, weight, reps }],
          },
        ];

        return { ...workout, exercises: updatedExercises };
      });
    });

    setShowModal(false);
  };

  return (
    <>
      <div className={styles.workout} ref={setNodeRef} style={style}>
        <div className={styles.heading}>
          <h3>{name}</h3>
          <div {...attributes} {...listeners}>
            <Image src="/drag.svg" alt="drag icon" width={12} height={3} />
          </div>
        </div>
        <div>
          {exercises.map(({ id, name, sets }) => {
            return <Exercise key={id} id={id} name={name} sets={sets} />;
          })}
        </div>
        <div className={styles.addBtn}>
          <button onClick={() => setShowModal(true)}>
            <Image src="add.svg" alt="add icon" width={12} height={12} />
          </button>
        </div>
      </div>
      {showModal && (
        <CreateExerciseModal
          name={name}
          onClose={() => setShowModal(false)}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default Workout;
