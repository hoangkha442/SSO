import { keycloak } from "./config";

const initKeycloak = (onAuthenticatedCallback: Function) => {
    keycloak.init({
        onLoad: "login-required",
        pkceMethod: 'S256'
    })
    .then((authenticated: boolean) => {
        if (!authenticated) {
            console.warn('not authenticated!')
            doLogin();
        } else {
            localStorage.setItem('accessToken', keycloak.token || '');
        }
        onAuthenticatedCallback();
    })
    .catch((e: any) => {
        console.log('e: ', e);
        return console.error;
    });
};

const getKeyCloack = () => keycloak;

const doLogin = () => {
    keycloak.login().then(() => {
        localStorage.setItem('token', keycloak.token || '');
    });
};

const doLogout = () => {
    localStorage.removeItem('token');
    keycloak.logout();
};

const getToken = () => {
    const token = keycloak.token;
    localStorage.setItem('token', token || '');
    return token;
};

const isLoggedIn = () => keycloak.authenticated;

const updateToken = (successfulCallback: any) => {
    keycloak.updateToken(5)
        .then(() => {
            localStorage.setItem('token', keycloak.token || '');
            successfulCallback();
        })
        .catch(doLogin);
};

const getUsername = () => keycloak.tokenParsed?.preferred_username as string;

const hasRole = (roles: string[]) => roles.some((role: string) => keycloak.hasRealmRole(role));

const register = keycloak.register;

const UserService = {
    initKeycloak,
    doLogin,
    doLogout,
    isLoggedIn,
    getToken,
    getUsername,
    hasRole,
    getKeyCloack,
    updateToken,
    register
};

export default UserService;
