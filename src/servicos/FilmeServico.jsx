import { getToken } from '../seguranca/Autenticacao';

export const getFilmesAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/filme`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": getToken()
            }
        })
    const data = await response.json();
    return data;
}

export const getFilmesPorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/filme/${codigo}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": getToken()
            }
        });
    const data = await response.json();
    return data;
}

export const deleteFilmePorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/filme/${codigo}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authorization": getToken()

            }
        });
    const data = await response.json();
    return data;
}

export const cadastraFilmeAPI = async (objeto, metodo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/filme`, {
        method: metodo,
        headers: {
            "Content-Type": "application/json",
            "authorization": getToken()
        },
        body: JSON.stringify(objeto),
    })
    const data = await response.json();
    return data;
}