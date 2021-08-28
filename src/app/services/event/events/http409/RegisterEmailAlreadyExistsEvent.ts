export class RegisterEmailAlreadyExistsEvent {

  email: string;

  constructor(email: string) {
    this.email = email;
  }
}
