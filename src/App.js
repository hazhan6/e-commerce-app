import Router from "./router/Router";
import { SnackbarProvider } from "notistack";

const App = () => {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={5000}>
      <Router />
    </SnackbarProvider>
  );
};

export default App;
