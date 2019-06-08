import { Oportunidade } from "./oportunidade";

export interface Candidatura{
    id: string,
    medico: string,
    oportunidade: string,
    oportunidadeCarregada: Oportunidade
}