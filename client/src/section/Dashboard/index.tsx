import { Block } from "baseui/block";
import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { Viewer } from "../../lib/types";
import { Avatar } from "baseui/avatar";
import { H4, H5, H6, Paragraph1 } from "baseui/typography";
import { StyledLink } from "baseui/link";
import { useStyletron } from "baseui";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Main } from "./components/Main";
import { Spinner } from "baseui/spinner";
import { LoadingSnipper } from "../../lib/Components";

interface IDashboardProps {
  viewer: Viewer;
}

const CONFIG = [{}];

const Dashboard = ({ viewer }: IDashboardProps) => {
  const { didRequest, id } = viewer;
  const [css, theme] = useStyletron();
  const histroy = React.useRef(useHistory());
  React.useEffect(() => {
    if (didRequest && !id) {
      histroy.current.push("/login");
    }
  }, [id, didRequest]);

  return (
    <Block
      maxWidth={["100%", "100%", "100%", "1100px"]}
      minHeight="80vh"
      margin="0 auto"
      padding="5rem 0"
    >
      {didRequest ? <Main viewer={viewer} /> : <LoadingSnipper />}
    </Block>
  );
};

export { Dashboard as default };
