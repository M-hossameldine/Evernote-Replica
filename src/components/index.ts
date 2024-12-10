// Public flow
import AuthForm from "./Auth/AuthForm";
import MainPublicNav from "./navs/MainPublicNav";
import MobileMenu from "./navs/MainPublicNav/MobileMenu";
import DesktopMenu from "./navs/MainPublicNav/DesktopMenu";
import FeatureCarousel from "./Carousels/FeatureCarousel/FeatureCarousel";

import TestimonialCard from "./UI/Card/TestimonialCard/TestimonialCard";

// User flow
import Layout from "./UI/Layout/Layout";
import MainUserSideNav from "./navs/MainUserSideNav";
import SideNavTabs from "./navs/MainUserSideNav/SideNavTabs";
import NoteItem from "./Notes/NoteItem/NoteItem";
import AddNoteWrapper from "./Notes/AddNoteWrapper/AddNoteWrapper";
import AddNewNoteTab from "./navs/MainUserSideNav/AddNewNoteTab";
import NoteEditorHeader from "./Notes/NoteEditor/NoteEditorHeader/NoteEditorHeader";

// Other components
import SimpleFeatureBlock from "./other/FeatureBlock/SimpleFeatureBlock";

// Sections
import HeroSection from "../sections/HeroSection/HeroSection";

export * from "./UI";
export {
  AuthForm,
  MainPublicNav,
  DesktopMenu,
  MobileMenu,
  Layout,
  MainUserSideNav,
  SideNavTabs,
  NoteItem,
  NoteEditorHeader,
  AddNoteWrapper,
  AddNewNoteTab,
  HeroSection,
  SimpleFeatureBlock,
  FeatureCarousel,
  TestimonialCard,
};
