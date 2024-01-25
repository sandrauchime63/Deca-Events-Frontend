import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./pages/Signup";
import { SignIn } from "./pages/Signin";
import { LandingPage } from "./pages/Landingpage";
import ProfilePage from "./pages/CompleteProfilePage";
import TicketHistory from "./pages/TicketHistory";
import { Redirect } from "./pages/redirect";
import { UpcomingEvents } from "./pages/upcomingevents";
import SingleEvent from "./pages/singleEvent";
import SingleEventOrganizer from "./pages/singleEventOrganizer";
import Reg4Event from "./pages/reg4Event";
import { ChangePassword } from "./pages/changePassword";
import { CreateEventPage } from "./pages/createEvent";
import { HostedEventPage } from "./pages/hostedEvents";
import { AdminDashboard } from "./pages/admin/adminDashboard";
import { UserAccount } from "./pages/accountDetails";
import EarningHistory from "./pages/earnings";
import SingleAdmin from "./pages/admin/adminSingle";

function App() {
  return (
    <>
      <ToastContainer />
      <main>
        <Routes>
          <Route path="/user_account" element={<UserAccount />} />
          <Route path="/create_event" element={<CreateEventPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/redirect/:token" element={<Redirect />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/upcomingevents" element={<UpcomingEvents />} />
          <Route path="/hostedevent" element={<HostedEventPage />} />
          <Route path="/single-event/:eventId" element={<SingleEvent />} />
          <Route path="/single-event-organizer/:eventId" element={<SingleEventOrganizer />} />
          <Route path="/reg4event" element={<Reg4Event />} />
          <Route path="/changepass" element={<ChangePassword />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/ticketHistory" element={<TicketHistory />} />
          <Route path="/earningHistory" element={<EarningHistory />} />
          <Route path="/admin_single/:id" element={<SingleAdmin />} />
        </Routes>
      </main>
      <ToastContainer />
    </>
  );
}

export default App;
