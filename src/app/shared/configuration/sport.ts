import { Niveau } from './niveau';

export class Sport {
    constructor(
        public nom?: string
    ) {}
    niveaux: Niveau[];
}