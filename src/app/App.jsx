import { RouterProvider } from "react-router-dom";
import router from "./Routes";
import RootProvider from "../context/RootProvider";

function App() {
  return (
    <RootProvider>
      <RouterProvider router={router} />
    </RootProvider>
  );
}

export default App;
