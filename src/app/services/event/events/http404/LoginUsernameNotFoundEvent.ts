export class LoginUsernameNotFoundEvent {

  private username;

  constructor(username: string) {
    this.username = username;
  }
}
