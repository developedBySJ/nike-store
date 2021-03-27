import React from "react";
import { H5, Label1, Paragraph2, Display2 } from "baseui/typography";
import { Button } from "baseui/button";
import { useStyletron } from "baseui";

import NikeVideo from "../../../../lib/assets/videos/nike.mp4";
import { useHistory } from "react-router-dom";

const HomeFeatured = () => {
  const [css, theme] = useStyletron();
  const productVideo = React.useRef<HTMLVideoElement>(null);
  const histroy = useHistory();
  React.useEffect(() => {
    const ref = productVideo.current;
    if (!ref) {
      return;
    }
    ref.defaultMuted = true;
    ref.muted = true;
  }, []);
  return (
    <>
      <H5 margin="2rem 0" $style={{ fontWeight: "normal" }}>
        Featured
      </H5>
      <figure className={css({ position: "relative" })}>
        <video
          className={css({
            width: "100%",
            height: "80vh",
            minHeight: "400px",
            objectFit: "cover",
          })}
          muted={true}
          loop
          ref={productVideo}
          autoPlay
        >
          <source src={NikeVideo} type="video/mp4" />
        </video>
        <figcaption
          className={css({
            position: "absolute",
            bottom: "0",
            left: "0",
            padding: "0 2rem 2rem 2rem",
            color: theme.colors.white,
          })}
        >
          <Label1 color={theme.colors.white}>Nike LookBook</Label1>
          <Display2
            $style={{
              fontWeight: 900,
              color: theme.colors.white,
              letterSpacing: "-4px",
              fontSize: "clamp(42px,8vw,80px)",
              lineHeight: "100%",
            }}
          >
            BRAVE NEW WORLD
          </Display2>
          <Paragraph2 marginBottom="2rem" color={theme.colors.white}>
            Take on anything the season throws your way in these functional
            styles.
          </Paragraph2>
          <Button
            kind="secondary"
            shape="pill"
            $style={{ padding: "0.75rem 2rem", backgroundColor: "#fff" }}
            onClick={() =>
              histroy.push("/shop/nike-pro-mens-reissue-crew-fleece-66ec")
            }
          >
            Shop
          </Button>
        </figcaption>
      </figure>
    </>
  );
};

export { HomeFeatured };
