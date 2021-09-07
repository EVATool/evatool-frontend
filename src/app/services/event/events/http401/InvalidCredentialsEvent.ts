export class InvalidCredentialsEvent {

  remainingLoginAttempts: number;

  constructor(remainingLoginAttempts: number) {
    this.remainingLoginAttempts = remainingLoginAttempts;
  }
}
