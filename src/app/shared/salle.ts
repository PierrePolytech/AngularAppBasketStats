import { Ville } from './ville';
import { Club } from './club';

export class Salle {
    constructor(
        public nom?: string
    ) {}
    id: number;
    numRue: number;
    adresse: string;
    ville: Ville;
    clubSalle: Club;
}