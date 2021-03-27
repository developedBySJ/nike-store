interface TFooterConfig {
  name: string;
  link?: string;
  type?: "Primary" | "Secondary";
}

const footerConfig: TFooterConfig[][] = [
  [
    {
      name: "GIFT CARDS",
      link: "/",
      type: "Primary",
    },
    {
      name: "PROMOTIONS",
      link: "/",
      type: "Primary",
    },
    {
      name: "FIND A STORE",
      link: "/",
      type: "Primary",
    },
    {
      name: "SIGN UP FOR EMAIL",
      link: "/",
      type: "Primary",
    },
    {
      name: "BECOME A MEMBER",
      link: "/",
      type: "Primary",
    },
    {
      name: "NIKE JOURNAL",
      link: "/",
      type: "Primary",
    },
    {
      name: "SEND US FEEDBACK",
      link: "/",
      type: "Primary",
    },
  ],
  [
    {
      name: "GET HELP",
      link: "/",
      type: "Primary",
    },
    {
      name: "Order Status",
      link: "/",
      type: "Secondary",
    },
    {
      name: "Shipping and Delivery",
      link: "/",
      type: "Secondary",
    },
    {
      name: "Returns",
      link: "/",
      type: "Secondary",
    },
    {
      name: "Payment Options",
      link: "/",
      type: "Secondary",
    },
    {
      name: "Gift Card Balance",
      link: "/",
      type: "Secondary",
    },
    {
      name: "Contact Us",
      link: "/",
      type: "Secondary",
    },
  ],
  [
    {
      name: "ABOUT NIKE",
      link: "/",
      type: "Primary",
    },
    {
      name: "News",
      link: "/",
      type: "Secondary",
    },
    {
      name: "Careers",
      link: "/",
      type: "Secondary",
    },
    {
      name: "Investors",
      link: "/",
      type: "Secondary",
    },
    {
      name: "Purpose",
      link: "/",
      type: "Secondary",
    },
    {
      name: "Sustainability",
      link: "/",
      type: "Secondary",
    },

  ],
];

export { footerConfig }