import type { Note } from '~modules/notes/domain/interfaces';

import type { NoteDto } from './notesApis.interfaces';

export const mapNoteDtoToNote = (dto: NoteDto): Note => ({
  id: dto.id,
  title: dto.title,
  text: dto.text,
  tags: dto.tags,
  status: dto.status,
  createdAt: dto.createdAt,
  updatedAt: dto.updatedAt,
  deletedAt: dto.deletedAt,
});

export const mapNoteDtos = (dtos: NoteDto[]): Note[] =>
  dtos.map(mapNoteDtoToNote);
