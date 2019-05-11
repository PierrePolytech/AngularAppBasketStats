import { Equipe } from './equipe';

export class EventJson {
    title: string;
    dateDebut: string;
    dateFin: string;
    infosSup: string;
    typeEvent: string;
    equipes: Equipe[];
}
