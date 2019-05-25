import { Club } from './club';

export class Equipe {
    constructor(
        public id: number,
        public nom?: string
    ) {}

    saison: number;
    phase: number;
    category: string;
    sexe: string;
    niveau: string;
    division: string;
    poule: string;
    club: Club;
}
