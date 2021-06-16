export const environment = {
  production: true,
  protocol: 'http', // TODO change to https (or infer from whether keycloak is enabled)
  backendUrl: 'BACKEND_URL',
  backendPort: 'BACKEND_PORT',
  testing: false,
  defaultLang: 'DEFAULT_LANGUAGE',
  useDefaultOverBrowserLang: 'USE_DEFAULT_OVER_BROWSER_LANGUAGE' // TODO make client store preference in local storage (override this)
};
