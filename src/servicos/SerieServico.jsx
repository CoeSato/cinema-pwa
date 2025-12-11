import { getToken } from '../seguranca/Autenticacao';

export const getSeriesAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/serie`,
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

export const getSeriesPorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/serie/${codigo}`,
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

export const deleteSeriesPorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/serie/${codigo}`,
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

export const cadastraSerieAPI = async (objeto, metodo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/serie`, {
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