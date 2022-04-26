import { collection, doc, setDoc, query, where, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { db } from "../utils/firebase";
import { useAuth } from "./AuthContext";

const ScheduleContext = createContext();

export const useSchedule = () => {
  return useContext(ScheduleContext);
};

export function ScheduleProvider({ children }) {
  const { user } = useAuth();
  const [schedules, setSchedules] = useLocalStorage("schedules", []);
  const [error, setError] = useState("");

  useEffect(async () => {
    if (user && schedules.length === 0) {
      const data = [];
      try {
        // const q = query();
        const querySnapshot = await getDocs(collection(db, "LAB-G1"));
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });  
      
        const querySnapshot2 = await getDocs(collection(db, "LAB-G2"));
        querySnapshot2.forEach((doc) => {
          data.push(doc.data());
        });
      
        const querySnapshot3 = await getDocs(collection(db, "LAB-G3"));
        querySnapshot3.forEach((doc) => {
          data.push(doc.data());
        });
      
        const querySnapshot4 = await getDocs(collection(db, "LAB-G4"));
        querySnapshot4.forEach((doc) => {
          data.push(doc.data());
        });

      } catch (error) {
        console.log(error);
      }
      setSchedules(data);
    }
  }, []);
  

  const addReservation = async (reservation) => {
    try {
      await setDoc(
        doc(
          db,
          reservation.lab,
          `${reservation.date}-${
            reservation.start < 10 ? "0" + reservation.start : reservation.start
          }`
        ), reservation
      );
      setSchedules([...schedules, reservation]);
    } catch (e) {
      setError(e);
    }
    
  };

  const memoedValues = useMemo(
    () => ({
      schedules,
      error,
      addReservation,
    }),
    [schedules, error]
  );

  return (
    <ScheduleContext.Provider value={memoedValues}>
      {children}
    </ScheduleContext.Provider>
  );
}
