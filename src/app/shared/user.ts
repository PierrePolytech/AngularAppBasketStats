import { Role } from './role';
import { Joueur } from './joueur';

export class User {
    roles: Role[];
    joueur: Joueur;
    id: number;
    identifiant: string;
    motdepasse: string;
    email: string;
    constructor(
    ) {}
}
