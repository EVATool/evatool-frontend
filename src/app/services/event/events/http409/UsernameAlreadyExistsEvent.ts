export class UsernameAlreadyExistsEvent {

  username: string;

  constructor(username: string) {
    this.username = username;
  }
}
