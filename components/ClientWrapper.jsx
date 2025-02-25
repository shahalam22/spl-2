// "use client";
// import { Provider } from "react-redux";
// import { store } from "@/redux/store";
// import Header from "@/components/header/Header";
// import HeaderAuth from "@/components/headerAuth/HeaderAuth";
// import { useAppSelector } from "@/redux/hooks";
// import { useEffect, useState } from "react";

// // Call hooks unconditionally at the top level
// export default function ClientWrapper({ children }) {
//   const [isMounted, setIsMounted] = useState(false); // useState - Hook 1
//   const { user } = useAppSelector((state) => state.auth); // useAppSelector - Hook 2

//   // Use useEffect for side effects only, not for conditional rendering
//   useEffect(() => {
//     setIsMounted(true);
//   }, []); // useEffect - Hook 3

//   // Render conditionally based on isMounted, but hooks are already called
//   if (!isMounted) {
//     return null; // Render nothing on the server to prevent hydration mismatches
//   }

//   return (
//     <Provider store={store}>
//       {user ? <HeaderAuth /> : <Header />}
//       {children}
//     </Provider>
//   );
// }

"use client";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { useEffect, useState } from "react";

export default function ClientWrapper({ children }) {
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}