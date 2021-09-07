export class FunctionalErrorCodes {

  // 400 Not found codes.
  public static readonly IMPORT_EXPORT_JSON_INVALID = 400_001;
  public static readonly USERNAME_INVALID = 400_002;
  public static readonly REALM_INVALID = 400_003;
  public static readonly EMAIL_INVALID = 400_004;
  public static readonly PASSWORD_EMPTY_OR_NULL = 400_005;
  public static readonly PASSWORD_NOT_SECURE_ENOUGH = 400_006;

  // 401 Unauthorized codes.
  public static readonly INVALID_CREDENTIALS = 401_001;

  // 403 Forbidden codes.
  public static readonly CROSS_REALM_ACCESS = 403_001;
  public static readonly REMOTE_IP_BLOCKED = 403_002;

  // 404 Not found codes.
  public static readonly LOGIN_REALM_NOT_FOUND = 404_001;
  public static readonly LOGIN_USERNAME_NOT_FOUND = 404_002;

  public static readonly ANALYSIS_FIND_FAILED_NOT_FOUND = 404_101;
  public static readonly STAKEHOLDER_FIND_FAILED_NOT_FOUND = 404_102;
  public static readonly VALUE_FIND_FAILED_NOT_FOUND = 404103;
  public static readonly IMPACT_FIND_FAILED_NOT_FOUND = 404_104;
  public static readonly VARIANT_FIND_FAILED_NOT_FOUND = 404_105;
  public static readonly REQUIREMENT_FIND_FAILED_NOT_FOUND = 404_106;
  public static readonly REQUIREMENT_DELTA_FIND_FAILED_NOT_FOUND = 404_107;

  public static readonly ANALYSIS_UPDATE_FAILED_NOT_FOUND = 404_201;
  public static readonly STAKEHOLDER_UPDATE_FAILED_NOT_FOUND = 404_202;
  public static readonly VALUE_UPDATE_FAILED_NOT_FOUND = 404_203;
  public static readonly IMPACT_UPDATE_FAILED_NOT_FOUND = 404_204;
  public static readonly VARIANT_UPDATE_FAILED_NOT_FOUND = 404_205;
  public static readonly REQUIREMENT_UPDATE_FAILED_NOT_FOUND = 404_206;
  public static readonly REQUIREMENT_DELTA_UPDATE_FAILED_NOT_FOUND = 404_207;

  public static readonly ANALYSIS_DELETION_FAILED_NOT_FOUND = 404_301;
  public static readonly STAKEHOLDER_DELETION_FAILED_NOT_FOUND = 404_302;
  public static readonly VALUE_DELETION_FAILED_NOT_FOUND = 404_303;
  public static readonly IMPACT_DELETION_FAILED_NOT_FOUND = 404_304;
  public static readonly VARIANT_DELETION_FAILED_NOT_FOUND = 404_305;
  public static readonly REQUIREMENT_DELETION_FAILED_NOT_FOUND = 404_306;
  public static readonly REQUIREMENT_DELTA_DELETION_FAILED_NOT_FOUND = 404_307;

  // 409 Conflict codes.
  public static readonly VALUE_REFERENCED_BY_IMPACT = 409_001;
  public static readonly VARIANT_REFERENCED_BY_REQUIREMENT = 409_002;
  public static readonly STAKEHOLDER_REFERENCED_BY_IMPACT = 409_003;
  public static readonly IMPACT_REFERENCED_BY_REQUIREMENT_DELTA = 409_004;
  public static readonly REGISTER_USERNAME_ALREADY_EXISTS = 409_005;
  public static readonly REGISTER_EMAIL_ALREADY_EXISTS = 409_006;
  public static readonly REGISTER_REALM_ALREADY_EXISTS = 409_007;

}
