import { MotifRendezVous } from "./enums/motif-rendez-vous.enum";
import { TypeEntreprise } from "./enums/type-entreprise.enum";
import { TypeRendezVous } from "./enums/type-rendez-vous.enum";

export interface RendezVous {
    id: string;
    titre: string;
    description: string;
    entreprise: string;
    addresse: string;
    ville: string;
    codePostal: number;
    typeEntreprise: TypeEntreprise;
    interlocuteur: string;
    numero: string;
    email: string;
    typeRendezVous: TypeRendezVous;
    motif: MotifRendezVous;
    start: Date,
    end: Date
}



 