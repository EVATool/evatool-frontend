export class LoginUsernameNotFoundEvent {

  username;

  constructor(username: string) {
    this.username = username;
  }
}
