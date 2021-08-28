export class LoginRealmNotFoundEvent {

  private realm;

  constructor(realm: string) {
    this.realm = realm;
  }
}
