import { Route, Routes } from "react-router";
import Main from "../pages/Main/Main";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import PrivateRoutes from "../routes/PrivateRoutes";
import AuthRoutes from "../routes/AuthRoutes";
import Staging from "../pages/Main/Staging";
import PullRequest from "../pages/PullRequest/PullRequest";
import DevProfile from "../pages/DevProfile/DevProfile";
import MotivatorPage from "../pages/MotivatorPage";
import UsersProfile from "../pages/DevProfile/UsersProfile";
import Waiting from "../pages/Main/Waiting";

const Views = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/main" element={<Main />} />
      <Route path="/main/:page" element={<Main />} />
      <Route path="/staging" element={<Staging />} />
      <Route path="/staging/:page" element={<Staging />} />
      <Route path="/waiting" element={<Waiting />} />
      <Route path="/waiting/:page" element={<Waiting />} />
      <Route path="/motivator/:id" element={<MotivatorPage />} />
      <Route path="/user/:id" element={<UsersProfile />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/pullrequest" element={<PullRequest />} />
        <Route path="/profile" element={<DevProfile />} />
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
