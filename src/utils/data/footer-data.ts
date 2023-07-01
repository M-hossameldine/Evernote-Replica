import { v4 as uuid } from "uuid";
import { ICON_LINK_DATA_INTERFACE, FOOTER_DATA_INTERFACE } from "interfaces";

import {
  FaFacebookF,
  FaTwitter,
  FaMediumM,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "../../assets";

export const FOOTER_DATA: FOOTER_DATA_INTERFACE[] = [
  {
    colId: uuid(),
    colTitle: "Product",
    colFeatures: [
      {
        id: uuid(),
        text: "Why Evernote",
        route: "",
      },
      {
        id: uuid(),
        text: "Evernote Free",
        route: "",
      },
      {
        id: uuid(),
        text: "Evernote Personal",
        route: "",
      },
      {
        id: uuid(),
        text: "Evernote Professional",
        route: "",
      },
      {
        id: uuid(),
        text: "Evernote Teams",
        route: "",
      },
      {
        id: uuid(),
        text: "Compare Plans",
        route: "",
      },
      {
        id: uuid(),
        text: "Student Discount",
        route: "",
      },
      {
        id: uuid(),
        text: "Download App",
        route: "",
      },
    ],
  },
  {
    colId: uuid(),
    colTitle: "Features",
    colFeatures: [
      {
        id: uuid(),
        text: "Web Clipper",
        route: "",
      },
      {
        id: uuid(),
        text: "Templates",
        route: "",
      },
      {
        id: uuid(),
        text: "Spaces",
        route: "",
      },
      {
        id: uuid(),
        text: "ntegrations",
        route: "",
      },
      {
        id: uuid(),
        text: "Notes Sync",
        route: "",
      },
      {
        id: uuid(),
        text: "PDF & Doc Search",
        route: "",
      },
      {
        id: uuid(),
        text: "Search Handwriting",
        route: "",
      },
      {
        id: uuid(),
        text: "Document Scanning",
        route: "",
      },
      {
        id: uuid(),
        text: "Notebooks & Tags",
        route: "",
      },
      {
        id: uuid(),
        text: "Tasks",
        route: "",
      },
      {
        id: uuid(),
        text: "Calendar",
        route: "",
      },
      {
        id: uuid(),
        text: "Home",
        route: "",
      },
      {
        id: uuid(),
        text: "Search",
        route: "",
      },
    ],
  },
  {
    colId: uuid(),
    colTitle: "Resources",
    colFeatures: [
      {
        id: uuid(),
        text: "Resources",
        route: "",
      },
      {
        id: uuid(),
        text: "Make Connections",
        route: "",
      },
      {
        id: uuid(),
        text: "Become an Expert",
        route: "",
      },
      {
        id: uuid(),
        text: "Find an Expert",
        route: "",
      },
      {
        id: uuid(),
        text: "Early Access",
        route: "",
      },
      {
        id: uuid(),
        text: "Affiliates",
        route: "",
      },
      {
        id: uuid(),
        text: "Developers",
        route: "",
      },
      {
        id: uuid(),
        text: "Blog",
        route: "",
      },
    ],
  },
  {
    colId: uuid(),
    colTitle: "Support",
    colFeatures: [
      {
        id: uuid(),
        text: "Help & Learning",
        route: "",
      },
      {
        id: uuid(),
        text: "Troubleshooting",
        route: "",
      },
      {
        id: uuid(),
        text: "Forum",
        route: "",
      },
    ],
  },
  {
    colId: uuid(),
    colTitle: "Company",
    colFeatures: [
      {
        id: uuid(),
        text: "About Us",
        route: "",
      },
      {
        id: uuid(),
        text: "Careers",
        route: "",
      },
      {
        id: uuid(),
        text: "Contact Us",
        route: "",
      },
    ],
  },
];

export const FOOTER_SOCIAL_ICONS_DATA: ICON_LINK_DATA_INTERFACE[] = [
  {
    id: uuid(),
    Icon: FaFacebookF,
    route: "https://web.facebook.com/evernote",
  },
  {
    id: uuid(),
    Icon: FaTwitter,
    route: "https://twitter.com/evernote",
  },
  {
    id: uuid(),
    Icon: FaMediumM,
    route: "https://medium.com/@evernote",
  },
  {
    id: uuid(),
    Icon: FaInstagram,
    route: "https://www.instagram.com/evernote",
  },
  {
    id: uuid(),
    Icon: FaYoutube,
    route: "https://www.youtube.com/channel/UCr_JcNR6slxFcTtDZ8t6F0A",
  },
  {
    id: uuid(),
    Icon: FaLinkedinIn,
    route: "https://www.linkedin.com/company/evernote/",
  },
];

export const FOOTER_LEGAL_DATA: { id: string; text: string; route: string }[] =
  [
    {
      id: uuid(),
      text: "Security",
      route: "",
    },
    {
      id: uuid(),
      text: "Legal",
      route: "",
    },
    {
      id: uuid(),
      text: "Privacy",
      route: "",
    },
  ];
