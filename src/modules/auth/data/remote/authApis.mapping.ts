import type { User } from '~modules/auth/domain/models';

import type {
  AuthRequestResult,
  AuthResponseDto,
  UserDto,
} from './authApis.interfaces';

export const mapUserDtoToUser = (dto: UserDto): User => ({
  id: dto.id,
  email: dto.email,
  name: dto.name,
  avatarUrl: dto.avatarUrl,
  createdAt: dto.createdAt,
  updatedAt: dto.updatedAt,
});

/** Drops the tokens: only the user reaches the presentation layer. */
export const mapAuthResponse = (dto: AuthResponseDto): AuthRequestResult => ({
  user: mapUserDtoToUser(dto.user),
});
