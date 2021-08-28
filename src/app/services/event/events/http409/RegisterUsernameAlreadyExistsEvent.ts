export class RegisterUsernameAlreadyExistsEvent {

  username: string;

  constructor(username: string) {
    this.username = username;
  }
}
