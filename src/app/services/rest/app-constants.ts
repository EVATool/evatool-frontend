export const Constants = {

  realmJson: '{\n' +
    '  "id" : "evatool-realm",\n' +
    '  "realm" : "evatool-realm",\n' +
    '  "notBefore" : 1625063992,\n' +
    '  "defaultSignatureAlgorithm" : "RS256",\n' +
    '  "revokeRefreshToken" : false,\n' +
    '  "refreshTokenMaxReuse" : 0,\n' +
    '  "accessTokenLifespan" : 300,\n' +
    '  "accessTokenLifespanForImplicitFlow" : 900,\n' +
    '  "ssoSessionIdleTimeout" : 1800,\n' +
    '  "ssoSessionMaxLifespan" : 36000,\n' +
    '  "ssoSessionIdleTimeoutRememberMe" : 0,\n' +
    '  "ssoSessionMaxLifespanRememberMe" : 0,\n' +
    '  "offlineSessionIdleTimeout" : 2592000,\n' +
    '  "offlineSessionMaxLifespanEnabled" : false,\n' +
    '  "offlineSessionMaxLifespan" : 5184000,\n' +
    '  "clientSessionIdleTimeout" : 0,\n' +
    '  "clientSessionMaxLifespan" : 0,\n' +
    '  "clientOfflineSessionIdleTimeout" : 0,\n' +
    '  "clientOfflineSessionMaxLifespan" : 0,\n' +
    '  "accessCodeLifespan" : 60,\n' +
    '  "accessCodeLifespanUserAction" : 300,\n' +
    '  "accessCodeLifespanLogin" : 1800,\n' +
    '  "actionTokenGeneratedByAdminLifespan" : 43200,\n' +
    '  "actionTokenGeneratedByUserLifespan" : 300,\n' +
    '  "oauth2DeviceCodeLifespan" : 600,\n' +
    '  "oauth2DevicePollingInterval" : 5,\n' +
    '  "enabled" : true,\n' +
    '  "sslRequired" : "external",\n' +
    '  "registrationAllowed" : false,\n' +
    '  "registrationEmailAsUsername" : false,\n' +
    '  "rememberMe" : false,\n' +
    '  "verifyEmail" : false,\n' +
    '  "loginWithEmailAllowed" : true,\n' +
    '  "duplicateEmailsAllowed" : false,\n' +
    '  "resetPasswordAllowed" : false,\n' +
    '  "editUsernameAllowed" : false,\n' +
    '  "bruteForceProtected" : false,\n' +
    '  "permanentLockout" : false,\n' +
    '  "maxFailureWaitSeconds" : 900,\n' +
    '  "minimumQuickLoginWaitSeconds" : 60,\n' +
    '  "waitIncrementSeconds" : 60,\n' +
    '  "quickLoginCheckMilliSeconds" : 1000,\n' +
    '  "maxDeltaTimeSeconds" : 43200,\n' +
    '  "failureFactor" : 30,\n' +
    '  "roles" : {\n' +
    '    "realm" : [ {\n' +
    '      "id" : "6a41aa70-beb8-4065-87e4-b1182c60443c",\n' +
    '      "name" : "writer",\n' +
    '      "composite" : false,\n' +
    '      "clientRole" : false,\n' +
    '      "containerId" : "evatool-realm",\n' +
    '      "attributes" : { }\n' +
    '    }, {\n' +
    '      "id" : "dc1111e7-c1ee-48df-8873-78b8623d81fe",\n' +
    '      "name" : "default-roles-evatool-realm",\n' +
    '      "description" : "${role_default-roles}",\n' +
    '      "composite" : true,\n' +
    '      "composites" : {\n' +
    '        "realm" : [ "offline_access", "uma_authorization" ],\n' +
    '        "client" : {\n' +
    '          "account" : [ "manage-account", "view-profile" ]\n' +
    '        }\n' +
    '      },\n' +
    '      "clientRole" : false,\n' +
    '      "containerId" : "evatool-realm",\n' +
    '      "attributes" : { }\n' +
    '    }, {\n' +
    '      "id" : "1ca3ecfd-be56-4787-b27c-f97c2e159509",\n' +
    '      "name" : "uma_authorization",\n' +
    '      "description" : "${role_uma_authorization}",\n' +
    '      "composite" : false,\n' +
    '      "clientRole" : false,\n' +
    '      "containerId" : "evatool-realm",\n' +
    '      "attributes" : { }\n' +
    '    }, {\n' +
    '      "id" : "781ccf68-0107-42b5-8e8d-42c4fb48b17d",\n' +
    '      "name" : "reader",\n' +
    '      "composite" : false,\n' +
    '      "clientRole" : false,\n' +
    '      "containerId" : "evatool-realm",\n' +
    '      "attributes" : { }\n' +
    '    }, {\n' +
    '      "id" : "46eba0bc-7ab0-4f75-b9be-fa2631bf5f9c",\n' +
    '      "name" : "offline_access",\n' +
    '      "description" : "${role_offline-access}",\n' +
    '      "composite" : false,\n' +
    '      "clientRole" : false,\n' +
    '      "containerId" : "evatool-realm",\n' +
    '      "attributes" : { }\n' +
    '    } ],\n' +
    '    "client" : {\n' +
    '      "realm-management" : [ {\n' +
    '        "id" : "4179486b-345d-4bfd-b41c-00c991c09022",\n' +
    '        "name" : "query-realms",\n' +
    '        "description" : "${role_query-realms}",\n' +
    '        "composite" : false,\n' +
    '        "clientRole" : true,\n' +
    '        "containerId" : "7efe58ba-853a-49ae-9e30-366e804d5560",\n' +
    '        "attributes" : { }\n' +
    '      }, {\n' +
    '        "id" : "7bd2d12d-9efc-457e-9cc2-ce424d387d12",\n' +
    '        "name" : "view-identity-providers",\n' +
    '        "description" : "${role_view-identity-providers}",\n' +
    '        "composite" : false,\n' +
    '        "clientRole" : true,\n' +
    '        "containerId" : "7efe58ba-853a-49ae-9e30-366e804d5560",\n' +
    '        "attributes" : { }\n' +
    '      }, {\n' +
    '        "id" : "6570151c-ba36-4b00-9719-11a460d99662",\n' +
    '        "name" : "view-users",\n' +
    '        "description" : "${role_view-users}",\n' +
    '        "composite" : true,\n' +
    '        "composites" : {\n' +
    '          "client" : {\n' +
    '            "realm-management" : [ "query-groups", "query-users" ]\n' +
    '          }\n' +
    '        },\n' +
    '        "clientRole" : true,\n' +
    '        "containerId" : "7efe58ba-853a-49ae-9e30-366e804d5560",\n' +
    '        "attributes" : { }\n' +
    '      }, {\n' +
    '        "id" : "8babc995-7695-45f6-88cc-c46c98d38584",\n' +
    '        "name" : "manage-authorization",\n' +
    '        "description" : "${role_manage-authorization}",\n' +
    '        "composite" : false,\n' +
    '        "clientRole" : true,\n' +
    '        "containerId" : "7efe58ba-853a-49ae-9e30-366e804d5560",\n' +
    '        "attributes" : { }\n' +
    '      }, {\n' +
    '        "id" : "4f2a89a7-3520-4d5f-968f-7bc09468646e",\n' +
    '        "name" : "view-authorization",\n' +
    '        "description" : "${role_view-authorization}",\n' +
    '        "composite" : false,\n' +
    '        "clientRole" : true,\n' +
    '        "containerId" : "7efe58ba-853a-49ae-9e30-366e804d5560",\n' +
    '        "attributes" : { }\n' +
    '      }, {\n' +
    '        "id" : "14c41dd3-216a-42fc-a75b-cb214dc74eab",\n' +
    '        "name" : "view-realm",\n' +
    '        "description" : "${role_view-realm}",\n' +
    '        "composite" : false,\n' +
    '        "clientRole" : true,\n' +
    '        "containerId" : "7efe58ba-853a-49ae-9e30-366e804d5560",\n' +
    '        "attributes" : { }\n' +
    '      }, {\n' +
    '        "id" : "f5e5e474-01ae-4ee6-b8a1-e7c59dfd10d5",\n' +
    '        "name" : "query-clients",\n' +
    '        "description" : "${role_query-clients}",\n' +
    '        "composite" : false,\n' +
    '        "clientRole" : true,\n' +
    '        "containerId" : "7efe58ba-853a-49ae-9e30-366e804d5560",\n' +
    '        "attributes" : { }\n' +
    '      }, {\n' +
    '        "id" : "e6467cd8-7451-414f-863d-556b87591d83",\n' +
    '        "name" : "impersonation",\n' +
    '        "description" : "${role_impersonation}",\n' +
    '        "composite" : false,\n' +
    '        "clientRole" : true,\n' +
    '        "containerId" : "7efe58ba-853a-49ae-9e30-366e804d5560",\n' +
    '        "attributes" : { }\n' +
    '      }, {\n' +
    '        "id" : "96433e42-3509-44b4-84c8-c300bfb66e03",\n' +
    '        "name" : "manage-events",\n' +
    '        "description" : "${role_manage-events}",\n' +
    '        "composite" : false,\n' +
    '        "clientRole" : true,\n' +
    '        "containerId" : "7efe58ba-853a-49ae-9e30-366e804d5560",\n' +
    '        "attributes" : { }\n' +
    '      }, {\n' +
    '        "id" : "1ace13e4-6cce-4355-b8f0-4af120ee9203",\n' +
    '        "name" : "create-client",\n' +
    '        "description" : "${role_create-client}",\n' +
    '        "composite" : false,\n' +
    '        "clientRole" : true,\n' +
    '        "containerId" : "7efe58ba-853a-49ae-9e30-366e804d5560",\n' +
    '        "attributes" : { }\n' +
    '      }, {\n' +
    '        "id" : "9f8d3bc9-da0a-41eb-9d12-afa47c26341e",\n' +
    '        "name" : "manage-realm",\n' +
    '        "description" : "${role_manage-realm}",\n' +
    '        "composite" : false,\n' +
    '        "clientRole" : true,\n' +
    '        "containerId" : "7efe58ba-853a-49ae-9e30-366e804d5560",\n' +
    '        "attributes" : { }\n' +
    '      }, {\n' +
    '        "id" : "3916e644-9474-44c2-8fee-84e8371d62ac",\n' +
    '        "name" : "query-users",\n' +
    '        "description" : "${role_query-users}",\n' +
    '        "composite" : false,\n' +
    '        "clientRole" : true,\n' +
    '        "containerId" : "7efe58ba-853a-49ae-9e30-366e804d5560",\n' +
    '        "attributes" : { }\n' +
    '      }, {\n' +
    '        "id" : "21810e65-f22f-4555-9440-4d617f5b068c",\n' +
    '        "name" : "view-events",\n' +
    '        "description" : "${role_view-events}",\n' +
    '        "composite" : false,\n' +
    '        "clientRole" : true,\n' +
    '        "containerId" : "7efe58ba-853a-49ae-9e30-366e804d5560",\n' +
    '        "attributes" : { }\n' +
    '      }, {\n' +
    '        "id" : "b4c796f1-f65f-492b-a5b1-8236af5e3f7f",\n' +
    '        "name" : "manage-clients",\n' +
    '        "description" : "${role_manage-clients}",\n' +
    '        "composite" : false,\n' +
    '        "clientRole" : true,\n' +
    '        "containerId" : "7efe58ba-853a-49ae-9e30-366e804d5560",\n' +
    '        "attributes" : { }\n' +
    '      }, {\n' +
    '        "id" : "d217ab4f-2e00-4923-907c-b64e6165a16f",\n' +
    '        "name" : "manage-users",\n' +
    '        "description" : "${role_manage-users}",\n' +
    '        "composite" : false,\n' +
    '        "clientRole" : true,\n' +
    '        "containerId" : "7efe58ba-853a-49ae-9e30-366e804d5560",\n' +
    '        "attributes" : { }\n' +
    '      }, {\n' +
    '        "id" : "2cb3076c-29f5-408e-bc97-1e69c539d1cb",\n' +
    '        "name" : "query-groups",\n' +
    '        "description" : "${role_query-groups}",\n' +
    '        "composite" : false,\n' +
    '        "clientRole" : true,\n' +
    '        "containerId" : "7efe58ba-853a-49ae-9e30-366e804d5560",\n' +
    '        "attributes" : { }\n' +
    '      }, {\n' +
    '        "id" : "0f19fe7a-1a32-455f-a400-b50edf63d1ce",\n' +
    '        "name" : "realm-admin",\n' +
    '        "description" : "${role_realm-admin}",\n' +
    '        "composite" : true,\n' +
    '        "composites" : {\n' +
    '          "client" : {\n' +
    '            "realm-management" : [ "query-realms", "view-identity-providers", "view-users", "view-realm", "view-authorization", "manage-authorization", "query-clients", "manage-events", "impersonation", "create-client", "manage-realm", "query-users", "view-events", "manage-clients", "manage-users", "query-groups", "view-clients", "manage-identity-providers" ]\n' +
    '          }\n' +
    '        },\n' +
    '        "clientRole" : true,\n' +
    '        "containerId" : "7efe58ba-853a-49ae-9e30-366e804d5560",\n' +
    '        "attributes" : { }\n' +
    '      }, {\n' +
    '        "id" : "ada5f293-63b9-4630-823a-edf92847d7ab",\n' +
    '        "name" : "view-clients",\n' +
    '        "description" : "${role_view-clients}",\n' +
    '        "composite" : true,\n' +
    '        "composites" : {\n' +
    '          "client" : {\n' +
    '            "realm-management" : [ "query-clients" ]\n' +
    '          }\n' +
    '        },\n' +
    '        "clientRole" : true,\n' +
    '        "containerId" : "7efe58ba-853a-49ae-9e30-366e804d5560",\n' +
    '        "attributes" : { }\n' +
    '      }, {\n' +
    '        "id" : "e85b50c5-9dfc-4bc7-a86d-52965a396791",\n' +
    '        "name" : "manage-identity-providers",\n' +
    '        "description" : "${role_manage-identity-providers}",\n' +
    '        "composite" : false,\n' +
    '        "clientRole" : true,\n' +
    '        "containerId" : "7efe58ba-853a-49ae-9e30-366e804d5560",\n' +
    '        "attributes" : { }\n' +
    '      } ],\n' +
    '      "security-admin-console" : [ ],\n' +
    '      "admin-cli" : [ ],\n' +
    '      "account-console" : [ ],\n' +
    '      "broker" : [ {\n' +
    '        "id" : "8c5f8c2c-fccf-46b6-b2cc-e404598adf17",\n' +
    '        "name" : "read-token",\n' +
    '        "description" : "${role_read-token}",\n' +
    '        "composite" : false,\n' +
    '        "clientRole" : true,\n' +
    '        "containerId" : "2bc755b1-6a01-4aac-8bb5-5ba0fac6f30b",\n' +
    '        "attributes" : { }\n' +
    '      } ],\n' +
    '      "evatool-app" : [ ],\n' +
    '      "account" : [ {\n' +
    '        "id" : "dfc81a09-7cec-4bda-b838-ccc2fa48e9e6",\n' +
    '        "name" : "manage-account-links",\n' +
    '        "description" : "${role_manage-account-links}",\n' +
    '        "composite" : false,\n' +
    '        "clientRole" : true,\n' +
    '        "containerId" : "7e1ca18b-624d-4b74-adcd-b65a17905d47",\n' +
    '        "attributes" : { }\n' +
    '      }, {\n' +
    '        "id" : "e08eff29-3590-464f-aa92-27be30877e9e",\n' +
    '        "name" : "manage-consent",\n' +
    '        "description" : "${role_manage-consent}",\n' +
    '        "composite" : true,\n' +
    '        "composites" : {\n' +
    '          "client" : {\n' +
    '            "account" : [ "view-consent" ]\n' +
    '          }\n' +
    '        },\n' +
    '        "clientRole" : true,\n' +
    '        "containerId" : "7e1ca18b-624d-4b74-adcd-b65a17905d47",\n' +
    '        "attributes" : { }\n' +
    '      }, {\n' +
    '        "id" : "c772c35a-bf36-4fb3-b609-315937f8efb4",\n' +
    '        "name" : "view-consent",\n' +
    '        "description" : "${role_view-consent}",\n' +
    '        "composite" : false,\n' +
    '        "clientRole" : true,\n' +
    '        "containerId" : "7e1ca18b-624d-4b74-adcd-b65a17905d47",\n' +
    '        "attributes" : { }\n' +
    '      }, {\n' +
    '        "id" : "6632f75f-40ae-4632-91d2-84caa6115c3e",\n' +
    '        "name" : "view-applications",\n' +
    '        "description" : "${role_view-applications}",\n' +
    '        "composite" : false,\n' +
    '        "clientRole" : true,\n' +
    '        "containerId" : "7e1ca18b-624d-4b74-adcd-b65a17905d47",\n' +
    '        "attributes" : { }\n' +
    '      }, {\n' +
    '        "id" : "e8d19df5-fd31-452f-a7a0-9bc4c3af178d",\n' +
    '        "name" : "manage-account",\n' +
    '        "description" : "${role_manage-account}",\n' +
    '        "composite" : true,\n' +
    '        "composites" : {\n' +
    '          "client" : {\n' +
    '            "account" : [ "manage-account-links" ]\n' +
    '          }\n' +
    '        },\n' +
    '        "clientRole" : true,\n' +
    '        "containerId" : "7e1ca18b-624d-4b74-adcd-b65a17905d47",\n' +
    '        "attributes" : { }\n' +
    '      }, {\n' +
    '        "id" : "708900d8-be52-4114-b013-69680e80e875",\n' +
    '        "name" : "view-profile",\n' +
    '        "description" : "${role_view-profile}",\n' +
    '        "composite" : false,\n' +
    '        "clientRole" : true,\n' +
    '        "containerId" : "7e1ca18b-624d-4b74-adcd-b65a17905d47",\n' +
    '        "attributes" : { }\n' +
    '      }, {\n' +
    '        "id" : "cdc13119-651f-4867-a968-1ed53e5e7578",\n' +
    '        "name" : "delete-account",\n' +
    '        "description" : "${role_delete-account}",\n' +
    '        "composite" : false,\n' +
    '        "clientRole" : true,\n' +
    '        "containerId" : "7e1ca18b-624d-4b74-adcd-b65a17905d47",\n' +
    '        "attributes" : { }\n' +
    '      } ]\n' +
    '    }\n' +
    '  },\n' +
    '  "groups" : [ ],\n' +
    '  "defaultRole" : {\n' +
    '    "id" : "dc1111e7-c1ee-48df-8873-78b8623d81fe",\n' +
    '    "name" : "default-roles-evatool-realm",\n' +
    '    "description" : "${role_default-roles}",\n' +
    '    "composite" : true,\n' +
    '    "clientRole" : false,\n' +
    '    "containerId" : "evatool-realm"\n' +
    '  },\n' +
    '  "requiredCredentials" : [ "password" ],\n' +
    '  "otpPolicyType" : "totp",\n' +
    '  "otpPolicyAlgorithm" : "HmacSHA1",\n' +
    '  "otpPolicyInitialCounter" : 0,\n' +
    '  "otpPolicyDigits" : 6,\n' +
    '  "otpPolicyLookAheadWindow" : 1,\n' +
    '  "otpPolicyPeriod" : 30,\n' +
    '  "otpSupportedApplications" : [ "FreeOTP", "Google Authenticator" ],\n' +
    '  "webAuthnPolicyRpEntityName" : "keycloak",\n' +
    '  "webAuthnPolicySignatureAlgorithms" : [ "ES256" ],\n' +
    '  "webAuthnPolicyRpId" : "",\n' +
    '  "webAuthnPolicyAttestationConveyancePreference" : "not specified",\n' +
    '  "webAuthnPolicyAuthenticatorAttachment" : "not specified",\n' +
    '  "webAuthnPolicyRequireResidentKey" : "not specified",\n' +
    '  "webAuthnPolicyUserVerificationRequirement" : "not specified",\n' +
    '  "webAuthnPolicyCreateTimeout" : 0,\n' +
    '  "webAuthnPolicyAvoidSameAuthenticatorRegister" : false,\n' +
    '  "webAuthnPolicyAcceptableAaguids" : [ ],\n' +
    '  "webAuthnPolicyPasswordlessRpEntityName" : "keycloak",\n' +
    '  "webAuthnPolicyPasswordlessSignatureAlgorithms" : [ "ES256" ],\n' +
    '  "webAuthnPolicyPasswordlessRpId" : "",\n' +
    '  "webAuthnPolicyPasswordlessAttestationConveyancePreference" : "not specified",\n' +
    '  "webAuthnPolicyPasswordlessAuthenticatorAttachment" : "not specified",\n' +
    '  "webAuthnPolicyPasswordlessRequireResidentKey" : "not specified",\n' +
    '  "webAuthnPolicyPasswordlessUserVerificationRequirement" : "not specified",\n' +
    '  "webAuthnPolicyPasswordlessCreateTimeout" : 0,\n' +
    '  "webAuthnPolicyPasswordlessAvoidSameAuthenticatorRegister" : false,\n' +
    '  "webAuthnPolicyPasswordlessAcceptableAaguids" : [ ],\n' +
    '  "clientProfiles" : { },\n' +
    '  "clientPolicies" : { },\n' +
    '  "users" : [ {\n' +
    '    "id" : "d8433c98-4bf3-496a-97b0-3fac10916b52",\n' +
    '    "createdTimestamp" : 1624883323055,\n' +
    '    "username" : "admin",\n' +
    '    "enabled" : true,\n' +
    '    "totp" : false,\n' +
    '    "emailVerified" : false,\n' +
    '    "credentials" : [ {\n' +
    '      "id" : "37224187-7c06-49c0-9473-219d30cd95a2",\n' +
    '      "type" : "password",\n' +
    '      "createdDate" : 1624883602638,\n' +
    '      "secretData" : "{\\"value\\":\\"8dtpq4/jK752/qb1e5TEg8Ogk7uzzJgheopyIfqCax9XFELKSBoIm0pH2uRdzDFFfF3rAOV8mQPM0xxlsDY3gQ==\\",\\"salt\\":\\"mXvPqPvWMs5wwAcSUwj4+w==\\",\\"additionalParameters\\":{}}",\n' +
    '      "credentialData" : "{\\"hashIterations\\":27500,\\"algorithm\\":\\"pbkdf2-sha256\\",\\"additionalParameters\\":{}}"\n' +
    '    } ],\n' +
    '    "disableableCredentialTypes" : [ ],\n' +
    '    "requiredActions" : [ ],\n' +
    '    "realmRoles" : [ "writer", "default-roles-evatool-realm", "reader" ],\n' +
    '    "notBefore" : 1624960218,\n' +
    '    "groups" : [ ]\n' +
    '  }, {\n' +
    '    "id" : "3d908872-aabf-4cb4-815c-051e89ad3577",\n' +
    '    "createdTimestamp" : 1624876116829,\n' +
    '    "username" : "user",\n' +
    '    "enabled" : true,\n' +
    '    "totp" : false,\n' +
    '    "emailVerified" : false,\n' +
    '    "credentials" : [ {\n' +
    '      "id" : "e44c37df-49dd-4d0f-a393-86c942f01672",\n' +
    '      "type" : "password",\n' +
    '      "createdDate" : 1624883588525,\n' +
    '      "secretData" : "{\\"value\\":\\"eCfXHnxBbRfbn6FqaRy0tBzzaOGN1qYwLH/rz1mZQnU0yD2Wpfz9cPjYIvGa+hcx5oI7IjRTv9OaINngouzHZw==\\",\\"salt\\":\\"1ijie6SYbwRLioI8SnTwWQ==\\",\\"additionalParameters\\":{}}",\n' +
    '      "credentialData" : "{\\"hashIterations\\":27500,\\"algorithm\\":\\"pbkdf2-sha256\\",\\"additionalParameters\\":{}}"\n' +
    '    } ],\n' +
    '    "disableableCredentialTypes" : [ ],\n' +
    '    "requiredActions" : [ ],\n' +
    '    "realmRoles" : [ "default-roles-evatool-realm", "reader" ],\n' +
    '    "notBefore" : 0,\n' +
    '    "groups" : [ ]\n' +
    '  } ],\n' +
    '  "scopeMappings" : [ {\n' +
    '    "clientScope" : "offline_access",\n' +
    '    "roles" : [ "offline_access" ]\n' +
    '  } ],\n' +
    '  "clientScopeMappings" : {\n' +
    '    "account" : [ {\n' +
    '      "client" : "account-console",\n' +
    '      "roles" : [ "manage-account" ]\n' +
    '    } ]\n' +
    '  },\n' +
    '  "clients" : [ {\n' +
    '    "id" : "7e1ca18b-624d-4b74-adcd-b65a17905d47",\n' +
    '    "clientId" : "account",\n' +
    '    "name" : "${client_account}",\n' +
    '    "rootUrl" : "${authBaseUrl}",\n' +
    '    "baseUrl" : "/realms/evatool-realm/account/",\n' +
    '    "surrogateAuthRequired" : false,\n' +
    '    "enabled" : true,\n' +
    '    "alwaysDisplayInConsole" : false,\n' +
    '    "clientAuthenticatorType" : "client-secret",\n' +
    '    "redirectUris" : [ "/realms/evatool-realm/account/*" ],\n' +
    '    "webOrigins" : [ ],\n' +
    '    "notBefore" : 0,\n' +
    '    "bearerOnly" : false,\n' +
    '    "consentRequired" : false,\n' +
    '    "standardFlowEnabled" : true,\n' +
    '    "implicitFlowEnabled" : false,\n' +
    '    "directAccessGrantsEnabled" : false,\n' +
    '    "serviceAccountsEnabled" : false,\n' +
    '    "publicClient" : true,\n' +
    '    "frontchannelLogout" : false,\n' +
    '    "protocol" : "openid-connect",\n' +
    '    "attributes" : { },\n' +
    '    "authenticationFlowBindingOverrides" : { },\n' +
    '    "fullScopeAllowed" : false,\n' +
    '    "nodeReRegistrationTimeout" : 0,\n' +
    '    "defaultClientScopes" : [ "web-origins", "profile", "roles", "email" ],\n' +
    '    "optionalClientScopes" : [ "address", "phone", "offline_access", "microprofile-jwt" ]\n' +
    '  }, {\n' +
    '    "id" : "f4962038-ded7-4854-88fa-a7200c31e8b2",\n' +
    '    "clientId" : "account-console",\n' +
    '    "name" : "${client_account-console}",\n' +
    '    "rootUrl" : "${authBaseUrl}",\n' +
    '    "baseUrl" : "/realms/evatool-realm/account/",\n' +
    '    "surrogateAuthRequired" : false,\n' +
    '    "enabled" : true,\n' +
    '    "alwaysDisplayInConsole" : false,\n' +
    '    "clientAuthenticatorType" : "client-secret",\n' +
    '    "redirectUris" : [ "/realms/evatool-realm/account/*" ],\n' +
    '    "webOrigins" : [ ],\n' +
    '    "notBefore" : 0,\n' +
    '    "bearerOnly" : false,\n' +
    '    "consentRequired" : false,\n' +
    '    "standardFlowEnabled" : true,\n' +
    '    "implicitFlowEnabled" : false,\n' +
    '    "directAccessGrantsEnabled" : false,\n' +
    '    "serviceAccountsEnabled" : false,\n' +
    '    "publicClient" : true,\n' +
    '    "frontchannelLogout" : false,\n' +
    '    "protocol" : "openid-connect",\n' +
    '    "attributes" : {\n' +
    '      "pkce.code.challenge.method" : "S256"\n' +
    '    },\n' +
    '    "authenticationFlowBindingOverrides" : { },\n' +
    '    "fullScopeAllowed" : false,\n' +
    '    "nodeReRegistrationTimeout" : 0,\n' +
    '    "protocolMappers" : [ {\n' +
    '      "id" : "e68d8d74-d8fa-44da-b77e-9a63d34ee3d9",\n' +
    '      "name" : "audience resolve",\n' +
    '      "protocol" : "openid-connect",\n' +
    '      "protocolMapper" : "oidc-audience-resolve-mapper",\n' +
    '      "consentRequired" : false,\n' +
    '      "config" : { }\n' +
    '    } ],\n' +
    '    "defaultClientScopes" : [ "web-origins", "profile", "roles", "email" ],\n' +
    '    "optionalClientScopes" : [ "address", "phone", "offline_access", "microprofile-jwt" ]\n' +
    '  }, {\n' +
    '    "id" : "3d3fb280-3cb3-46b8-ac3d-cb868a840c07",\n' +
    '    "clientId" : "admin-cli",\n' +
    '    "name" : "${client_admin-cli}",\n' +
    '    "surrogateAuthRequired" : false,\n' +
    '    "enabled" : true,\n' +
    '    "alwaysDisplayInConsole" : false,\n' +
    '    "clientAuthenticatorType" : "client-secret",\n' +
    '    "redirectUris" : [ ],\n' +
    '    "webOrigins" : [ ],\n' +
    '    "notBefore" : 0,\n' +
    '    "bearerOnly" : false,\n' +
    '    "consentRequired" : false,\n' +
    '    "standardFlowEnabled" : false,\n' +
    '    "implicitFlowEnabled" : false,\n' +
    '    "directAccessGrantsEnabled" : true,\n' +
    '    "serviceAccountsEnabled" : false,\n' +
    '    "publicClient" : true,\n' +
    '    "frontchannelLogout" : false,\n' +
    '    "protocol" : "openid-connect",\n' +
    '    "attributes" : { },\n' +
    '    "authenticationFlowBindingOverrides" : { },\n' +
    '    "fullScopeAllowed" : false,\n' +
    '    "nodeReRegistrationTimeout" : 0,\n' +
    '    "defaultClientScopes" : [ "web-origins", "profile", "roles", "email" ],\n' +
    '    "optionalClientScopes" : [ "address", "phone", "offline_access", "microprofile-jwt" ]\n' +
    '  }, {\n' +
    '    "id" : "2bc755b1-6a01-4aac-8bb5-5ba0fac6f30b",\n' +
    '    "clientId" : "broker",\n' +
    '    "name" : "${client_broker}",\n' +
    '    "surrogateAuthRequired" : false,\n' +
    '    "enabled" : true,\n' +
    '    "alwaysDisplayInConsole" : false,\n' +
    '    "clientAuthenticatorType" : "client-secret",\n' +
    '    "redirectUris" : [ ],\n' +
    '    "webOrigins" : [ ],\n' +
    '    "notBefore" : 0,\n' +
    '    "bearerOnly" : true,\n' +
    '    "consentRequired" : false,\n' +
    '    "standardFlowEnabled" : true,\n' +
    '    "implicitFlowEnabled" : false,\n' +
    '    "directAccessGrantsEnabled" : false,\n' +
    '    "serviceAccountsEnabled" : false,\n' +
    '    "publicClient" : false,\n' +
    '    "frontchannelLogout" : false,\n' +
    '    "protocol" : "openid-connect",\n' +
    '    "attributes" : { },\n' +
    '    "authenticationFlowBindingOverrides" : { },\n' +
    '    "fullScopeAllowed" : false,\n' +
    '    "nodeReRegistrationTimeout" : 0,\n' +
    '    "defaultClientScopes" : [ "web-origins", "profile", "roles", "email" ],\n' +
    '    "optionalClientScopes" : [ "address", "phone", "offline_access", "microprofile-jwt" ]\n' +
    '  }, {\n' +
    '    "id" : "478e7e79-005c-4e33-ae63-4010b16b8a2e",\n' +
    '    "clientId" : "evatool-app",\n' +
    '    "surrogateAuthRequired" : false,\n' +
    '    "enabled" : true,\n' +
    '    "alwaysDisplayInConsole" : false,\n' +
    '    "clientAuthenticatorType" : "client-secret",\n' +
    '    "redirectUris" : [ "*" ],\n' +
    '    "webOrigins" : [ "*" ],\n' +
    '    "notBefore" : 0,\n' +
    '    "bearerOnly" : false,\n' +
    '    "consentRequired" : false,\n' +
    '    "standardFlowEnabled" : true,\n' +
    '    "implicitFlowEnabled" : false,\n' +
    '    "directAccessGrantsEnabled" : true,\n' +
    '    "serviceAccountsEnabled" : false,\n' +
    '    "publicClient" : true,\n' +
    '    "frontchannelLogout" : false,\n' +
    '    "protocol" : "openid-connect",\n' +
    '    "attributes" : {\n' +
    '      "saml.assertion.signature" : "false",\n' +
    '      "saml.force.post.binding" : "false",\n' +
    '      "saml.multivalued.roles" : "false",\n' +
    '      "saml.encrypt" : "false",\n' +
    '      "oauth2.device.authorization.grant.enabled" : "false",\n' +
    '      "backchannel.logout.revoke.offline.tokens" : "false",\n' +
    '      "saml.server.signature" : "false",\n' +
    '      "saml.server.signature.keyinfo.ext" : "false",\n' +
    '      "use.refresh.tokens" : "true",\n' +
    '      "exclude.session.state.from.auth.response" : "false",\n' +
    '      "oidc.ciba.grant.enabled" : "false",\n' +
    '      "saml.artifact.binding" : "false",\n' +
    '      "backchannel.logout.session.required" : "true",\n' +
    '      "client_credentials.use_refresh_token" : "false",\n' +
    '      "saml_force_name_id_format" : "false",\n' +
    '      "saml.client.signature" : "false",\n' +
    '      "tls.client.certificate.bound.access.tokens" : "false",\n' +
    '      "saml.authnstatement" : "false",\n' +
    '      "display.on.consent.screen" : "false",\n' +
    '      "saml.onetimeuse.condition" : "false"\n' +
    '    },\n' +
    '    "authenticationFlowBindingOverrides" : { },\n' +
    '    "fullScopeAllowed" : true,\n' +
    '    "nodeReRegistrationTimeout" : -1,\n' +
    '    "defaultClientScopes" : [ "web-origins", "profile", "roles", "email" ],\n' +
    '    "optionalClientScopes" : [ "address", "phone", "offline_access", "microprofile-jwt" ]\n' +
    '  }, {\n' +
    '    "id" : "7efe58ba-853a-49ae-9e30-366e804d5560",\n' +
    '    "clientId" : "realm-management",\n' +
    '    "name" : "${client_realm-management}",\n' +
    '    "surrogateAuthRequired" : false,\n' +
    '    "enabled" : true,\n' +
    '    "alwaysDisplayInConsole" : false,\n' +
    '    "clientAuthenticatorType" : "client-secret",\n' +
    '    "redirectUris" : [ ],\n' +
    '    "webOrigins" : [ ],\n' +
    '    "notBefore" : 0,\n' +
    '    "bearerOnly" : true,\n' +
    '    "consentRequired" : false,\n' +
    '    "standardFlowEnabled" : true,\n' +
    '    "implicitFlowEnabled" : false,\n' +
    '    "directAccessGrantsEnabled" : false,\n' +
    '    "serviceAccountsEnabled" : false,\n' +
    '    "publicClient" : false,\n' +
    '    "frontchannelLogout" : false,\n' +
    '    "protocol" : "openid-connect",\n' +
    '    "attributes" : { },\n' +
    '    "authenticationFlowBindingOverrides" : { },\n' +
    '    "fullScopeAllowed" : false,\n' +
    '    "nodeReRegistrationTimeout" : 0,\n' +
    '    "defaultClientScopes" : [ "web-origins", "profile", "roles", "email" ],\n' +
    '    "optionalClientScopes" : [ "address", "phone", "offline_access", "microprofile-jwt" ]\n' +
    '  }, {\n' +
    '    "id" : "b65f020e-798a-489f-856a-ba55e402c696",\n' +
    '    "clientId" : "security-admin-console",\n' +
    '    "name" : "${client_security-admin-console}",\n' +
    '    "rootUrl" : "${authAdminUrl}",\n' +
    '    "baseUrl" : "/admin/evatool-realm/console/",\n' +
    '    "surrogateAuthRequired" : false,\n' +
    '    "enabled" : true,\n' +
    '    "alwaysDisplayInConsole" : false,\n' +
    '    "clientAuthenticatorType" : "client-secret",\n' +
    '    "redirectUris" : [ "/admin/evatool-realm/console/*" ],\n' +
    '    "webOrigins" : [ "+" ],\n' +
    '    "notBefore" : 0,\n' +
    '    "bearerOnly" : false,\n' +
    '    "consentRequired" : false,\n' +
    '    "standardFlowEnabled" : true,\n' +
    '    "implicitFlowEnabled" : false,\n' +
    '    "directAccessGrantsEnabled" : false,\n' +
    '    "serviceAccountsEnabled" : false,\n' +
    '    "publicClient" : true,\n' +
    '    "frontchannelLogout" : false,\n' +
    '    "protocol" : "openid-connect",\n' +
    '    "attributes" : {\n' +
    '      "pkce.code.challenge.method" : "S256"\n' +
    '    },\n' +
    '    "authenticationFlowBindingOverrides" : { },\n' +
    '    "fullScopeAllowed" : false,\n' +
    '    "nodeReRegistrationTimeout" : 0,\n' +
    '    "protocolMappers" : [ {\n' +
    '      "id" : "f9374aa0-d4eb-46e7-9397-26d97d764b0d",\n' +
    '      "name" : "locale",\n' +
    '      "protocol" : "openid-connect",\n' +
    '      "protocolMapper" : "oidc-usermodel-attribute-mapper",\n' +
    '      "consentRequired" : false,\n' +
    '      "config" : {\n' +
    '        "userinfo.token.claim" : "true",\n' +
    '        "user.attribute" : "locale",\n' +
    '        "id.token.claim" : "true",\n' +
    '        "access.token.claim" : "true",\n' +
    '        "claim.name" : "locale",\n' +
    '        "jsonType.label" : "String"\n' +
    '      }\n' +
    '    } ],\n' +
    '    "defaultClientScopes" : [ "web-origins", "profile", "roles", "email" ],\n' +
    '    "optionalClientScopes" : [ "address", "phone", "offline_access", "microprofile-jwt" ]\n' +
    '  } ],\n' +
    '  "clientScopes" : [ {\n' +
    '    "id" : "6cd85cc5-d2a6-4b87-a5d6-e6f3135c667a",\n' +
    '    "name" : "phone",\n' +
    '    "description" : "OpenID Connect built-in scope: phone",\n' +
    '    "protocol" : "openid-connect",\n' +
    '    "attributes" : {\n' +
    '      "include.in.token.scope" : "true",\n' +
    '      "display.on.consent.screen" : "true",\n' +
    '      "consent.screen.text" : "${phoneScopeConsentText}"\n' +
    '    },\n' +
    '    "protocolMappers" : [ {\n' +
    '      "id" : "8bf660e4-25d3-4944-a1e5-69cf6aba47b6",\n' +
    '      "name" : "phone number",\n' +
    '      "protocol" : "openid-connect",\n' +
    '      "protocolMapper" : "oidc-usermodel-attribute-mapper",\n' +
    '      "consentRequired" : false,\n' +
    '      "config" : {\n' +
    '        "userinfo.token.claim" : "true",\n' +
    '        "user.attribute" : "phoneNumber",\n' +
    '        "id.token.claim" : "true",\n' +
    '        "access.token.claim" : "true",\n' +
    '        "claim.name" : "phone_number",\n' +
    '        "jsonType.label" : "String"\n' +
    '      }\n' +
    '    }, {\n' +
    '      "id" : "82a1468f-1647-409e-b6b1-9ef246dcdd18",\n' +
    '      "name" : "phone number verified",\n' +
    '      "protocol" : "openid-connect",\n' +
    '      "protocolMapper" : "oidc-usermodel-attribute-mapper",\n' +
    '      "consentRequired" : false,\n' +
    '      "config" : {\n' +
    '        "userinfo.token.claim" : "true",\n' +
    '        "user.attribute" : "phoneNumberVerified",\n' +
    '        "id.token.claim" : "true",\n' +
    '        "access.token.claim" : "true",\n' +
    '        "claim.name" : "phone_number_verified",\n' +
    '        "jsonType.label" : "boolean"\n' +
    '      }\n' +
    '    } ]\n' +
    '  }, {\n' +
    '    "id" : "4149e2e1-aab9-4c31-b349-e6e1c33d2062",\n' +
    '    "name" : "profile",\n' +
    '    "description" : "OpenID Connect built-in scope: profile",\n' +
    '    "protocol" : "openid-connect",\n' +
    '    "attributes" : {\n' +
    '      "include.in.token.scope" : "true",\n' +
    '      "display.on.consent.screen" : "true",\n' +
    '      "consent.screen.text" : "${profileScopeConsentText}"\n' +
    '    },\n' +
    '    "protocolMappers" : [ {\n' +
    '      "id" : "97f69f70-1f9a-47f1-8bb6-c0b2f5c2e490",\n' +
    '      "name" : "website",\n' +
    '      "protocol" : "openid-connect",\n' +
    '      "protocolMapper" : "oidc-usermodel-attribute-mapper",\n' +
    '      "consentRequired" : false,\n' +
    '      "config" : {\n' +
    '        "userinfo.token.claim" : "true",\n' +
    '        "user.attribute" : "website",\n' +
    '        "id.token.claim" : "true",\n' +
    '        "access.token.claim" : "true",\n' +
    '        "claim.name" : "website",\n' +
    '        "jsonType.label" : "String"\n' +
    '      }\n' +
    '    }, {\n' +
    '      "id" : "8dcb4f02-13ed-4617-8ce4-070ee31e1d6c",\n' +
    '      "name" : "profile",\n' +
    '      "protocol" : "openid-connect",\n' +
    '      "protocolMapper" : "oidc-usermodel-attribute-mapper",\n' +
    '      "consentRequired" : false,\n' +
    '      "config" : {\n' +
    '        "userinfo.token.claim" : "true",\n' +
    '        "user.attribute" : "profile",\n' +
    '        "id.token.claim" : "true",\n' +
    '        "access.token.claim" : "true",\n' +
    '        "claim.name" : "profile",\n' +
    '        "jsonType.label" : "String"\n' +
    '      }\n' +
    '    }, {\n' +
    '      "id" : "ea075028-09aa-427b-aaec-d1b89d317417",\n' +
    '      "name" : "username",\n' +
    '      "protocol" : "openid-connect",\n' +
    '      "protocolMapper" : "oidc-usermodel-property-mapper",\n' +
    '      "consentRequired" : false,\n' +
    '      "config" : {\n' +
    '        "userinfo.token.claim" : "true",\n' +
    '        "user.attribute" : "username",\n' +
    '        "id.token.claim" : "true",\n' +
    '        "access.token.claim" : "true",\n' +
    '        "claim.name" : "preferred_username",\n' +
    '        "jsonType.label" : "String"\n' +
    '      }\n' +
    '    }, {\n' +
    '      "id" : "6fae8f96-230f-41c4-88c0-f4cd14095cd8",\n' +
    '      "name" : "birthdate",\n' +
    '      "protocol" : "openid-connect",\n' +
    '      "protocolMapper" : "oidc-usermodel-attribute-mapper",\n' +
    '      "consentRequired" : false,\n' +
    '      "config" : {\n' +
    '        "userinfo.token.claim" : "true",\n' +
    '        "user.attribute" : "birthdate",\n' +
    '        "id.token.claim" : "true",\n' +
    '        "access.token.claim" : "true",\n' +
    '        "claim.name" : "birthdate",\n' +
    '        "jsonType.label" : "String"\n' +
    '      }\n' +
    '    }, {\n' +
    '      "id" : "2b07a03b-8330-4ee5-b9f6-ea8e88199c98",\n' +
    '      "name" : "full name",\n' +
    '      "protocol" : "openid-connect",\n' +
    '      "protocolMapper" : "oidc-full-name-mapper",\n' +
    '      "consentRequired" : false,\n' +
    '      "config" : {\n' +
    '        "id.token.claim" : "true",\n' +
    '        "access.token.claim" : "true",\n' +
    '        "userinfo.token.claim" : "true"\n' +
    '      }\n' +
    '    }, {\n' +
    '      "id" : "697a4b39-90c2-4f5a-893c-84b6edd1f3ac",\n' +
    '      "name" : "zoneinfo",\n' +
    '      "protocol" : "openid-connect",\n' +
    '      "protocolMapper" : "oidc-usermodel-attribute-mapper",\n' +
    '      "consentRequired" : false,\n' +
    '      "config" : {\n' +
    '        "userinfo.token.claim" : "true",\n' +
    '        "user.attribute" : "zoneinfo",\n' +
    '        "id.token.claim" : "true",\n' +
    '        "access.token.claim" : "true",\n' +
    '        "claim.name" : "zoneinfo",\n' +
    '        "jsonType.label" : "String"\n' +
    '      }\n' +
    '    }, {\n' +
    '      "id" : "02afc32b-a833-4d86-9952-702d03b457fb",\n' +
    '      "name" : "updated at",\n' +
    '      "protocol" : "openid-connect",\n' +
    '      "protocolMapper" : "oidc-usermodel-attribute-mapper",\n' +
    '      "consentRequired" : false,\n' +
    '      "config" : {\n' +
    '        "userinfo.token.claim" : "true",\n' +
    '        "user.attribute" : "updatedAt",\n' +
    '        "id.token.claim" : "true",\n' +
    '        "access.token.claim" : "true",\n' +
    '        "claim.name" : "updated_at",\n' +
    '        "jsonType.label" : "String"\n' +
    '      }\n' +
    '    }, {\n' +
    '      "id" : "4f424ff5-510f-4634-8660-259ba948c869",\n' +
    '      "name" : "family name",\n' +
    '      "protocol" : "openid-connect",\n' +
    '      "protocolMapper" : "oidc-usermodel-property-mapper",\n' +
    '      "consentRequired" : false,\n' +
    '      "config" : {\n' +
    '        "userinfo.token.claim" : "true",\n' +
    '        "user.attribute" : "lastName",\n' +
    '        "id.token.claim" : "true",\n' +
    '        "access.token.claim" : "true",\n' +
    '        "claim.name" : "family_name",\n' +
    '        "jsonType.label" : "String"\n' +
    '      }\n' +
    '    }, {\n' +
    '      "id" : "963fb6f8-7ad3-4cf2-bf03-add725b531e6",\n' +
    '      "name" : "gender",\n' +
    '      "protocol" : "openid-connect",\n' +
    '      "protocolMapper" : "oidc-usermodel-attribute-mapper",\n' +
    '      "consentRequired" : false,\n' +
    '      "config" : {\n' +
    '        "userinfo.token.claim" : "true",\n' +
    '        "user.attribute" : "gender",\n' +
    '        "id.token.claim" : "true",\n' +
    '        "access.token.claim" : "true",\n' +
    '        "claim.name" : "gender",\n' +
    '        "jsonType.label" : "String"\n' +
    '      }\n' +
    '    }, {\n' +
    '      "id" : "23952a51-347b-4504-b7cf-4379e50123f1",\n' +
    '      "name" : "locale",\n' +
    '      "protocol" : "openid-connect",\n' +
    '      "protocolMapper" : "oidc-usermodel-attribute-mapper",\n' +
    '      "consentRequired" : false,\n' +
    '      "config" : {\n' +
    '        "userinfo.token.claim" : "true",\n' +
    '        "user.attribute" : "locale",\n' +
    '        "id.token.claim" : "true",\n' +
    '        "access.token.claim" : "true",\n' +
    '        "claim.name" : "locale",\n' +
    '        "jsonType.label" : "String"\n' +
    '      }\n' +
    '    }, {\n' +
    '      "id" : "4a7eac1a-8ba3-4080-a85e-0239a2f5aff6",\n' +
    '      "name" : "nickname",\n' +
    '      "protocol" : "openid-connect",\n' +
    '      "protocolMapper" : "oidc-usermodel-attribute-mapper",\n' +
    '      "consentRequired" : false,\n' +
    '      "config" : {\n' +
    '        "userinfo.token.claim" : "true",\n' +
    '        "user.attribute" : "nickname",\n' +
    '        "id.token.claim" : "true",\n' +
    '        "access.token.claim" : "true",\n' +
    '        "claim.name" : "nickname",\n' +
    '        "jsonType.label" : "String"\n' +
    '      }\n' +
    '    }, {\n' +
    '      "id" : "5f62d907-79ac-4a8f-a959-61a56fe4ee7a",\n' +
    '      "name" : "picture",\n' +
    '      "protocol" : "openid-connect",\n' +
    '      "protocolMapper" : "oidc-usermodel-attribute-mapper",\n' +
    '      "consentRequired" : false,\n' +
    '      "config" : {\n' +
    '        "userinfo.token.claim" : "true",\n' +
    '        "user.attribute" : "picture",\n' +
    '        "id.token.claim" : "true",\n' +
    '        "access.token.claim" : "true",\n' +
    '        "claim.name" : "picture",\n' +
    '        "jsonType.label" : "String"\n' +
    '      }\n' +
    '    }, {\n' +
    '      "id" : "2c0708a4-ecf0-4797-8c45-57085347d3c0",\n' +
    '      "name" : "given name",\n' +
    '      "protocol" : "openid-connect",\n' +
    '      "protocolMapper" : "oidc-usermodel-property-mapper",\n' +
    '      "consentRequired" : false,\n' +
    '      "config" : {\n' +
    '        "userinfo.token.claim" : "true",\n' +
    '        "user.attribute" : "firstName",\n' +
    '        "id.token.claim" : "true",\n' +
    '        "access.token.claim" : "true",\n' +
    '        "claim.name" : "given_name",\n' +
    '        "jsonType.label" : "String"\n' +
    '      }\n' +
    '    }, {\n' +
    '      "id" : "88d8f04c-3d62-4ba7-b52d-cdf78b09b63e",\n' +
    '      "name" : "middle name",\n' +
    '      "protocol" : "openid-connect",\n' +
    '      "protocolMapper" : "oidc-usermodel-attribute-mapper",\n' +
    '      "consentRequired" : false,\n' +
    '      "config" : {\n' +
    '        "userinfo.token.claim" : "true",\n' +
    '        "user.attribute" : "middleName",\n' +
    '        "id.token.claim" : "true",\n' +
    '        "access.token.claim" : "true",\n' +
    '        "claim.name" : "middle_name",\n' +
    '        "jsonType.label" : "String"\n' +
    '      }\n' +
    '    } ]\n' +
    '  }, {\n' +
    '    "id" : "a99e6d05-a966-4a2f-87bf-c781119023c3",\n' +
    '    "name" : "role_list",\n' +
    '    "description" : "SAML role list",\n' +
    '    "protocol" : "saml",\n' +
    '    "attributes" : {\n' +
    '      "consent.screen.text" : "${samlRoleListScopeConsentText}",\n' +
    '      "display.on.consent.screen" : "true"\n' +
    '    },\n' +
    '    "protocolMappers" : [ {\n' +
    '      "id" : "cc6aa3d0-2b5b-4d97-b694-9f22f8c18bdb",\n' +
    '      "name" : "role list",\n' +
    '      "protocol" : "saml",\n' +
    '      "protocolMapper" : "saml-role-list-mapper",\n' +
    '      "consentRequired" : false,\n' +
    '      "config" : {\n' +
    '        "single" : "false",\n' +
    '        "attribute.nameformat" : "Basic",\n' +
    '        "attribute.name" : "Role"\n' +
    '      }\n' +
    '    } ]\n' +
    '  }, {\n' +
    '    "id" : "eba4d815-8b39-40f3-8858-819a851d09eb",\n' +
    '    "name" : "address",\n' +
    '    "description" : "OpenID Connect built-in scope: address",\n' +
    '    "protocol" : "openid-connect",\n' +
    '    "attributes" : {\n' +
    '      "include.in.token.scope" : "true",\n' +
    '      "display.on.consent.screen" : "true",\n' +
    '      "consent.screen.text" : "${addressScopeConsentText}"\n' +
    '    },\n' +
    '    "protocolMappers" : [ {\n' +
    '      "id" : "f5c8a606-478a-4cf4-bed9-bed8d54624a2",\n' +
    '      "name" : "address",\n' +
    '      "protocol" : "openid-connect",\n' +
    '      "protocolMapper" : "oidc-address-mapper",\n' +
    '      "consentRequired" : false,\n' +
    '      "config" : {\n' +
    '        "user.attribute.formatted" : "formatted",\n' +
    '        "user.attribute.country" : "country",\n' +
    '        "user.attribute.postal_code" : "postal_code",\n' +
    '        "userinfo.token.claim" : "true",\n' +
    '        "user.attribute.street" : "street",\n' +
    '        "id.token.claim" : "true",\n' +
    '        "user.attribute.region" : "region",\n' +
    '        "access.token.claim" : "true",\n' +
    '        "user.attribute.locality" : "locality"\n' +
    '      }\n' +
    '    } ]\n' +
    '  }, {\n' +
    '    "id" : "b7523977-f095-4ae6-ab34-b520fd786648",\n' +
    '    "name" : "web-origins",\n' +
    '    "description" : "OpenID Connect scope for add allowed web origins to the access token",\n' +
    '    "protocol" : "openid-connect",\n' +
    '    "attributes" : {\n' +
    '      "include.in.token.scope" : "false",\n' +
    '      "display.on.consent.screen" : "false",\n' +
    '      "consent.screen.text" : ""\n' +
    '    },\n' +
    '    "protocolMappers" : [ {\n' +
    '      "id" : "fcbdcfb7-1e2f-4e09-ada7-f6434f1a066e",\n' +
    '      "name" : "allowed web origins",\n' +
    '      "protocol" : "openid-connect",\n' +
    '      "protocolMapper" : "oidc-allowed-origins-mapper",\n' +
    '      "consentRequired" : false,\n' +
    '      "config" : { }\n' +
    '    } ]\n' +
    '  }, {\n' +
    '    "id" : "c673dab1-d934-4a73-ab82-77a9ee1368b1",\n' +
    '    "name" : "roles",\n' +
    '    "description" : "OpenID Connect scope for add user roles to the access token",\n' +
    '    "protocol" : "openid-connect",\n' +
    '    "attributes" : {\n' +
    '      "include.in.token.scope" : "false",\n' +
    '      "display.on.consent.screen" : "true",\n' +
    '      "consent.screen.text" : "${rolesScopeConsentText}"\n' +
    '    },\n' +
    '    "protocolMappers" : [ {\n' +
    '      "id" : "ab9b3c51-8cc6-4a1a-b558-f704c915c9d0",\n' +
    '      "name" : "audience resolve",\n' +
    '      "protocol" : "openid-connect",\n' +
    '      "protocolMapper" : "oidc-audience-resolve-mapper",\n' +
    '      "consentRequired" : false,\n' +
    '      "config" : { }\n' +
    '    }, {\n' +
    '      "id" : "d80e1a7a-7a7a-4097-b39c-768b30d68b34",\n' +
    '      "name" : "client roles",\n' +
    '      "protocol" : "openid-connect",\n' +
    '      "protocolMapper" : "oidc-usermodel-client-role-mapper",\n' +
    '      "consentRequired" : false,\n' +
    '      "config" : {\n' +
    '        "user.attribute" : "foo",\n' +
    '        "access.token.claim" : "true",\n' +
    '        "claim.name" : "resource_access.${client_id}.roles",\n' +
    '        "jsonType.label" : "String",\n' +
    '        "multivalued" : "true"\n' +
    '      }\n' +
    '    }, {\n' +
    '      "id" : "a796ba18-2d10-4578-a78b-901dd9847c9f",\n' +
    '      "name" : "realm roles",\n' +
    '      "protocol" : "openid-connect",\n' +
    '      "protocolMapper" : "oidc-usermodel-realm-role-mapper",\n' +
    '      "consentRequired" : false,\n' +
    '      "config" : {\n' +
    '        "user.attribute" : "foo",\n' +
    '        "access.token.claim" : "true",\n' +
    '        "claim.name" : "realm_access.roles",\n' +
    '        "jsonType.label" : "String",\n' +
    '        "multivalued" : "true"\n' +
    '      }\n' +
    '    } ]\n' +
    '  }, {\n' +
    '    "id" : "bcbb456f-cfa8-4684-94ae-498b12948372",\n' +
    '    "name" : "microprofile-jwt",\n' +
    '    "description" : "Microprofile - JWT built-in scope",\n' +
    '    "protocol" : "openid-connect",\n' +
    '    "attributes" : {\n' +
    '      "include.in.token.scope" : "true",\n' +
    '      "display.on.consent.screen" : "false"\n' +
    '    },\n' +
    '    "protocolMappers" : [ {\n' +
    '      "id" : "4256f80b-e4ea-431f-b7ad-ae9332517307",\n' +
    '      "name" : "groups",\n' +
    '      "protocol" : "openid-connect",\n' +
    '      "protocolMapper" : "oidc-usermodel-realm-role-mapper",\n' +
    '      "consentRequired" : false,\n' +
    '      "config" : {\n' +
    '        "multivalued" : "true",\n' +
    '        "user.attribute" : "foo",\n' +
    '        "id.token.claim" : "true",\n' +
    '        "access.token.claim" : "true",\n' +
    '        "claim.name" : "groups",\n' +
    '        "jsonType.label" : "String"\n' +
    '      }\n' +
    '    }, {\n' +
    '      "id" : "08e17691-e3df-449d-b8b2-af92eca0f619",\n' +
    '      "name" : "upn",\n' +
    '      "protocol" : "openid-connect",\n' +
    '      "protocolMapper" : "oidc-usermodel-property-mapper",\n' +
    '      "consentRequired" : false,\n' +
    '      "config" : {\n' +
    '        "userinfo.token.claim" : "true",\n' +
    '        "user.attribute" : "username",\n' +
    '        "id.token.claim" : "true",\n' +
    '        "access.token.claim" : "true",\n' +
    '        "claim.name" : "upn",\n' +
    '        "jsonType.label" : "String"\n' +
    '      }\n' +
    '    } ]\n' +
    '  }, {\n' +
    '    "id" : "4af0eddd-8f3e-4793-bfe2-e8a0f841a6de",\n' +
    '    "name" : "offline_access",\n' +
    '    "description" : "OpenID Connect built-in scope: offline_access",\n' +
    '    "protocol" : "openid-connect",\n' +
    '    "attributes" : {\n' +
    '      "consent.screen.text" : "${offlineAccessScopeConsentText}",\n' +
    '      "display.on.consent.screen" : "true"\n' +
    '    }\n' +
    '  }, {\n' +
    '    "id" : "08876eb0-d0c9-4a3e-89be-c9d273cbdcb4",\n' +
    '    "name" : "email",\n' +
    '    "description" : "OpenID Connect built-in scope: email",\n' +
    '    "protocol" : "openid-connect",\n' +
    '    "attributes" : {\n' +
    '      "include.in.token.scope" : "true",\n' +
    '      "display.on.consent.screen" : "true",\n' +
    '      "consent.screen.text" : "${emailScopeConsentText}"\n' +
    '    },\n' +
    '    "protocolMappers" : [ {\n' +
    '      "id" : "e9241074-2c8d-4546-b3ab-78928a6940f9",\n' +
    '      "name" : "email",\n' +
    '      "protocol" : "openid-connect",\n' +
    '      "protocolMapper" : "oidc-usermodel-property-mapper",\n' +
    '      "consentRequired" : false,\n' +
    '      "config" : {\n' +
    '        "userinfo.token.claim" : "true",\n' +
    '        "user.attribute" : "email",\n' +
    '        "id.token.claim" : "true",\n' +
    '        "access.token.claim" : "true",\n' +
    '        "claim.name" : "email",\n' +
    '        "jsonType.label" : "String"\n' +
    '      }\n' +
    '    }, {\n' +
    '      "id" : "c5c9ee7f-4655-4692-96e5-3225a1bb9abe",\n' +
    '      "name" : "email verified",\n' +
    '      "protocol" : "openid-connect",\n' +
    '      "protocolMapper" : "oidc-usermodel-property-mapper",\n' +
    '      "consentRequired" : false,\n' +
    '      "config" : {\n' +
    '        "userinfo.token.claim" : "true",\n' +
    '        "user.attribute" : "emailVerified",\n' +
    '        "id.token.claim" : "true",\n' +
    '        "access.token.claim" : "true",\n' +
    '        "claim.name" : "email_verified",\n' +
    '        "jsonType.label" : "boolean"\n' +
    '      }\n' +
    '    } ]\n' +
    '  } ],\n' +
    '  "defaultDefaultClientScopes" : [ "role_list", "profile", "email", "roles", "web-origins" ],\n' +
    '  "defaultOptionalClientScopes" : [ "offline_access", "address", "phone", "microprofile-jwt" ],\n' +
    '  "browserSecurityHeaders" : {\n' +
    '    "contentSecurityPolicyReportOnly" : "",\n' +
    '    "xContentTypeOptions" : "nosniff",\n' +
    '    "xRobotsTag" : "none",\n' +
    '    "xFrameOptions" : "SAMEORIGIN",\n' +
    '    "contentSecurityPolicy" : "frame-src \'self\'; frame-ancestors \'self\'; object-src \'none\';",\n' +
    '    "xXSSProtection" : "1; mode=block",\n' +
    '    "strictTransportSecurity" : "max-age=31536000; includeSubDomains"\n' +
    '  },\n' +
    '  "smtpServer" : { },\n' +
    '  "eventsEnabled" : false,\n' +
    '  "eventsListeners" : [ "jboss-logging" ],\n' +
    '  "enabledEventTypes" : [ ],\n' +
    '  "adminEventsEnabled" : false,\n' +
    '  "adminEventsDetailsEnabled" : false,\n' +
    '  "identityProviders" : [ ],\n' +
    '  "identityProviderMappers" : [ ],\n' +
    '  "components" : {\n' +
    '    "org.keycloak.services.clientregistration.policy.ClientRegistrationPolicy" : [ {\n' +
    '      "id" : "accab269-f61a-463c-b3b5-ead41af8bac0",\n' +
    '      "name" : "Allowed Client Scopes",\n' +
    '      "providerId" : "allowed-client-templates",\n' +
    '      "subType" : "anonymous",\n' +
    '      "subComponents" : { },\n' +
    '      "config" : {\n' +
    '        "allow-default-scopes" : [ "true" ]\n' +
    '      }\n' +
    '    }, {\n' +
    '      "id" : "0be08512-51e7-4d1b-92bf-719a9f4d63a6",\n' +
    '      "name" : "Allowed Protocol Mapper Types",\n' +
    '      "providerId" : "allowed-protocol-mappers",\n' +
    '      "subType" : "authenticated",\n' +
    '      "subComponents" : { },\n' +
    '      "config" : {\n' +
    '        "allowed-protocol-mapper-types" : [ "saml-user-attribute-mapper", "saml-user-property-mapper", "oidc-usermodel-property-mapper", "oidc-sha256-pairwise-sub-mapper", "oidc-full-name-mapper", "oidc-usermodel-attribute-mapper", "oidc-address-mapper", "saml-role-list-mapper" ]\n' +
    '      }\n' +
    '    }, {\n' +
    '      "id" : "528cacc2-29ee-4ac0-905f-8468be0dc613",\n' +
    '      "name" : "Consent Required",\n' +
    '      "providerId" : "consent-required",\n' +
    '      "subType" : "anonymous",\n' +
    '      "subComponents" : { },\n' +
    '      "config" : { }\n' +
    '    }, {\n' +
    '      "id" : "90fa490f-180b-48b9-b3cf-ffb0e3754e90",\n' +
    '      "name" : "Allowed Client Scopes",\n' +
    '      "providerId" : "allowed-client-templates",\n' +
    '      "subType" : "authenticated",\n' +
    '      "subComponents" : { },\n' +
    '      "config" : {\n' +
    '        "allow-default-scopes" : [ "true" ]\n' +
    '      }\n' +
    '    }, {\n' +
    '      "id" : "712be4f4-23be-4e57-a2bd-1f111f803be5",\n' +
    '      "name" : "Trusted Hosts",\n' +
    '      "providerId" : "trusted-hosts",\n' +
    '      "subType" : "anonymous",\n' +
    '      "subComponents" : { },\n' +
    '      "config" : {\n' +
    '        "host-sending-registration-request-must-match" : [ "true" ],\n' +
    '        "client-uris-must-match" : [ "true" ]\n' +
    '      }\n' +
    '    }, {\n' +
    '      "id" : "6179f8cb-c885-4762-9951-f23e18250124",\n' +
    '      "name" : "Full Scope Disabled",\n' +
    '      "providerId" : "scope",\n' +
    '      "subType" : "anonymous",\n' +
    '      "subComponents" : { },\n' +
    '      "config" : { }\n' +
    '    }, {\n' +
    '      "id" : "855e57e3-6df0-4794-ae7d-4d0e986cc3ca",\n' +
    '      "name" : "Allowed Protocol Mapper Types",\n' +
    '      "providerId" : "allowed-protocol-mappers",\n' +
    '      "subType" : "anonymous",\n' +
    '      "subComponents" : { },\n' +
    '      "config" : {\n' +
    '        "allowed-protocol-mapper-types" : [ "oidc-usermodel-attribute-mapper", "saml-user-property-mapper", "saml-user-attribute-mapper", "oidc-sha256-pairwise-sub-mapper", "saml-role-list-mapper", "oidc-usermodel-property-mapper", "oidc-full-name-mapper", "oidc-address-mapper" ]\n' +
    '      }\n' +
    '    }, {\n' +
    '      "id" : "07482215-8b8a-44e8-b3b0-a61240b161d5",\n' +
    '      "name" : "Max Clients Limit",\n' +
    '      "providerId" : "max-clients",\n' +
    '      "subType" : "anonymous",\n' +
    '      "subComponents" : { },\n' +
    '      "config" : {\n' +
    '        "max-clients" : [ "200" ]\n' +
    '      }\n' +
    '    } ],\n' +
    '    "org.keycloak.keys.KeyProvider" : [ {\n' +
    '      "id" : "bb7bc61b-b455-417b-a033-67c4f58f3d47",\n' +
    '      "name" : "rsa-generated",\n' +
    '      "providerId" : "rsa-generated",\n' +
    '      "subComponents" : { },\n' +
    '      "config" : {\n' +
    '        "privateKey" : [ "MIIEogIBAAKCAQEA6vPHBUkVi4Xfxywn2/QOdBgb3IU2agzA6HzptYxPMS3/iXxrDyJeOROEYS9S5kSMBaZNgdVill2ED3pzdNO4B8zc2oxDBwg0MDz57mXs+6XD2iLQSbHwhkIqjqGTZpthppHE9tyNFY1o/fh9WjVvHBNBJcfDBvJh+8QB06edKJC7V0xaQTWqsNJU7TOmDYGqjS2vOdnHszqSCE9hJClCabowQb7adHy6lrN3wLsfrKPJTfsVKBKuCLepLXBrZHQq6h9ayn7W94bvy6ug/9kfCL5HtcnKCagLEyVRmrDI7hD2z21nu77zsX1tfRJ2U/ob1v1AoltC9khwiDzF28XEuQIDAQABAoIBAGsvb1n/725JUr+Aa2ayvm1EGmHN+/cBfngRlGUYb4BWJb/JHOY4nZeYSco0VrNqDh79sVpLyMAkRXzyNf3UIJ6eXRru5h0tJvHiv3p80VI0W1cGjtMv9DSrttJ+78ndlPzyf1LHZy2v53gFhtpCij/aoNvleBmRNhYvY031p4K7NJYa7Vff9/VOEmPCnO7sJLhP0eW9tkxXkm1m7va/vt+OFCGyv/4AmcfsSXwmFEBm+84LEwA0kZgVpSfE0XvEubtmYKhO7mt4dlniVR91J2JjKr5F0jKQDaeRUtC4w8slxT/1GFickIdNPZIk1zfUqoj8spHomAil/0xHkeZNP4kCgYEA9qdn6PoSqsCTHeucsasF35wy/kt4QRTWP4nHrObQrlC22eNk24INCxegwPWyFs4g17xT16YX4Z5kclqR1FL8biKCUrn5iDD6kgzCdKVa0AEbp/fQn6e7c5PQgS/Mt/7evxnNApRipIXX/ZKQTMB/2Jb572sEQ6x/O/UhNiKic+cCgYEA89rc5Se361OJa21L8REC4H9nARi3j5vbx2XF4aPzyN2Qe8ENR24kM2wL+M5K8eaMs/qjclx/OhyeaoL7au6vbo1ahJdDTVnMNZW8mwzzE32R1PiWQ+mV3pYH0T047sVdIRKcm6FrRENZXGYhJ8WwUqX2yR6VmzeDcGO3NUDk7l8CgYAwpt6xLrqF4cxjB3l19hUHgWjxjfNfavvDtqqjKTgaWiNnIRpgzetCt9tmlFAXfXsu8p/bFpD5WOPZRpIjPmc6ViY8qSBWQ8r5CflFRuR9yOoqnJATHeO0rYBgKwyHcod/TFiK3LgEWb477y/1Y7cUAtuz5PkHXDwQmI5/fh9rGwKBgHeR/rRiiF1chcpmOlGHHNkFv3UbMI67RsX8Ek50vQnmEn2MCL3YtOl99lTWmosImD98C378+el9tPPXK/6f8OeNajAPl5GrEWXI+UUx0VLiRIqgJdZBCBqviD/B/FOf9O1Nmfr56IX9XCjhbyp4VeAAvwSY+ZS1YL7QNjpnipmTAoGAMBxOIjE5YDisDUhvgJKxU1ro/JZ5CUrbRA+wQsXAgkL6jCdJpSXW7ZcT14X+NOXntxbrommRiZD8haC3WOiN1AJWajQzU4B7VJUhgbj4uEqaNyLIVP7PcBuRDIfpj2j7HZWHtBxZRX+TkGit1PxXn6rc+/aLyMDs206Qx/Dad4k=" ],\n' +
    '        "certificate" : [ "MIICqTCCAZECBgF6UiiWbDANBgkqhkiG9w0BAQsFADAYMRYwFAYDVQQDDA1ldmF0b29sLXJlYWxtMB4XDTIxMDYyODEwMjUyOVoXDTMxMDYyODEwMjcwOVowGDEWMBQGA1UEAwwNZXZhdG9vbC1yZWFsbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAOrzxwVJFYuF38csJ9v0DnQYG9yFNmoMwOh86bWMTzEt/4l8aw8iXjkThGEvUuZEjAWmTYHVYpZdhA96c3TTuAfM3NqMQwcINDA8+e5l7Pulw9oi0Emx8IZCKo6hk2abYaaRxPbcjRWNaP34fVo1bxwTQSXHwwbyYfvEAdOnnSiQu1dMWkE1qrDSVO0zpg2Bqo0trznZx7M6kghPYSQpQmm6MEG+2nR8upazd8C7H6yjyU37FSgSrgi3qS1wa2R0KuofWsp+1veG78uroP/ZHwi+R7XJygmoCxMlUZqwyO4Q9s9tZ7u+87F9bX0SdlP6G9b9QKJbQvZIcIg8xdvFxLkCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAhvx9N8AttNklcanUXoF+6tSRzE84ae5HgGVIy91T4FKCHQzTESKVgxdcgHZNQD8jjwPPWlZG6P/xPZllw9F0dur8KzcPgTmdLx9mkMr0sa2jw96nc4qahxI7umd0nmLgRUjMt4guD4TG1VwMy89EC5EI9KbmNLjC9d59AuZncasMXsY1H519p6ov9GrkKzszj7YQ23i/tTOR09cM3T7Dt8CSW6A8PPB5ElXy4GzaZEOqels0sjqK9aicwrU+58bEX9bjRpxk3Is8vluuoriGYQ+t5Gn45KHdW0riPyqQAj33KoIvlcMiPM0L9zRKj/G//UAVDKiPswWoTNO1zVonnw==" ],\n' +
    '        "priority" : [ "100" ]\n' +
    '      }\n' +
    '    }, {\n' +
    '      "id" : "a082a858-5d7b-4dc1-95df-895f13d612ff",\n' +
    '      "name" : "hmac-generated",\n' +
    '      "providerId" : "hmac-generated",\n' +
    '      "subComponents" : { },\n' +
    '      "config" : {\n' +
    '        "kid" : [ "0b6f6634-af11-4c15-a42a-51f6986cc910" ],\n' +
    '        "secret" : [ "U_E7wM3JiVZmT_h1ApeN7Ot4bolG5M54M_6zrKtv9S1ZrX8NsSgZc_HYA60-B9fkZaJtdzZWCSDvYjxGNg0hnw" ],\n' +
    '        "priority" : [ "100" ],\n' +
    '        "algorithm" : [ "HS256" ]\n' +
    '      }\n' +
    '    }, {\n' +
    '      "id" : "8c058fff-f744-45e0-b5e3-07151d2f4c09",\n' +
    '      "name" : "aes-generated",\n' +
    '      "providerId" : "aes-generated",\n' +
    '      "subComponents" : { },\n' +
    '      "config" : {\n' +
    '        "kid" : [ "74585732-003c-4204-86fc-378e924f6bc4" ],\n' +
    '        "secret" : [ "Cv2UNcRdUPif9r7a5eOr6g" ],\n' +
    '        "priority" : [ "100" ]\n' +
    '      }\n' +
    '    } ]\n' +
    '  },\n' +
    '  "internationalizationEnabled" : false,\n' +
    '  "supportedLocales" : [ ],\n' +
    '  "authenticationFlows" : [ {\n' +
    '    "id" : "d6c69fd7-3d9d-4e5b-9229-832854af5161",\n' +
    '    "alias" : "Account verification options",\n' +
    '    "description" : "Method with which to verity the existing account",\n' +
    '    "providerId" : "basic-flow",\n' +
    '    "topLevel" : false,\n' +
    '    "builtIn" : true,\n' +
    '    "authenticationExecutions" : [ {\n' +
    '      "authenticator" : "idp-email-verification",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "ALTERNATIVE",\n' +
    '      "priority" : 10,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    }, {\n' +
    '      "authenticatorFlow" : true,\n' +
    '      "requirement" : "ALTERNATIVE",\n' +
    '      "priority" : 20,\n' +
    '      "flowAlias" : "Verify Existing Account by Re-authentication",\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : true\n' +
    '    } ]\n' +
    '  }, {\n' +
    '    "id" : "07ed7c9b-643b-46c4-8650-b8137c1cf0c9",\n' +
    '    "alias" : "Authentication Options",\n' +
    '    "description" : "Authentication options.",\n' +
    '    "providerId" : "basic-flow",\n' +
    '    "topLevel" : false,\n' +
    '    "builtIn" : true,\n' +
    '    "authenticationExecutions" : [ {\n' +
    '      "authenticator" : "basic-auth",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "REQUIRED",\n' +
    '      "priority" : 10,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    }, {\n' +
    '      "authenticator" : "basic-auth-otp",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "DISABLED",\n' +
    '      "priority" : 20,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    }, {\n' +
    '      "authenticator" : "auth-spnego",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "DISABLED",\n' +
    '      "priority" : 30,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    } ]\n' +
    '  }, {\n' +
    '    "id" : "e0cc79ab-d1a4-476b-b13b-5c250ac9e0ac",\n' +
    '    "alias" : "Browser - Conditional OTP",\n' +
    '    "description" : "Flow to determine if the OTP is required for the authentication",\n' +
    '    "providerId" : "basic-flow",\n' +
    '    "topLevel" : false,\n' +
    '    "builtIn" : true,\n' +
    '    "authenticationExecutions" : [ {\n' +
    '      "authenticator" : "conditional-user-configured",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "REQUIRED",\n' +
    '      "priority" : 10,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    }, {\n' +
    '      "authenticator" : "auth-otp-form",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "REQUIRED",\n' +
    '      "priority" : 20,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    } ]\n' +
    '  }, {\n' +
    '    "id" : "93e25169-ad30-4246-8c00-717712e8a7f1",\n' +
    '    "alias" : "Direct Grant - Conditional OTP",\n' +
    '    "description" : "Flow to determine if the OTP is required for the authentication",\n' +
    '    "providerId" : "basic-flow",\n' +
    '    "topLevel" : false,\n' +
    '    "builtIn" : true,\n' +
    '    "authenticationExecutions" : [ {\n' +
    '      "authenticator" : "conditional-user-configured",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "REQUIRED",\n' +
    '      "priority" : 10,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    }, {\n' +
    '      "authenticator" : "direct-grant-validate-otp",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "REQUIRED",\n' +
    '      "priority" : 20,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    } ]\n' +
    '  }, {\n' +
    '    "id" : "3b4ee9f8-0ccd-4d40-95c9-c1d986e930ea",\n' +
    '    "alias" : "First broker login - Conditional OTP",\n' +
    '    "description" : "Flow to determine if the OTP is required for the authentication",\n' +
    '    "providerId" : "basic-flow",\n' +
    '    "topLevel" : false,\n' +
    '    "builtIn" : true,\n' +
    '    "authenticationExecutions" : [ {\n' +
    '      "authenticator" : "conditional-user-configured",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "REQUIRED",\n' +
    '      "priority" : 10,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    }, {\n' +
    '      "authenticator" : "auth-otp-form",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "REQUIRED",\n' +
    '      "priority" : 20,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    } ]\n' +
    '  }, {\n' +
    '    "id" : "6f30a57b-abce-4b26-9ad3-f5fdd7c92297",\n' +
    '    "alias" : "Handle Existing Account",\n' +
    '    "description" : "Handle what to do if there is existing account with same email/username like authenticated identity provider",\n' +
    '    "providerId" : "basic-flow",\n' +
    '    "topLevel" : false,\n' +
    '    "builtIn" : true,\n' +
    '    "authenticationExecutions" : [ {\n' +
    '      "authenticator" : "idp-confirm-link",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "REQUIRED",\n' +
    '      "priority" : 10,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    }, {\n' +
    '      "authenticatorFlow" : true,\n' +
    '      "requirement" : "REQUIRED",\n' +
    '      "priority" : 20,\n' +
    '      "flowAlias" : "Account verification options",\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : true\n' +
    '    } ]\n' +
    '  }, {\n' +
    '    "id" : "f1392f21-8065-4360-82b2-3ec73e52cada",\n' +
    '    "alias" : "Reset - Conditional OTP",\n' +
    '    "description" : "Flow to determine if the OTP should be reset or not. Set to REQUIRED to force.",\n' +
    '    "providerId" : "basic-flow",\n' +
    '    "topLevel" : false,\n' +
    '    "builtIn" : true,\n' +
    '    "authenticationExecutions" : [ {\n' +
    '      "authenticator" : "conditional-user-configured",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "REQUIRED",\n' +
    '      "priority" : 10,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    }, {\n' +
    '      "authenticator" : "reset-otp",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "REQUIRED",\n' +
    '      "priority" : 20,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    } ]\n' +
    '  }, {\n' +
    '    "id" : "7192bfad-6a14-41dd-826a-dcd4fc8efb59",\n' +
    '    "alias" : "User creation or linking",\n' +
    '    "description" : "Flow for the existing/non-existing user alternatives",\n' +
    '    "providerId" : "basic-flow",\n' +
    '    "topLevel" : false,\n' +
    '    "builtIn" : true,\n' +
    '    "authenticationExecutions" : [ {\n' +
    '      "authenticatorConfig" : "create unique user config",\n' +
    '      "authenticator" : "idp-create-user-if-unique",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "ALTERNATIVE",\n' +
    '      "priority" : 10,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    }, {\n' +
    '      "authenticatorFlow" : true,\n' +
    '      "requirement" : "ALTERNATIVE",\n' +
    '      "priority" : 20,\n' +
    '      "flowAlias" : "Handle Existing Account",\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : true\n' +
    '    } ]\n' +
    '  }, {\n' +
    '    "id" : "a0492424-7ce5-4148-a97c-88fd039a7a6b",\n' +
    '    "alias" : "Verify Existing Account by Re-authentication",\n' +
    '    "description" : "Reauthentication of existing account",\n' +
    '    "providerId" : "basic-flow",\n' +
    '    "topLevel" : false,\n' +
    '    "builtIn" : true,\n' +
    '    "authenticationExecutions" : [ {\n' +
    '      "authenticator" : "idp-username-password-form",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "REQUIRED",\n' +
    '      "priority" : 10,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    }, {\n' +
    '      "authenticatorFlow" : true,\n' +
    '      "requirement" : "CONDITIONAL",\n' +
    '      "priority" : 20,\n' +
    '      "flowAlias" : "First broker login - Conditional OTP",\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : true\n' +
    '    } ]\n' +
    '  }, {\n' +
    '    "id" : "72b7e74a-33a8-4391-a033-c2c57f17f335",\n' +
    '    "alias" : "browser",\n' +
    '    "description" : "browser based authentication",\n' +
    '    "providerId" : "basic-flow",\n' +
    '    "topLevel" : true,\n' +
    '    "builtIn" : true,\n' +
    '    "authenticationExecutions" : [ {\n' +
    '      "authenticator" : "auth-cookie",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "ALTERNATIVE",\n' +
    '      "priority" : 10,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    }, {\n' +
    '      "authenticator" : "auth-spnego",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "DISABLED",\n' +
    '      "priority" : 20,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    }, {\n' +
    '      "authenticator" : "identity-provider-redirector",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "ALTERNATIVE",\n' +
    '      "priority" : 25,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    }, {\n' +
    '      "authenticatorFlow" : true,\n' +
    '      "requirement" : "ALTERNATIVE",\n' +
    '      "priority" : 30,\n' +
    '      "flowAlias" : "forms",\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : true\n' +
    '    } ]\n' +
    '  }, {\n' +
    '    "id" : "3f6a5589-cfd7-4c48-a05e-bccd090ed944",\n' +
    '    "alias" : "clients",\n' +
    '    "description" : "Base authentication for clients",\n' +
    '    "providerId" : "client-flow",\n' +
    '    "topLevel" : true,\n' +
    '    "builtIn" : true,\n' +
    '    "authenticationExecutions" : [ {\n' +
    '      "authenticator" : "client-secret",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "ALTERNATIVE",\n' +
    '      "priority" : 10,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    }, {\n' +
    '      "authenticator" : "client-jwt",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "ALTERNATIVE",\n' +
    '      "priority" : 20,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    }, {\n' +
    '      "authenticator" : "client-secret-jwt",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "ALTERNATIVE",\n' +
    '      "priority" : 30,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    }, {\n' +
    '      "authenticator" : "client-x509",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "ALTERNATIVE",\n' +
    '      "priority" : 40,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    } ]\n' +
    '  }, {\n' +
    '    "id" : "d8bd825f-c1ee-485c-be01-ebe47a220ae5",\n' +
    '    "alias" : "direct grant",\n' +
    '    "description" : "OpenID Connect Resource Owner Grant",\n' +
    '    "providerId" : "basic-flow",\n' +
    '    "topLevel" : true,\n' +
    '    "builtIn" : true,\n' +
    '    "authenticationExecutions" : [ {\n' +
    '      "authenticator" : "direct-grant-validate-username",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "REQUIRED",\n' +
    '      "priority" : 10,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    }, {\n' +
    '      "authenticator" : "direct-grant-validate-password",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "REQUIRED",\n' +
    '      "priority" : 20,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    }, {\n' +
    '      "authenticatorFlow" : true,\n' +
    '      "requirement" : "CONDITIONAL",\n' +
    '      "priority" : 30,\n' +
    '      "flowAlias" : "Direct Grant - Conditional OTP",\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : true\n' +
    '    } ]\n' +
    '  }, {\n' +
    '    "id" : "4686632c-693d-4628-a89a-057b1f041f2d",\n' +
    '    "alias" : "docker auth",\n' +
    '    "description" : "Used by Docker clients to authenticate against the IDP",\n' +
    '    "providerId" : "basic-flow",\n' +
    '    "topLevel" : true,\n' +
    '    "builtIn" : true,\n' +
    '    "authenticationExecutions" : [ {\n' +
    '      "authenticator" : "docker-http-basic-authenticator",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "REQUIRED",\n' +
    '      "priority" : 10,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    } ]\n' +
    '  }, {\n' +
    '    "id" : "17fbda0f-36c8-4a70-be9a-442bbfcf40cd",\n' +
    '    "alias" : "first broker login",\n' +
    '    "description" : "Actions taken after first broker login with identity provider account, which is not yet linked to any Keycloak account",\n' +
    '    "providerId" : "basic-flow",\n' +
    '    "topLevel" : true,\n' +
    '    "builtIn" : true,\n' +
    '    "authenticationExecutions" : [ {\n' +
    '      "authenticatorConfig" : "review profile config",\n' +
    '      "authenticator" : "idp-review-profile",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "REQUIRED",\n' +
    '      "priority" : 10,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    }, {\n' +
    '      "authenticatorFlow" : true,\n' +
    '      "requirement" : "REQUIRED",\n' +
    '      "priority" : 20,\n' +
    '      "flowAlias" : "User creation or linking",\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : true\n' +
    '    } ]\n' +
    '  }, {\n' +
    '    "id" : "f2d0712a-b2fb-4c25-96dd-d673f712f367",\n' +
    '    "alias" : "forms",\n' +
    '    "description" : "Username, password, otp and other auth forms.",\n' +
    '    "providerId" : "basic-flow",\n' +
    '    "topLevel" : false,\n' +
    '    "builtIn" : true,\n' +
    '    "authenticationExecutions" : [ {\n' +
    '      "authenticator" : "auth-username-password-form",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "REQUIRED",\n' +
    '      "priority" : 10,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    }, {\n' +
    '      "authenticatorFlow" : true,\n' +
    '      "requirement" : "CONDITIONAL",\n' +
    '      "priority" : 20,\n' +
    '      "flowAlias" : "Browser - Conditional OTP",\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : true\n' +
    '    } ]\n' +
    '  }, {\n' +
    '    "id" : "be1a6f28-74a8-4760-919f-8b18bb59c85d",\n' +
    '    "alias" : "http challenge",\n' +
    '    "description" : "An authentication flow based on challenge-response HTTP Authentication Schemes",\n' +
    '    "providerId" : "basic-flow",\n' +
    '    "topLevel" : true,\n' +
    '    "builtIn" : true,\n' +
    '    "authenticationExecutions" : [ {\n' +
    '      "authenticator" : "no-cookie-redirect",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "REQUIRED",\n' +
    '      "priority" : 10,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    }, {\n' +
    '      "authenticatorFlow" : true,\n' +
    '      "requirement" : "REQUIRED",\n' +
    '      "priority" : 20,\n' +
    '      "flowAlias" : "Authentication Options",\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : true\n' +
    '    } ]\n' +
    '  }, {\n' +
    '    "id" : "046a0f2d-cf36-4490-bf67-4266c5d66f64",\n' +
    '    "alias" : "registration",\n' +
    '    "description" : "registration flow",\n' +
    '    "providerId" : "basic-flow",\n' +
    '    "topLevel" : true,\n' +
    '    "builtIn" : true,\n' +
    '    "authenticationExecutions" : [ {\n' +
    '      "authenticator" : "registration-page-form",\n' +
    '      "authenticatorFlow" : true,\n' +
    '      "requirement" : "REQUIRED",\n' +
    '      "priority" : 10,\n' +
    '      "flowAlias" : "registration form",\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : true\n' +
    '    } ]\n' +
    '  }, {\n' +
    '    "id" : "0e7ef5cc-99e7-4aff-8efd-237104232f89",\n' +
    '    "alias" : "registration form",\n' +
    '    "description" : "registration form",\n' +
    '    "providerId" : "form-flow",\n' +
    '    "topLevel" : false,\n' +
    '    "builtIn" : true,\n' +
    '    "authenticationExecutions" : [ {\n' +
    '      "authenticator" : "registration-user-creation",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "REQUIRED",\n' +
    '      "priority" : 20,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    }, {\n' +
    '      "authenticator" : "registration-profile-action",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "REQUIRED",\n' +
    '      "priority" : 40,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    }, {\n' +
    '      "authenticator" : "registration-password-action",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "REQUIRED",\n' +
    '      "priority" : 50,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    }, {\n' +
    '      "authenticator" : "registration-recaptcha-action",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "DISABLED",\n' +
    '      "priority" : 60,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    } ]\n' +
    '  }, {\n' +
    '    "id" : "e52abc34-c5b6-45b5-b86b-a175de27e155",\n' +
    '    "alias" : "reset credentials",\n' +
    '    "description" : "Reset credentials for a user if they forgot their password or something",\n' +
    '    "providerId" : "basic-flow",\n' +
    '    "topLevel" : true,\n' +
    '    "builtIn" : true,\n' +
    '    "authenticationExecutions" : [ {\n' +
    '      "authenticator" : "reset-credentials-choose-user",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "REQUIRED",\n' +
    '      "priority" : 10,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    }, {\n' +
    '      "authenticator" : "reset-credential-email",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "REQUIRED",\n' +
    '      "priority" : 20,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    }, {\n' +
    '      "authenticator" : "reset-password",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "REQUIRED",\n' +
    '      "priority" : 30,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    }, {\n' +
    '      "authenticatorFlow" : true,\n' +
    '      "requirement" : "CONDITIONAL",\n' +
    '      "priority" : 40,\n' +
    '      "flowAlias" : "Reset - Conditional OTP",\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : true\n' +
    '    } ]\n' +
    '  }, {\n' +
    '    "id" : "2b703de7-2a90-429b-aa39-7b305ad747af",\n' +
    '    "alias" : "saml ecp",\n' +
    '    "description" : "SAML ECP Profile Authentication Flow",\n' +
    '    "providerId" : "basic-flow",\n' +
    '    "topLevel" : true,\n' +
    '    "builtIn" : true,\n' +
    '    "authenticationExecutions" : [ {\n' +
    '      "authenticator" : "http-basic-authenticator",\n' +
    '      "authenticatorFlow" : false,\n' +
    '      "requirement" : "REQUIRED",\n' +
    '      "priority" : 10,\n' +
    '      "userSetupAllowed" : false,\n' +
    '      "autheticatorFlow" : false\n' +
    '    } ]\n' +
    '  } ],\n' +
    '  "authenticatorConfig" : [ {\n' +
    '    "id" : "89e0b7d7-cd5a-4bed-9efa-7cb51b0c4115",\n' +
    '    "alias" : "create unique user config",\n' +
    '    "config" : {\n' +
    '      "require.password.update.after.registration" : "false"\n' +
    '    }\n' +
    '  }, {\n' +
    '    "id" : "d693867f-6475-49d8-a91e-719ed07f6bf2",\n' +
    '    "alias" : "review profile config",\n' +
    '    "config" : {\n' +
    '      "update.profile.on.first.login" : "missing"\n' +
    '    }\n' +
    '  } ],\n' +
    '  "requiredActions" : [ {\n' +
    '    "alias" : "CONFIGURE_TOTP",\n' +
    '    "name" : "Configure OTP",\n' +
    '    "providerId" : "CONFIGURE_TOTP",\n' +
    '    "enabled" : true,\n' +
    '    "defaultAction" : false,\n' +
    '    "priority" : 10,\n' +
    '    "config" : { }\n' +
    '  }, {\n' +
    '    "alias" : "terms_and_conditions",\n' +
    '    "name" : "Terms and Conditions",\n' +
    '    "providerId" : "terms_and_conditions",\n' +
    '    "enabled" : false,\n' +
    '    "defaultAction" : false,\n' +
    '    "priority" : 20,\n' +
    '    "config" : { }\n' +
    '  }, {\n' +
    '    "alias" : "UPDATE_PASSWORD",\n' +
    '    "name" : "Update Password",\n' +
    '    "providerId" : "UPDATE_PASSWORD",\n' +
    '    "enabled" : true,\n' +
    '    "defaultAction" : false,\n' +
    '    "priority" : 30,\n' +
    '    "config" : { }\n' +
    '  }, {\n' +
    '    "alias" : "UPDATE_PROFILE",\n' +
    '    "name" : "Update Profile",\n' +
    '    "providerId" : "UPDATE_PROFILE",\n' +
    '    "enabled" : true,\n' +
    '    "defaultAction" : false,\n' +
    '    "priority" : 40,\n' +
    '    "config" : { }\n' +
    '  }, {\n' +
    '    "alias" : "VERIFY_EMAIL",\n' +
    '    "name" : "Verify Email",\n' +
    '    "providerId" : "VERIFY_EMAIL",\n' +
    '    "enabled" : true,\n' +
    '    "defaultAction" : false,\n' +
    '    "priority" : 50,\n' +
    '    "config" : { }\n' +
    '  }, {\n' +
    '    "alias" : "delete_account",\n' +
    '    "name" : "Delete Account",\n' +
    '    "providerId" : "delete_account",\n' +
    '    "enabled" : false,\n' +
    '    "defaultAction" : false,\n' +
    '    "priority" : 60,\n' +
    '    "config" : { }\n' +
    '  }, {\n' +
    '    "alias" : "update_user_locale",\n' +
    '    "name" : "Update User Locale",\n' +
    '    "providerId" : "update_user_locale",\n' +
    '    "enabled" : true,\n' +
    '    "defaultAction" : false,\n' +
    '    "priority" : 1000,\n' +
    '    "config" : { }\n' +
    '  } ],\n' +
    '  "browserFlow" : "browser",\n' +
    '  "registrationFlow" : "registration",\n' +
    '  "directGrantFlow" : "direct grant",\n' +
    '  "resetCredentialsFlow" : "reset credentials",\n' +
    '  "clientAuthenticationFlow" : "clients",\n' +
    '  "dockerAuthenticationFlow" : "docker auth",\n' +
    '  "attributes" : {\n' +
    '    "cibaBackchannelTokenDeliveryMode" : "poll",\n' +
    '    "cibaExpiresIn" : "120",\n' +
    '    "cibaAuthRequestedUserHint" : "login_hint",\n' +
    '    "oauth2DeviceCodeLifespan" : "600",\n' +
    '    "oauth2DevicePollingInterval" : "5",\n' +
    '    "clientOfflineSessionMaxLifespan" : "0",\n' +
    '    "clientSessionIdleTimeout" : "0",\n' +
    '    "clientSessionMaxLifespan" : "0",\n' +
    '    "clientOfflineSessionIdleTimeout" : "0",\n' +
    '    "cibaInterval" : "5"\n' +
    '  },\n' +
    '  "keycloakVersion" : "13.0.0",\n' +
    '  "userManagedAccessAllowed" : false\n' +
    '}'
};
