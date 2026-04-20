import { Outlet } from "react-router-dom";
import { UserProvider, useUserContext } from "../context/UserContext";
import Layout from "../layout/Layout";
import UserSelect from "../users/UserSelect";
import { EventProvider } from "./EventContext";
import { Navigation } from "./Navigation";

// Toont het loginscherm als er geen gebruiker geselecteerd is
function AppWrapper() {
  const { currentUser } = useUserContext();

  if (!currentUser) return <UserSelect />;

  return (
    <EventProvider>
      <Layout>
        <Navigation />
        <Outlet />
      </Layout>
    </EventProvider>
  );
}

export const Root = () => (
  <UserProvider>
    <AppWrapper />
  </UserProvider>
);
