import { useStyletron } from "baseui";
import { Button } from "baseui/button";
import React from "react";
import { useHistory } from "react-router-dom";
import WhereAllAthletesBelongImg from "../../../../lib/assets/img/where_all_athletes_belong.webp";
import WhereAllAthletesBelongMobImg from "../../../../lib/assets/img/where_all_athletes_belong_mob.webp";

const HomePreFooter = () => {
  const [css, _theme] = useStyletron();
  const histroy = useHistory();
  return (
    <figure className={css({ position: "relative" })}>
      <img
        src={WhereAllAthletesBelongImg}
        alt="where all athlete belong"
        className={css({
          width: "100%",
          height: "90vh",
          minHeight: "500px",
          maxHeight: "700px",
          objectFit: "cover",
          "@media screen and (max-width: 700px)": {
            visibility: "hidden",
            width: 0,
            height: 0,
          },
          visibility: "visible",
        })}
      />
      <img
        src={WhereAllAthletesBelongMobImg}
        alt="where all athlete belong"
        className={css({
          objectFit: "cover",
          objectPosition: "0 0",
          "@media screen and (max-width: 700px)": {
            visibility: "visible",
            width: "100%",
            objectFit: "scale-down",
            height: "60vh",
          },
          width: 0,
          height: 0,
          visibility: "hidden",
        })}
      />
      <figcaption
        className={css({
          width: "100%",
          "@media screen and (min-width: 700px)": {
            position: "absolute",
            left: "50%",
            bottom: "5%",
            transform: "translateX(-50%)",
          },
          margin: "2rem 0",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        })}
      >
        <Button
          kind="primary"
          shape="pill"
          $style={{ padding: "0.75rem 2rem", margin: "0.5rem 1rem" }}
          onClick={() => histroy.push("/register")}
        >
          Join Us
        </Button>
        <Button
          kind="primary"
          shape="pill"
          $style={{ padding: "0.75rem 2rem", margin: "0.5rem 1rem" }}
          onClick={() => histroy.push("/login")}
        >
          Sign In
        </Button>
      </figcaption>
    </figure>
  );
};

export { HomePreFooter };
