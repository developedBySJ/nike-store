interface IConfig {
  icon: JSX.Element;
  title: string;
  link: string;
  description: string;
  onlyAdmin?: boolean;
}
const ADMIN_CONFIG: IConfig[] = [
  {
    title: "Members",
    link: "/admin/members",
    description: "Edit, delete members",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#464646"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-users"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    onlyAdmin: true,
  },
  {
    title: "All Orders",
    link: "/admin/orders",
    description: "Updated orders status, mark as delivered",
    icon: <></>,
    onlyAdmin: true,
  },
  {
    title: "Products",
    link: "/admin/products",
    description: "Create, edit, delete products",
    icon: <></>,
    onlyAdmin: true,
  },
];

const CONFIG: IConfig[] = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="56"
        height="56"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#464646"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ minWidth: "24px" }}
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    ),
    title: "Profile",
    link: "/profile",
    description: "Edit name, password",
  },
  {
    icon: (
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="56px"
        height="56px"
        fill="#464646"
        viewBox="0 0 24 24"
        style={{ minWidth: "24px" }}
      >
        <path d="M21.11 4a6.6 6.6 0 0 0-4.79-1.92A6.27 6.27 0 0 0 12 3.84 6.57 6.57 0 0 0 2.89 4c-2.8 2.68-2.45 7.3.88 10.76l6.84 6.63A2 2 0 0 0 12 22a2 2 0 0 0 1.37-.54l.2-.19.61-.57c.6-.57 1.42-1.37 2.49-2.41l2.44-2.39 1.09-1.07c3.38-3.55 3.8-8.1.91-10.83zm-2.35 9.4l-.25.24-.8.79-2.44 2.39c-1 1-1.84 1.79-2.44 2.36L12 20l-6.83-6.68c-2.56-2.66-2.86-6-.88-7.92a4.52 4.52 0 0 1 6.4 0l.09.08a2.12 2.12 0 0 1 .32.3l.9.94.9-.94.28-.27.11-.09a4.52 4.52 0 0 1 6.43 0c1.97 1.9 1.67 5.25-.96 7.98z"></path>
      </svg>
    ),
    title: "Favourites",
    link: "/favourites",
    description: "Favourites will be saved here.",
  },
  {
    title: "Orders",
    link: "/orders",
    description: "Track, returns or buy again",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="56"
        height="56"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#464646"
        style={{ minWidth: "24px" }}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-package"
      >
        <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    ),
  },
  ...ADMIN_CONFIG,
];

export { CONFIG };
