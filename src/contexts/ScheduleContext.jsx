import { createContext, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ScheduleContext = createContext();

export const useSchedule = () => {
  return useContext(ScheduleContext);
};

export function ScheduleProvider({ children }) {
  const [schedules, setSchedules] = useLocalStorage("schedules", []);

  const addReservation = (reservation) => {
    const res = schedules.find(
      (schedule) =>
        schedule.date === reservation.date &&
        reservation.start === schedule.start
    );
    if (!res) {
      setSchedules([...schedules, reservation]);
    }
  };

  const memoedValues = useMemo(
    () => ({
      schedules,
      addReservation,
    }),
    [schedules]
  );

  return (
    <ScheduleContext.Provider value={memoedValues}>
      {children}
    </ScheduleContext.Provider>
  );
}
