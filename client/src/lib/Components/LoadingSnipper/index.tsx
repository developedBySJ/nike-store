import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";
import React from "react";

const LoadingSnipper = () => {
  return (
    <Block
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
      minHeight="80vh"
    >
      <Spinner color="#464646" />
    </Block>
  );
};

export { LoadingSnipper };
