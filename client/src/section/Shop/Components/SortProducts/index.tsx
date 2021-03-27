import { Select } from "baseui/select";
import { type } from "os";
import React from "react";
import { useHistory } from "react-router-dom";
import { SortProductBy } from "../../../../lib/graphQl/globaltypes";

type TSortBy = { label: string; id: SortProductBy }[];

const SortProducts = () => {
  const [sortBy, setSortBy] = React.useState<TSortBy | undefined>(undefined);
  const _histroy = useHistory();
  const histroy = React.useRef(_histroy);
  const options = [
    { label: "Featured", id: SortProductBy.FEATURED },
    { label: "Newest", id: SortProductBy.NEWEST },
    { label: "Price: Low-High", id: SortProductBy.PRICE_LOW_TO_HIGH },
    { label: "Price: High-Low", id: SortProductBy.PRICE_HIGH_TO_LOW },
  ];

  React.useEffect(() => {
    if (sortBy?.length) {
      const queryParams = new URLSearchParams(histroy.current.location.search);
      queryParams.set("sortBy", sortBy[0].id);
      histroy.current.push({
        search: queryParams.toString(),
      });
    }
  }, [sortBy]);

  return (
    <Select
      size="default"
      options={options}
      value={sortBy}
      searchable={false}
      placeholder="Sort By"
      clearable={false}
      onChange={(params) => setSortBy(params.value as TSortBy)}
      overrides={{
        Root: {
          style: ({ $theme }) => ({ outline: `none`, borderRadius: "16px" }),
        },
        ControlContainer: {
          style: ({ $theme }) => ({
            outline: `none`,
            border: "none !important",
            backgroundColor: "transperant",
          }),
        },
        Placeholder: { style: { color: "#000" } },
        Dropdown: {
          style: ({ $theme }) => ({
            outline: `none`,
            backgroundColor: "#fff",
            borderRadius: "16px",
            boxShadow: "none",
          }),
        },
      }}
    />
  );
};

export { SortProducts };
