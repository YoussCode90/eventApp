import { Outlet } from "react-router-dom";
import Layout from "../pages/Layout";
import { EventProvider } from "./EventContext";
import { Navigation } from "./Navigation";

export const Root = () => (
  <EventProvider>
    <Layout>
      <Navigation />
      <Outlet />
    </Layout>
  </EventProvider>
);
