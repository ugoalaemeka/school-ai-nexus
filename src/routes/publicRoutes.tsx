
import { RouteObject } from "react-router-dom";
import Index from '@/pages/Index';
import About from '@/pages/About';
import Login from '@/pages/Login';
import Gallery from '@/pages/Gallery';
import Contact from '@/pages/Contact';
import NewsEvents from '@/pages/NewsEvents';
import ScheduleVisit from '@/pages/ScheduleVisit';
import Admission from '@/pages/Admission';
import AdmissionApplication from '@/pages/AdmissionApplication';
import UnpaidFeesPage from '@/pages/student/UnpaidFees';
import AccountActivation from '@/pages/AccountActivation';
import TeacherActivation from '@/pages/TeacherActivation';
import InactiveAccountPage from '@/pages/teacher/InactiveAccount';
import NotFound from '@/pages/NotFound';

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
    path: "/login",
    element: <Login />
  },
  {
    path: "/gallery",
    element: <Gallery />
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "/news-events",
    element: <NewsEvents />
  },
  {
    path: "/schedule-visit",
    element: <ScheduleVisit />
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
    path: "/unpaid-fees",
    element: <UnpaidFeesPage />
  },
  {
    path: "/activate",
    element: <AccountActivation />
  },
  {
    path: "/activate/teacher",
    element: <TeacherActivation />
  },
  {
    path: "/inactive-account",
    element: <InactiveAccountPage />
  },
  {
    path: "*",
    element: <NotFound />
  }
];
