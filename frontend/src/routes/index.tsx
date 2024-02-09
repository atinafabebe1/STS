import { ReactNode } from "react";
import { Route } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import { RouteType } from "./config";

export const generateRoute = (routes: RouteType[], userRole: string): ReactNode => {
  return routes
    .filter((route) => {
      // Check if the route is visible for the current user role
      if (route.visibleOn) {
        console.log(route.visibleOn)
        console.log(route.visibleOn.includes(userRole))
        return route.visibleOn.includes(userRole);
      }
      // If visibleOn is not defined, assume the route is visible
      return true;
    })
    .map((route, index) => (
      route.index ? (
        <Route
          index
          path={route.path}
          element={
            <PageWrapper state={route.state}>
              {route.element}
            </PageWrapper>
          }
          key={index}
        />
      ) : (
        <Route
          path={route.path}
          element={
            <PageWrapper state={route.child ? undefined : route.state}>
              {route.element}
            </PageWrapper>
          }
          key={index}
        >
          {route.child && generateRoute(route.child, userRole)}
        </Route>
      )
    ));
};

export default generateRoute;
