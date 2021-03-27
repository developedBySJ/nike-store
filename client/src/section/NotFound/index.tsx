import { Block } from "baseui/block";
import { H5 } from "baseui/typography";
import React from "react";

const NotFound = () => {
  return (
    <Block
      display="flex"
      minHeight="60vh"
      alignItems="center"
      justifyContent="center"
      width={["100%", "90%", "80%", "60%"]}
      margin="0 auto"
    >
      <H5 $style={{ textAlign: "center" }}>
        We can't find the page you are looking for.
        <br /> Sorry for the inconvenience.
      </H5>
    </Block>
  );
};

export { NotFound as default };
