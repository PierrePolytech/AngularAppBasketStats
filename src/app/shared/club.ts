import { Ville } from './ville';
import { Salle } from './salle';

export class Club {
    constructor(
        public id: number
    ) { }
    nom: string;
    codeClub: string;
    sport: string;
    villes: Ville[];
    salles: Salle[];
}
