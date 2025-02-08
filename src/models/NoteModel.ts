import { v4 as uuid } from "uuid";

class NoteModel {
  title: string;
  createdTimestamp: string;
  updatedTimestamp?: string | null;
  text: string;
  id: string;

  constructor(title: string, createdTimestamp: string, text: string) {
    this.title = title.length !== 0 ? title : "";
    this.createdTimestamp = createdTimestamp;
    this.text = this.text = text.length !== 0 ? text : "";
    this.id = uuid();
    this.updatedTimestamp = null;
  }
}

export default NoteModel;
