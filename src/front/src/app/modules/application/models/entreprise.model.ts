import {TypeEntreprise} from "./enums/type-entreprise.enum";

export interface Entreprise {
  id: number | undefined;
  nom: string;
  addresse: string;
  ville: string;
  codePostal: string;
  type: TypeEntreprise;
}

