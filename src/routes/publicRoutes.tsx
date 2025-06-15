
import { RouteObject } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Gallery from "@/pages/Gallery";
import NewsEvents from "@/pages/NewsEvents";
import Admission from "@/pages/Admission";
import AdmissionApplication from "@/pages/AdmissionApplication";
import ScheduleVisit from "@/pages/ScheduleVisit";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import AccountActivation from "@/pages/AccountActivation";
import TeacherActivation from "@/pages/TeacherActivation";
import UnpaidFees from "@/pages/student/UnpaidFees";
import InactiveAccount from "@/pages/teacher/InactiveAccount";
import AdminLogin from "@/pages/admin/Login";
import TeacherLogin from "@/pages/teacher/Login";
import StudentLogin from "@/pages/student/Login";
import ParentLogin from "@/pages/parent/Login";
import ForgotPassword from "@/pages/ForgotPassword";
import UpdatePassword from "@/pages/UpdatePassword";

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Index />
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "/gallery",
    element: <Gallery />
  },
  {
    path: "/news-events",
    element: <NewsEvents />
  },
  {
    path: "/admission",
    element: <Admission />
  },
  {
    path: "/admission/apply",
    element: <AdmissionApplication />
  },
  {
    path: "/schedule-visit",
    element: <ScheduleVisit />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/admin/login",
    element: <AdminLogin />
  },
  {
    path: "/teacher/login",
    element: <TeacherLogin />
  },
  {
    path: "/student/login",
    element: <StudentLogin />
  },
  {
    path: "/parent/login",
    element: <ParentLogin />
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  },
  {
    path: "/update-password",
    element: <UpdatePassword />
  },
  {
    path: "/activate/:token",
    element: <AccountActivation />
  },
  {
    path: "/teacher/activate/:token",
    element: <TeacherActivation />
  },
  {
    path: "/unpaid-fees",
    element: <UnpaidFees />
  },
  {
    path: "/inactive-account",
    element: <InactiveAccount />
  },
  {
    path: "*",
    element: <NotFound />
  }
];
