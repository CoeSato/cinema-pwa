import { getToken } from '../seguranca/Autenticacao';

export const getDiretoresAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/diretor`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": getToken()
            }
        })
    const data = await response.json()
    return data;
}

export const getDiretorPorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/diretor/${codigo}`,
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

export const deleteDiretorPorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/diretor/${codigo}`,
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

export const cadastraDiretorAPI = async (objeto, metodo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/diretor`, {
        method: metodo,
        headers: { "Content-Type": "application/json", "authorization": getToken() },
        body: JSON.stringify(objeto),
    })
    const data = await response.json();
    return data;
}
