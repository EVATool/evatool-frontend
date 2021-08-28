export class LoginRealmNotFoundEvent {

  realm;

  constructor(realm: string) {
    this.realm = realm;
  }
}
