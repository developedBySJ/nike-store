import React from "react";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Button } from "baseui/button";
import { StyledNavigationList } from "baseui/header-navigation";
import ShoppingBag from "../../../../lib/assets/icons/ShoppingBag.svg";
import Heart from "../../../../lib/assets/icons/Heart.svg";
import Search from "../../../../lib/assets/icons/Search.svg";

import { Menu } from "baseui/icon";
import { useHistory } from "react-router-dom";

interface IHeaderIconBtnProps {
  setIsMobMenuOpen: () => void;
  setIsSearchOpen: (isOpen: boolean) => void;
}

const HeaderIconBtn = ({
  setIsMobMenuOpen,
  setIsSearchOpen,
}: IHeaderIconBtnProps) => {
  const histroy = useHistory();
  const [css, theme] = useStyletron();
  return (
    <StyledNavigationList
      style={{ justifyContent: "flex-end", alignItems: "center" }}
    >
      <Button
        shape="circle"
        kind="tertiary"
        size="compact"
        $style={{ margin: "0 0.5rem" }}
        onClick={() => setIsSearchOpen(true)}
      >
        <img src={Search} alt="Search" />
      </Button>
      <Block
        className={css({
          visibility: "visible",
          display: "block",
          "@media screen and (max-width:700px)": {
            visibility: "hidden",
            display: "none",
          },
        })}
      >
        <Button
          shape="circle"
          kind="tertiary"
          size="compact"
          $style={{ margin: "0 0.5rem" }}
          onClick={() => histroy.push("/favourites")}
        >
          <img src={Heart} alt="Favourites" />
        </Button>
      </Block>
      <Button
        shape="circle"
        kind="tertiary"
        size="compact"
        $style={{ margin: "0 0 0 0.5rem" }}
        onClick={() => histroy.push("/cart")}
      >
        <img src={ShoppingBag} alt="Shopping Bag" />
      </Button>
      <Block
        className={css({
          display: "none",
          visibility: "hidden",
          "@media screen and (max-width:700px)": {
            visibility: "visible",
            display: "block",
          },
        })}
      >
        <Button
          shape="circle"
          kind="tertiary"
          size="compact"
          onClick={() => setIsMobMenuOpen()}
          $style={{ margin: "0 0 0 0.5rem" }}
        >
          <Menu size="24px" title="Menu" />
        </Button>
      </Block>
    </StyledNavigationList>
  );
};

export { HeaderIconBtn };
