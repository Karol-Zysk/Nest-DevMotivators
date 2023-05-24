import Layout from "./Layout/Layout";
import { AccountContextProvider } from "./context/AccountContext";
import Views from "./views/Views";

function App() {
  return (
    <AccountContextProvider>
      <Layout>
        <Views />
      </Layout>
    </AccountContextProvider>
  );
}

export default App;
