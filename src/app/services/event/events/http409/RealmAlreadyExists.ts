export class RealmAlreadyExistsEvent {

  realm: string;

  constructor(realm: string) {
    this.realm = realm;
  }
}
