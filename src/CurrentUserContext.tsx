import { createContext, useEffect, useState } from "react";
import { user } from "./user";

export const CurrentUserContext = createContext<{} | user>({});

type Props = {
  children: JSX.Element;
};

export const CurrentUserProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<user | {}>({});

  useEffect(() => {
    fetch("/api/me/profile")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCurrentUser(data.profile);
      });
  }, []);

  console.log(currentUser);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
