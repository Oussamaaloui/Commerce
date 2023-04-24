import { MotifRendezVous } from "./enums/motif-rendez-vous.enum";
import { TypeEntreprise } from "./enums/type-entreprise.enum";
import { TypeRendezVous } from "./enums/type-rendez-vous.enum";

export interface RendezVous {
    id: string;
    titre: string;
    description: string;
    typeRendezVous: TypeRendezVous | undefined;
    motif: MotifRendezVous | undefined;
    start: string | number | Date,
    end: string | number | Date,

    user: string,
    userId: string,
    interlocuteurId: number | null,
    entrepriseId: number | null
}



