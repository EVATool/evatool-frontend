export class RegisterRealmAlreadyExistsEvent {

  realm: string;

  constructor(realm: string) {
    this.realm = realm;
  }
}
