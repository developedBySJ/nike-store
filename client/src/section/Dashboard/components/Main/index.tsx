import React from "react";
import { useStyletron } from "baseui";
import { Avatar } from "baseui/avatar";
import { Block } from "baseui/block";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { StyledLink } from "baseui/link";
import { H4, H5, H6, Paragraph1 } from "baseui/typography";
import { Viewer } from "../../../../lib/types";
import User from "../../../../lib/assets/icons/User.svg";
import { Link } from "react-router-dom";
import { CONFIG } from "./config";

interface IMainProps {
  viewer: Viewer;
}

const Main = ({ viewer }: IMainProps) => {
  const [css, theme] = useStyletron();
  const fullName = `${viewer.firstName} ${viewer.lastName}`;
  return (
    <>
      <Block
        display="flex"
        padding="1.5rem 0"
        className={css({ borderBottom: "1px solid rgb(229 229 299)" })}
      >
        <Avatar name={fullName} size="96px" src={viewer.avatar || undefined} />
        <Block marginLeft="1.5rem">
          <H4>{fullName}</H4>
          <Link to="/logout">
            <StyledLink $as="span">
              <H6 marginTop="0.5rem">Log Out</H6>
            </StyledLink>
          </Link>
        </Block>
      </Block>
      <FlexGrid
        flexGridColumnCount={[1, 1, 2, 3]}
        flexGridColumnGap={"16px"}
        padding="2rem 0"
      >
        {CONFIG.map((e, i) => {
          return (
            <FlexGridItem key={`${e.title}${i}`}>
              <Link to={e.link} className={css({ textDecoration: "none" })}>
                <Block
                  width="calc(100%)"
                  padding={["0.5rem", "1rem", "1.5rem", "2rem"]}
                  display="flex"
                  alignItems="center"
                  className={css({
                    borderRadius: "16px",
                    ":hover": {
                      backgroundColor: "#f4f4f4",
                      transition: "0.2s all ease-in-out",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    },
                  })}
                >
                  <Block>{e.icon}</Block>
                  <Block
                    marginLeft="1.5rem"
                    className={css({
                      textOverflow: "ellipsis",

                      width: "calc(100%)",
                      display: "block",
                      minWidth: 0,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    })}
                  >
                    <H5 color="#464646">{e.title}</H5>
                    <Paragraph1
                      marginTop="0.4rem"
                      className={css({
                        opacity: 0.7,
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      })}
                    >
                      {e.description}
                    </Paragraph1>
                  </Block>
                </Block>
              </Link>
            </FlexGridItem>
          );
        })}
      </FlexGrid>
    </>
  );
};

export { Main };
