import React, {Suspense} from "react";
const MainPage = React.lazy(() => import("pages/mainPage/MainPage"));

const SuspenseMainPage = () => {
  return (
    <Suspense
      fallback={
        <p style={{width: "100%", textAlign: "center"}}>Loading . . .</p>
      }
    >
      <MainPage />
    </Suspense>
  );
};
export default SuspenseMainPage;
