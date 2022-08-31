import { createContext, useEffect } from "react";

export const MyContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "loadUser":
      return {
        ...state,
        handle: action.handle,
        avatar: action.avatar
      };

    default:
      break;
  }
};

const MyProvider = () => {
  const [state, dispatch] = useReducer(reducer, null);

  useEffect(() => {
    fetch("kdkjnd")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        dispatch({type:"loadUser",...data})
      });
  });

  return <MyContext.Provider value={{}}></MyContext.Provider>;
};
