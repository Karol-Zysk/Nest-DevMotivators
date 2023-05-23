import { AccountContextProvider } from "./context/AccountContext";
import Views from "./views/Views";

function App() {
  return (
    <AccountContextProvider>
      <Views />
    </AccountContextProvider>
  );
}

export default App;
