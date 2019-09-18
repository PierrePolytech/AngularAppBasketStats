import { Ville } from './ville';
import { Salle } from './salle';

export class Club {
    constructor(
        public id: number
    ) { }
    nomcomplet: string;
    url: string;
    nom: string;
    codeClub: string;
    sport: string;
    villes: Ville[];
    salles: Salle[];
}
