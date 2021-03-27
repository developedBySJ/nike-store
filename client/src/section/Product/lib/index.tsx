import { ChevronDown, ChevronUp } from "baseui/icon";

const PanelOverrides = {
  ToggleIcon: {
    component: ({ title }: any) => {
      return title === "Expand" ? (
        <ChevronDown size="1.5rem" />
      ) : (
        <ChevronUp size="1.5rem" />
      );
    },
  },
  Header: {
    style: {
      padding: "1.5rem 0",
      fontSize: "1.1rem",
    },
  },
  Content: {
    style: {
      backgroundColor: "#fff",
    },
  },
};
export { PanelOverrides };
