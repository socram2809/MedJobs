import { Oportunidade } from "./oportunidade";
import { Usuario } from "./usuario";

export interface Candidatura{
    id: string,
    medico: string,
    medicoCarregado: Usuario,
    aprovado: boolean,
    oportunidade: string,
    oportunidadeCarregada: Oportunidade
}