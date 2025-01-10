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
import Error from "../Pages/Error";
import UpdateTutorial from "../Pages/UpdateTutorial";
import Contact from "../Pages/Contact";

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
        path: '/find-tutors/:category',
        element: <FindTutors />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/contact',
        element: <Contact />,
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
        loader: ({ params }) => fetch(`https://a11server.vercel.app/tutor/${params.details}`),
      },
      {
        path: '/update-tutor/:details',
        element: <PrivateRouter><UpdateTutorial /></PrivateRouter>,
        loader: ({ params }) => fetch(`https://a11server.vercel.app/tutor/${params.details}`),
      },
    ],
    errorElement: <Error />
  },
]);
