  import React, { createContext, useContext, useState } from 'react';

  const SundayLoginContext = createContext();

  export const useSundayLogin = () => useContext(SundayLoginContext);

  export const SundayLoginProvider = ({ children }) => {
    const [sundayLogin, setSundayLogin] = useState();

    return (
      <SundayLoginContext.Provider value={{ sundayLogin, setSundayLogin }}>
        {children}
      </SundayLoginContext.Provider>
    );
  };

const MondayLoginContext = createContext();

export const useMondayLogin = () => useContext(MondayLoginContext);

export const MondayLoginProvider = ({ children }) => {
  const [mondayLogin, setMondayLogin] = useState();

  return (
    <MondayLoginContext.Provider value={{ mondayLogin, setMondayLogin }}>
      {children}
    </MondayLoginContext.Provider>
  );
};

const TuesdayLoginContext = createContext();

export const useTuesdayLogin = () => useContext(TuesdayLoginContext);

export const TuesdayLoginProvider = ({ children }) => {
  const [tuesdayLogin, setTuesdayLogin] = useState();

  return (
    <TuesdayLoginContext.Provider value={{ tuesdayLogin, setTuesdayLogin }}>
      {children}
    </TuesdayLoginContext.Provider>
  );
};

const WednesdayLoginContext = createContext();

export const useWednesdayLogin = () => useContext(WednesdayLoginContext);

export const WednesdayLoginProvider = ({ children }) => {
  const [wednesdayLogin, setWednesdayLogin] = useState();

  return (
    <WednesdayLoginContext.Provider value={{ wednesdayLogin, setWednesdayLogin }}>
      {children}
    </WednesdayLoginContext.Provider>
  );
};

const ThursdayLoginContext = createContext();

export const useThursdayLogin = () => useContext(ThursdayLoginContext);

export const ThursdayLoginProvider = ({ children }) => {
  const [thursdayLogin, setThursdayLogin] = useState();

  return (
    <ThursdayLoginContext.Provider value={{ thursdayLogin, setThursdayLogin }}>
      {children}
    </ThursdayLoginContext.Provider>
  );
};

const FridayLoginContext = createContext();

export const useFridayLogin = () => useContext(FridayLoginContext);

export const FridayLoginProvider = ({ children }) => {
  const [fridayLogin, setFridayLogin] = useState();

  return (
    <FridayLoginContext.Provider value={{ fridayLogin, setFridayLogin }}>
      {children}
    </FridayLoginContext.Provider>
  );
};

const SaturdayLoginContext = createContext();

export const useSaturdayLogin = () => useContext(SaturdayLoginContext);

export const SaturdayLoginProvider = ({ children }) => {
  const [saturdayLogin, setSaturdayLogin] = useState();

  return (
    <SaturdayLoginContext.Provider value={{ saturdayLogin, setSaturdayLogin }}>
      {children}
    </SaturdayLoginContext.Provider>
  );
};
