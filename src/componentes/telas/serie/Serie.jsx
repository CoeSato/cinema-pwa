import React, { useState, useEffect } from 'react';
import SerieContext from './SerieContext';
import { getDiretoresAPI } from '../../../servicos/DiretorServico';
import { getSeriesAPI, getSeriesPorCodigoAPI, deleteSeriesPorCodigoAPI, cadastraSerieAPI } from '../../../servicos/SerieServico';
import Tabela from './Tabela';
import Formulario from './Formulario';
import Carregando from '../../comuns/Carregando';
import Alerta from '../../comuns/Alerta';
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom";

function Serie() {
    let navigate = useNavigate();
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [listaDiretores, setListaDiretores] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const recuperaSeries = async () => {
        setCarregando(true);
        setListaObjetos(await getSeriesAPI());
        setCarregando(false);
    }


    const recuperaDiretores = async () => {
        setListaDiretores(await getDiretoresAPI());
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deleteSeriesPorCodigoAPI(codigo);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
                recuperaSeries();
            } catch (error) {
                console.error("Erro ao remover série:", error);
                setAlerta({ status: "error", message: "Erro ao remover série." });
                navigate("/login", { replace: true });
            }
        }
    }

    useEffect(() => {
        recuperaSeries();
        recuperaDiretores();
    }, []);

    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);

    const [objeto, setObjeto] = useState({
        codigo: 0,
        nome: "",
        data_lancamento: "",
        qtd_temporadas: 0,
        diretor_id: 0,
    })

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: 0,
            nome: "",
            data_lancamento: "",
            qtd_temporadas: 0,
            diretor_id: 0,
        });
        setExibirForm(true);
    }

    const editarObjeto = async codigo => {
        try {
            // ---- DEBUG: INÍCIO ----
            // Vamos ver o que a API REALMENTE retorna
            console.log('Buscando dados da série com código:', codigo);
            const dadosBrutosDaAPI = await getSeriesPorCodigoAPI(codigo);
            console.log('RESPOSTA BRUTA DA API:', dadosBrutosDaAPI);
            // ---- DEBUG: FIM ------
            setObjeto(await getSeriesPorCodigoAPI(codigo));
            setEditar(true);
            setAlerta({ status: "", message: "" });
            setExibirForm(true);
        } catch (error) {
            console.error("Erro ao buscar serie para edição:", error);
            setAlerta({ status: "error", message: "Erro ao carregar dados da série para edição." });
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            console.log("JSON enviado para a API:", objeto);
            let retornoAPI = await cadastraSerieAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            if (!editar) {
                setObjeto({ codigo: 0, nome: "", data_lancamento: "", qtd_temporadas: 0, diretor_id: 0 }); // Clear the form state for new item
            }
        } catch (err) {
            console.error(err.message);
            setAlerta({ status: "error", message: "Erro ao salvar série." }); // Provide feedback
            navigate("/login", { replace: true });
        }
        setExibirForm(false); // Close the form on successful save
        recuperaSeries(); // Refresh the list of series
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }


    return (
        <SerieContext.Provider value={
            {
                listaObjetos,
                listaDiretores,
                setListaDiretores,
                setListaObjetos,
                remover,
                novoObjeto,
                editarObjeto,
                acaoCadastrar,
                handleChange,
                objeto,
                setObjeto,
                editar,
                setEditar,
                exibirForm,
                setExibirForm
            }
        }>
            <Alerta alerta={alerta} />
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Formulario />
        </SerieContext.Provider>
    );
}

export default WithAuth(Serie);