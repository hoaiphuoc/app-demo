"use client";

import { CreateWorkoutModal } from "@/components/modal/CreateWorkoutModal";
import Workout from "@/components/workout";
import { DAYS_OF_WEEK } from "@/constant/sampleData";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import Image from "next/image";
import { useState } from "react";
import styles from "./styles.module.scss";

function DayColumn({ day, data, setData }) {
  const [showModal, setShowModal] = useState(false);
  const { setNodeRef } = useDroppable({
    id: day,
  });

  const getWeekdayDate = (targetDay) => {
    const weekdays = DAYS_OF_WEEK;
    const today = new Date();
    const currentDayIndex = today.getDay();
    const targetIndex = weekdays.indexOf(targetDay.toUpperCase()) + 1;

    if (targetIndex === -1) return "Invalid Day";

    const daysDifference = targetIndex - currentDayIndex;
    const targetDate = new Date();
    targetDate.setDate(today.getDate() + daysDifference);

    return targetDate.getDate().toString().padStart(2, "0");
  };

  const handleSubmit = (e, value) => {
    e.preventDefault();
    setData((prevData) => {
      const newWorkout = {
        id: prevData.length,
        day,
        name: value,
        exercises: [],
      };
      return [...prevData, newWorkout];
    });
    setShowModal(false);
  };

  const isToday =
    getWeekdayDate(day) === new Date().getDate().toString().padStart(2, "0");

  return (
    <div className={styles.dayColumn}>
      <p>{day}</p>
      <div className={styles.workoutSection} ref={setNodeRef}>
        <div className={styles.top}>
          <span className={`${styles.day} ${isToday ? styles.today : ""}`}>
            {getWeekdayDate(day)}
          </span>
          <button className={styles.addBtn} onClick={() => setShowModal(true)}>
            <Image src="/add.svg" alt="add icon" width={12} height={12} />
          </button>
        </div>
        <div className={styles.content}>
          <SortableContext items={data}>
            {data.map(({ id, name, exercises }) => {
              return (
                <Workout
                  key={id}
                  id={id}
                  name={name}
                  exercises={exercises}
                  setData={setData}
                />
              );
            })}
          </SortableContext>
        </div>
      </div>
      {showModal && (
        <CreateWorkoutModal
          onClose={() => setShowModal(false)}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default DayColumn;
