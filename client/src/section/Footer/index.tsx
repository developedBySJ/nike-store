import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Paragraph3, Paragraph4 } from "baseui/typography";
import React from "react";
import { footerConfig } from "./config";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
const Footer = () => {
  const [css, theme] = useStyletron();

  const footerItems = footerConfig.map((i, index) => (
    <FlexGridItem key={index}>
      {i.map((item, itemIndex) => (
        <Paragraph4
          color={item.type === "Primary" ? "#fff" : "#a0a0a0"}
          marginBottom="8px"
          className={css({
            fontWeight: item.type === "Primary" ? "bolder" : "normal",
          })}
          key={`footer-item-${itemIndex}`}
        >
          {item.name}
        </Paragraph4>
      ))}
    </FlexGridItem>
  ));

  return (
    <footer
      className={css({
        backgroundColor: theme.colors.primary,
        color: theme.colors.white,
        padding: "32px 32px 16px 32px",
      })}
    >
      <FlexGrid
        flexGridColumnCount={[1, 2, 3, 3]}
        width={["100%", "100%", "90%", "40%"]}
      >
        {footerItems}
      </FlexGrid>
      <FlexGrid flexGridColumnCount={[1, 2, 3, 3]}>
        <FlexGridItem>
          <Paragraph4 color="#909090">
            © 2021 Nike, Inc. All Rights Reserved
          </Paragraph4>
        </FlexGridItem>
        <FlexGridItem>
          <Block
            display="flex"
            justifyContent="space-between"
            flexWrap={[true, false, false, false]}
          >
            <Paragraph4 marginLeft="16px" color="#909090">
              Guides
            </Paragraph4>
            <Paragraph4 marginLeft="16px" color="#909090">
              Terms of Sale
            </Paragraph4>
            <Paragraph4 marginLeft="16px" color="#909090">
              Terms of Use
            </Paragraph4>
            <Paragraph4 marginLeft="16px" color="#909090">
              Nike Privacy Policy
            </Paragraph4>
            <Paragraph4 marginLeft="16px" color="#909090">
              CA Supply Chains Act
            </Paragraph4>
          </Block>
        </FlexGridItem>
      </FlexGrid>
    </footer>
  );
};

export { Footer };
