import { Equipe } from './equipe';

export class Match {
    constructor(
        public id: number,
        public dateMatch: Date,
        public domicile: boolean,
        public heureMatch: string,
        public heureRDV: string,
        public adversaire: string,
        public scoreEquipe: number,
        public scoreAdversaire: number,
        public infosSup: string,
        public equipe: Equipe,
    ) { }
}
