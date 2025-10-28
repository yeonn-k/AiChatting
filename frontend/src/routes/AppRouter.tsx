import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ROUTE_LINK from "./RouterLink";
import Protected from "./Protected";

import SignIn from "@/pages/SignIn/SignIn";
import SignUp from "@/pages/SignUp/SignUp";
import Manage from "@/pages/Manage/Manage";
import ChooseChar from "@/pages/ChooseChar/ChooseChar";
import Chat from "@/pages/Chat/Chat";
import Entry from "@/pages/Entry/Entry";

function AppRouter() {
  const router = createBrowserRouter([
    {
      path: ROUTE_LINK.ENTRYPOINT.path,
      element: <Entry />,
    },
    {
      path: ROUTE_LINK.SIGNUP.path,
      element: <SignUp />,
    },
    {
      path: ROUTE_LINK.SIGNIN.path,
      element: <SignIn />,
    },
    {
      path: ROUTE_LINK.MANAGE.path,
      element: (
        <Protected>
          <Manage />
        </Protected>
      ),
    },
    {
      path: ROUTE_LINK.CHOOSECHAR.path,
      element: (
        <Protected>
          <ChooseChar />
        </Protected>
      ),
    },
    {
      path: ROUTE_LINK.CHAT.path,
      element: (
        <Protected>
          <Chat />
        </Protected>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRouter;
