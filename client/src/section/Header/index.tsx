import React from "react";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from "baseui/header-navigation";
import { useStyletron } from "baseui";
import Logo from "../../lib/assets/icons/Logo.svg";

import { Viewer } from "../../lib/types";
import { Button } from "baseui/button";
import { Label1 } from "baseui/typography";
import { Link } from "react-router-dom";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Block } from "baseui/block";
import { Menu, Search } from "baseui/icon";
import { HeaderIconBtn, MobMenu, ProductSearch, SubHeader } from "./Component";

import { HEADER_CONFIG } from "./lib";

interface IHeaderProps {
  viewer: Viewer;
  setTheme?: (theme: "dark" | "light") => void;
}

const Header = ({ viewer }: IHeaderProps) => {
  const [css, theme] = useStyletron();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  return (
    <>
      <SubHeader viewer={viewer} />
      <ProductSearch isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
      <MobMenu
        viewer={viewer}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <HeaderNavigation
        overrides={{
          Root: {
            style: {
              position: "sticky",
              top: 0,
              zIndex: 1,
              padding: "4px",
              border: "none",
              backgroundColor: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            },
          },
        }}
      >
        <FlexGrid
          flexGridColumnCount={6}
          flexWrap={false}
          flexGridColumnGap={"8px"}
          padding={["6px 0.5rem", "6px 1rem", "6px 1.5rem", "6px 2rem"]}
          width="100%"
          alignItems="center"
        >
          <FlexGridItem
            className={css({
              display: "inline-block",
              "@media screen and (max-width:700px)": {
                flexGrow: 0,
              },
            })}
          >
            <Link to="/">
              <img
                src={Logo}
                alt="Nike Logo"
                height="16px"
                className={css({
                  backgroundImage: `url("${Logo}")`,
                  objectFit: "contain",
                  objectPosition: "center",
                  backgroundRepeat: "no-repeat",
                })}
              />
            </Link>
          </FlexGridItem>
          <FlexGridItem display="none" />
          <FlexGridItem display="none" />
          <FlexGridItem display="none" />
          <FlexGridItem
            className={css({
              width: "300%",
              zIndex: 1,
              "@media screen and (max-width:700px)": {
                display: "none",
              },
            })}
          >
            <StyledNavigationList style={{ justifyContent: "center" }}>
              {HEADER_CONFIG.map((config, i) => {
                return (
                  <Link
                    key={i}
                    to={config.link}
                    className={css({ textDecoration: "none" })}
                  >
                    <StyledNavigationItem>
                      <Label1> {config.title}</Label1>
                    </StyledNavigationItem>
                  </Link>
                );
              })}
            </StyledNavigationList>
          </FlexGridItem>
          <FlexGridItem className={css({ flexGrow: 0 })}>
            <HeaderIconBtn
              setIsMobMenuOpen={() => setIsOpen(true)}
              setIsSearchOpen={() => setIsSearchOpen(true)}
            />
          </FlexGridItem>
        </FlexGrid>
      </HeaderNavigation>
    </>
  );
};

export { Header };
