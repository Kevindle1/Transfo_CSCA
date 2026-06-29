// src/app/models/client.model.ts
export interface Client {
    nom : any ;
    nomPartenaire: string;
    nomPartenaireDav: string;
    age: number;
    groupeAgences: string;
    cdGroupeAgences: number;
    secteur : string,
    conseiller: string;
    cdAgenceGestionnaire: number;
    agenceGestionnaire: string;
    dav: number;
    clientCommercial: number;
    nbRemediation: number;
    nbCartesCompte: number;
    compteOgs: string;
    libOgs: string;
    cotisationOgsCarte: number;
    cotisationOgsA: number;
    mtPlfdOcc: number;
    idPart: string;
    niveauCarte: string;
    nbCartesPp: string;
    epargneTtHorsDav: string;
    typeDav: string;
    coeffOgs: number;
    title?: string;
    showContainReduc?: boolean;
    basePrice?: number;
    overdraft: number;
}

