import Layout from "./layout/Layout";
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
