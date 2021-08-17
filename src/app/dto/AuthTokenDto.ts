export class AuthTokenDto {
  token!: string;
  tokenExpiresIn!: number;

  refreshToken!: string;
  refreshTokenExpiresIn!: number;
}
