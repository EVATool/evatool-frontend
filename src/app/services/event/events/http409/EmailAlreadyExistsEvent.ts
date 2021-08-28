export class EmailAlreadyExistsEvent {

  email: string;

  constructor(email: string) {
    this.email = email;
  }
}
