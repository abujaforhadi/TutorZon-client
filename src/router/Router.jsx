import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Registration from "../Pages/Registration";
import AddTutorials from "../Pages/AddTutorials";
import PrivateRouter from "./PrivateRouter";
import FindTutors from "../Pages/FindTutors";
import TutorDetails from "../Components/TutorDetails";
import MyBookedTutors from "../Pages/MyBookedTutors";
import MyTutorials from "../Pages/MyTutorials";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/find-tutors',
        element: <FindTutors />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Registration />,
      },
      {
        path: '/add-tutorials',
        element: <PrivateRouter><AddTutorials /></PrivateRouter>,
      },
      {
        path: '/my-tutorials',
        element: <PrivateRouter><MyTutorials /></PrivateRouter>,
      },
      {
        path: '/my-booked-tutors',
        element: <PrivateRouter><MyBookedTutors /></PrivateRouter>,
      },
      {
        path: '/tutor/:details',
        element: <PrivateRouter><TutorDetails /></PrivateRouter>,
        loader: ({ params }) => fetch(`http://localhost:3000/tutor/${params.details}`),
      },
    ],
  },
]);
