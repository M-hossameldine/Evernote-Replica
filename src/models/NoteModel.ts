import { v4 as uuid } from 'uuid';

class NoteModel {
  title: string;
  timestamp: Date;
  body: string;
  id: string;

  constructor(title: string, timestamp: Date, body: string) {
    this.title = title.length !== 0 ? title : '';
    this.timestamp = timestamp;
    this.body = body.length !== 0 ? body : '';
    this.id = uuid();
  }
}

export default NoteModel;
