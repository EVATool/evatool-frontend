export class FunctionalErrorCodeService {

  // 400 Not found codes.
  public static readonly IMPORT_EXPORT_JSON_INVALID = 1;
  public static readonly USERNAME_INVALID = 2;
  public static readonly REALM_INVALID = 3;
  public static readonly EMAIL_INVALID = 4;
  public static readonly PASSWORD_EMPTY_OR_NULL = 5;
  public static readonly PASSWORD_NOT_SECURE_ENOUGH = 6;

  // 401 Unauthorized codes.
  public static readonly INVALID_CREDENTIALS = 1001;

  // 403 Forbidden codes.
  public static readonly CROSS_REALM_ACCESS = 3001;

  // 404 Not found codes.
  public static readonly ENTITY_NOT_FOUND = 4001;
  public static readonly LOGIN_REALM_NOT_FOUND = 4002;
  public static readonly LOGIN_USERNAME_NOT_FOUND = 4003;

  // 409 Conflict codes.
  public static readonly VALUE_REFERENCED_BY_IMPACT = 9001;
  public static readonly VARIANT_REFERENCED_BY_REQUIREMENT = 9002;
  public static readonly STAKEHOLDER_REFERENCED_BY_IMPACT = 9003;
  public static readonly IMPACT_REFERENCED_BY_REQUIREMENT_DELTA = 9004;
  public static readonly REGISTER_USERNAME_ALREADY_EXISTS = 9005;
  public static readonly REGISTER_EMAIL_ALREADY_EXISTS = 9006;
  public static readonly REGISTER_REALM_ALREADY_EXISTS = 9007;

}
