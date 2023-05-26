import { Route, Routes } from "react-router";
import Main from "../pages/Main/Main";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import PrivateRoutes from "../routes/PrivateRoutes";
import AuthRoutes from "../routes/AuthRoutes";
import Staging from "../pages/Main/Staging";
import PullRequest from "../pages/PullRequest";

const Views = () => {
  return (
    <Routes>
      <Route path="/main" element={<Main />} />
      <Route path="/staging" element={<Staging />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/pullrequest" element={<PullRequest />} />
      </Route>

      <Route element={<AuthRoutes />} path="/">
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="*" element={<Main />} />
      </Route>
    </Routes>
  );
};

export default Views;
