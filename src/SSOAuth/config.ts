import Keycloak from 'keycloak-js';

const initOptions = {
    url: 'https://192.168.1.101:1443',
    realm: 'SSOPortal',
    clientId: 'react-client',
};

export const keycloak = new Keycloak(initOptions);