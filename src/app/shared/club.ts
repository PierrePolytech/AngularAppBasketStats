import { Ville } from './ville';

export class Club {
    constructor(
        public id: number
    ) { }
    nom: string;
    codeClub: string;
    sport: string;
    villes: Ville[];
}
