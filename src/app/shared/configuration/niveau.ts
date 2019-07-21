import { Division } from './division';

export class Niveau {
    constructor(
        public nom?: string
    ) {}
    divisions: Division[];
}