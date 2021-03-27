import React from "react";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { H5 } from "baseui/typography";
import { useStyletron } from "baseui";
import { Button } from "baseui/button";

import HoodieImg from "../../../../lib/assets/img/hoodie.webp";
import ShoeImg from "../../../../lib/assets/img/shoe.webp";
import { useHistory } from "react-router-dom";

const HomeTrending = () => {
  const [css, theme] = useStyletron();
  const histroy = useHistory();
  return (
    <>
      <H5 margin="2rem 0" $style={{ fontWeight: "normal" }}>
        Trending
      </H5>

      <FlexGrid
        flexGridColumnGap="2vw"
        display="flex"
        gridColumnGap={"1rem"}
        justifyContent="space-between"
      >
        <FlexGridItem width={["100%", "100%", "49%", "49%"]}>
          <figure
            style={{ width: "100%", height: "100%", position: "relative" }}
          >
            <img
              src={HoodieImg}
              alt="hoodie"
              className={css({
                objectFit: "cover",
                objectPosition: "-25% 0",
                width: "100%",
                height: "100%",
                minHeight: "400px",
                maxHeight: "512px",
              })}
            />
            <figcaption
              className={css({
                position: "absolute",
                bottom: "0",
                left: "0",
                padding: "0 0 2rem 2rem",
              })}
            >
              <H5 margin="2rem 0">Sportswear Tech Fleece Crew</H5>
              <Button
                kind="primary"
                shape="pill"
                $style={{ padding: "0.75rem 2rem" }}
                onClick={() =>
                  histroy.push(
                    "/shop/nike-sportswear-tech-fleece-mens-crew-5707"
                  )
                }
              >
                Shop
              </Button>
            </figcaption>
          </figure>
        </FlexGridItem>
        <FlexGridItem width={["100%", "100%", "49%", "49%"]}>
          <figure
            style={{ width: "100%", height: "100%", position: "relative" }}
          >
            <img
              src={ShoeImg}
              alt="hoodie"
              className={css({
                objectFit: "cover",
                width: "100%",
                height: "100%",
                minHeight: "400px",
                maxHeight: "512px",
              })}
            />
            <figcaption
              className={css({
                position: "absolute",
                bottom: "0",
                left: "0",
                padding: "0 0 2rem 2rem",
              })}
            >
              <H5 margin="2rem 0">Shoes Always ₹ 8,000 & under</H5>
              <Button
                kind="primary"
                shape="pill"
                $style={{ padding: "0.75rem 2rem" }}
                onClick={() =>
                  histroy.push(`/shop?category=shoes&price=%5B0%2C8000%5D`)
                }
              >
                Shop
              </Button>
            </figcaption>
          </figure>
        </FlexGridItem>
      </FlexGrid>
    </>
  );
};

export { HomeTrending };
