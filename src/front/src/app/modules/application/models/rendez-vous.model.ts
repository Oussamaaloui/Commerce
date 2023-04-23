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
    codePostal: string;
    typeEntreprise: TypeEntreprise | undefined;
    interlocuteur: string;
    numero: string;
    email: string;
    typeRendezVous: TypeRendezVous | undefined;
    motif: MotifRendezVous | undefined;
    start: string | number | Date,
    end: string | number | Date,

    user: string,
    userId: string
}



