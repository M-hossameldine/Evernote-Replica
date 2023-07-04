import type { IconType } from "react-icons";

export interface FALLBACK_DATA_INTERFACE {
  title: string;
  text: string;
  icon: IconType;
  action?: React.FC;
}
