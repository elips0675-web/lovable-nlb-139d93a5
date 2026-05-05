import { createBrowserRouter, Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./page-templates/home";
import ServicesPage from "./page-templates/services-page";
import ServiceDetailPage from "./page-templates/service-detail";
import PrintingServiceDetail from "./page-templates/printing-service-detail";
import PrintingServicesCatalog from "./page-templates/printing-services-catalog";
import AllEventsPage from "./page-templates/all-events";
import EventDetailPage from "./page-templates/event-detail";
import AllNewsPage from "./page-templates/all-news-page";
import NewsDetailPage from "./page-templates/news-detail";
import BooksCatalog from "./page-templates/books-catalog";
import RegistrationPage from "./page-templates/registration";
import ProfilePage from "./page-templates/profile";
import BookDetailPage from "./page-templates/book-detail";
import NotificationsPage from "./page-templates/notifications";
import CafeDetailPage from "./page-templates/cafe-detail";
import KidsZoneDetailPage from "./page-templates/kids-zone-detail";
import LectureHallDetailPage from "./page-templates/lecture-hall-detail";
import ConcertHallDetailPage from "./page-templates/concert-hall-detail";
import PrintingOrderConfirmation from "./page-templates/printing-order-confirmation";
import InteractiveMapPage from "./page-templates/interactive-map";
import MinskMapPage from "./page-templates/minsk-map";
import AdminLayout from "./admin/components/AdminLayout";
import AdminDashboard from "./admin/pages/Dashboard";
import AdminBooks from "./admin/pages/Books";
import AdminEvents from "./admin/pages/Events";
import AdminNews from "./admin/pages/News";
import AdminServices from "./admin/pages/Services";
import AdminUsers from "./admin/pages/Users";
import AdminSettings from "./admin/pages/Settings";

function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        Component: Home,
      },
  {
    path: "/services",
    Component: ServicesPage,
  },
  {
    path: "/services/cafe",
    Component: CafeDetailPage,
  },
  {
    path: "/services/kids-zone",
    Component: KidsZoneDetailPage,
  },
  {
    path: "/services/lecture-hall",
    Component: LectureHallDetailPage,
  },
  {
    path: "/services/concert-hall",
    Component: ConcertHallDetailPage,
  },
  {
    path: "/services/:id",
    Component: ServiceDetailPage,
  },
  {
    path: "/printing-services",
    Component: PrintingServicesCatalog,
  },
  {
    path: "/printing-services/order-confirmation",
    Component: PrintingOrderConfirmation,
  },
  {
    path: "/printing-services/:id",
    Component: PrintingServiceDetail,
  },
  {
    path: "/all-events",
    Component: AllEventsPage,
  },
  {
    path: "/all-events/:id",
    Component: EventDetailPage,
  },
  {
    path: "/all-news",
    Component: AllNewsPage,
  },
  {
    path: "/news/:id",
    Component: NewsDetailPage,
  },
  {
    path: "/books-catalog",
    Component: BooksCatalog,
  },
  {
    path: "/registration",
    Component: RegistrationPage,
  },
  {
    path: "/profile",
    Component: ProfilePage,
  },
  {
    path: "/books/:id",
    Component: BookDetailPage,
  },
  {
    path: "/notifications",
    Component: NotificationsPage,
  },
  {
    path: "/interactive-map",
    Component: InteractiveMapPage,
  },
  {
    path: "/minsk-map",
    Component: MinskMapPage,
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "books", Component: AdminBooks },
      { path: "events", Component: AdminEvents },
      { path: "news", Component: AdminNews },
      { path: "services", Component: AdminServices },
      { path: "users", Component: AdminUsers },
      { path: "settings", Component: AdminSettings },
    ],
  },
    ],
  },
]);