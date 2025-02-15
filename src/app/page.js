"use client";

import DayColumn from "@/components/day-column";
import Workout from "@/components/workout";
import { DAYS_OF_WEEK, SAMPLE_DATA } from "@/constant/sampleData";
import {
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MeasuringStrategy,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react";
import styles from "./page.module.scss";

function Home() {
  const [data, setData] = useState(SAMPLE_DATA);
  const [workoutActive, setworkoutActive] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  const handleDragStart = (event) => {
    const { active } = event;
    const matchedWorkout = data.find(({ id }) => id === active.id);
    setworkoutActive(matchedWorkout);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      console.log("🚀 ~ handleDragOver ~ over.id:", over.id);
      console.log("🚀 ~ handleDragOver ~ active.id :", active.id);
      if (DAYS_OF_WEEK.includes(over.id)) {
        setData((prevData) => {
          const newData = prevData.map((workout) => {
            return active.id == workout.id
              ? { ...workout, day: over.id }
              : workout;
          });
          return newData;
        });
      }
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      if (DAYS_OF_WEEK.includes(over.id)) {
        if (DAYS_OF_WEEK.includes(over.id)) {
          setData((prevData) => {
            const newData = prevData.map((workout) => {
              return active.id == workout.id
                ? { ...workout, day: over.id }
                : workout;
            });
            return newData;
          });
        }
      } else {
        const posNew = data.find(({ id }) => id === over.id).position;
        const posOld = data.find(({ id }) => id === active.id).position;
        setData((prevData) => {
          const newData = prevData.map((workout) => {
            switch (workout.id) {
              case active.id:
                return { ...workout, position: posNew };
              case over.id:
                return { ...workout, position: posOld };
              default:
                return workout;
            }
          });
          return newData;
        });
      }
    }
  };

  return (
    <main className={styles.main}>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        measuring={{
          droppable: {
            strategy: MeasuringStrategy.Always,
          },
        }}
      >
        {DAYS_OF_WEEK.map((day) => (
          <DayColumn
            day={day}
            key={day}
            workoutActive={workoutActive}
            data={data
              .filter(({ day: _day }) => _day === day)
              .sort((a, b) => a.position - b.position)}
            setData={setData}
          />
        ))}
        <DragOverlay
          adjustScale={false}
          dropAnimation={dropAnimation}
          style={{ cursor: "move" }}
        >
          {workoutActive ? (
            <Workout
              id={workoutActive.id}
              name={workoutActive.name}
              exercises={workoutActive.exercises}
              setData={setData}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </main>
  );
}

export default Home;
