import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { RouteProtected } from "./components/RouteProtected/RouteProtected";
import { LayoutAdmin } from "./page/Admin/LayoutAdmin";
import { CakeDetail } from "./page/CakeDetail/CakeDetail";
import { Cakes } from "./page/Cakes/Cakes";
import { HomeLayout } from "./page/HomeLayout/HomeLayout";
import { Login } from "./page/Login/Login";
import { TableList } from "./page/TableList/TableList";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Navigate to="/cakes"/>}/>
        <Route path="/cakes" element={<HomeLayout />}>
          <Route index element={<Cakes />} />
          <Route path=":id" element={<CakeDetail/>} />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={
              <RouteProtected>
                <TableList />
              </RouteProtected>
            }
          ></Route>
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
