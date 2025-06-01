
import { RouteObject } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";
import { teacherRoutes } from "./teacherRoutes";
import { studentRoutes } from "./studentRoutes";
import { parentRoutes } from "./parentRoutes";

export const routes: RouteObject[] = [
  ...publicRoutes,
  ...teacherRoutes,
  ...studentRoutes,
  ...parentRoutes
];
