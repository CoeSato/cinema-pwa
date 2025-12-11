import { jwtDecode } from "jwt-decode";

const NOMEAPP = 'eshoppw';

export const getToken = () => {
    try {
        const localStorageAutenticacao = localStorage.getItem(NOMEAPP + '/autenticacao');
        const autenticacao = localStorageAutenticacao ?
            JSON.parse(localStorageAutenticacao) : null;

        if (!autenticacao || autenticacao.auth === false || !autenticacao.token) {
            return null;
        }

        let decoded = jwtDecode(autenticacao.token);
        if (decoded.exp <= Math.floor(new Date() / 1000)) {
            console.log('Token expirado');
            logout();
            return null;
        }

        return autenticacao.token;
    } catch (e) {
        console.error('Erro ao obter token:', e);
        return null;
    }
}


export const getUsuario = () => {
    const localStorageAutenticacao = localStorage.getItem(NOMEAPP + '/autenticacao');
    const autenticacao = localStorageAutenticacao ?
        JSON.parse(localStorageAutenticacao) : null;
    if (autenticacao === null) {
        return null;
    }
    if (autenticacao.auth === false) {
        return null;
    } else {
        let decoded = jwtDecode(autenticacao.token);
        if (decoded.exp <= Math.floor(new Date() / 1000)) {
            console.log('Token expirado');
            logout();
            throw "Token expirado";
        } else {
            return decoded.usuario;
        }
    }
}

export const gravaAutenticacao = (json) => {
    localStorage.setItem(NOMEAPP + '/autenticacao', JSON.stringify(json));
}

export const logout = () => {
    localStorage.setItem(NOMEAPP + '/autenticacao', JSON.stringify({
        "auth": false, "token": ''
    }));
}
