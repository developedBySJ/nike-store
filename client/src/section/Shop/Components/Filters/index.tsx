import { Block } from "baseui/block";
import { Button } from "baseui/button";
import { Filter } from "baseui/icon";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "baseui/modal";
import { H5, Paragraph1, Paragraph2 } from "baseui/typography";
import React from "react";
import { Tabs, Tab, ORIENTATION, FILL } from "baseui/tabs-motion";
import { Checkbox } from "baseui/checkbox";
import { Radio, RadioGroup } from "baseui/radio";
import { formatPrice } from "../../../../lib/utils/formatPrice";
import { useHistory, useLocation } from "react-router-dom";

const Filters = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeKey, setActiveKey] = React.useState<React.ReactText>("price");
  const [priceRange, setPriceRange] = React.useState("");
  const [ratings, setRatings] = React.useState("");
  const [category, setCategory] = React.useState("");

  const histroy = useHistory();

  const location = useLocation();

  const filterArr = {
    price: priceRange,
    ratings,
    category,
  };
  const applyFilters = (queryArr: { [key: string]: string }) => {
    const queryParams = new URLSearchParams(histroy.location.search);
    for (const key in filterArr) {
      if (queryArr[key].length > 0) {
        queryParams.set(key, queryArr[key]);
      } else {
        queryParams.delete(key);
      }
    }
    histroy.push({
      search: queryParams.toString(),
    });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        overrides={{
          Dialog: { style: { borderRadius: "1rem" } },
          Root: { style: { zIndex: 2, transition: "0.3s all ease-in-out" } },
        }}
      >
        <ModalHeader>
          <H5>Filter</H5>
        </ModalHeader>
        <ModalBody>
          <Tabs
            activeKey={activeKey}
            onChange={({ activeKey }) => {
              setActiveKey(activeKey);
            }}
            orientation={ORIENTATION.vertical}
            activateOnFocus
          >
            <Tab title={`Price ${priceRange.length ? "(1)" : ""}`} key="price">
              <RadioGroup
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                name="priceRange"
                align={"vertical"}
              >
                <Radio value={`[0,1999]`}>{`${formatPrice(0)} - ${formatPrice(
                  1999
                )}`}</Radio>
                <Radio value={`[1999,3999]`}>{`${formatPrice(
                  1999
                )} - ${formatPrice(3999)}`}</Radio>
                <Radio value={`[3999,6999]`}>{`${formatPrice(
                  3999
                )} - ${formatPrice(6999)}`}</Radio>
                <Radio value={`[6999,10999]`}>{`${formatPrice(
                  6999
                )} - ${formatPrice(10999)}`}</Radio>
                <Radio value={`[10999,99999]`}>{`Over ${formatPrice(
                  10999
                )}`}</Radio>
                <Radio value={``}>{`Clear Filter`}</Radio>
              </RadioGroup>
            </Tab>
            <Tab title={`Rating ${ratings.length ? "(1)" : ""}`} key="rating">
              <RadioGroup
                value={ratings}
                onChange={(e) => setRatings(e.target.value)}
                name="priceRange"
                align={"vertical"}
              >
                <Radio value={`5`}>5&#9733;</Radio>
                <Radio value={`4`}>4&#9733; & above</Radio>
                <Radio value={`3`}>3&#9733; & above</Radio>
                <Radio value={`2`}>2&#9733; & above</Radio>
                <Radio value={`1`}>1&#9733; & above</Radio>
                <Radio value={``}>Clear Filter</Radio>
              </RadioGroup>
            </Tab>
            <Tab
              title={`Category ${category.length ? "(1)" : ""}`}
              key="category"
            >
              <RadioGroup
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <Radio value={`shoes`}>Shoes</Radio>
                <Radio value={`bags`}>Bags</Radio>
                <Radio value={`jersy`}>Jersy</Radio>
                <Radio value={`cap`}>Cap</Radio>
                <Radio value={`clothing`}>Clothing</Radio>
                <Radio value={`accessories`}>Accessories</Radio>
                <Radio value={``}>Clear Filter</Radio>
              </RadioGroup>
            </Tab>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              applyFilters(filterArr);
              setIsOpen(false);
            }}
          >
            Apply
          </Button>
        </ModalFooter>
      </Modal>
      <Block
        display="flex"
        justifyContent="space-between"
        margin="0 4px"
        overrides={{
          Block: {
            props: { onClick: () => setIsOpen(true) },
            style: { cursor: "pointer" },
          },
        }}
      >
        <Paragraph2>Show Filter</Paragraph2>
        <Filter size="24px" />
      </Block>
    </>
  );
};

export default Filters;
