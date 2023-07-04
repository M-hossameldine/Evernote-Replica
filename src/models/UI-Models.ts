import type { IconType } from "react-icons";
import { v4 as uuid } from "uuid";

export class NavTabModel {
  id: string;
  text: string;
  icon: IconType;

  constructor(text: string, icon: IconType) {
    this.id = uuid();
    this.text = text;
    this.icon = icon;
  }
}
