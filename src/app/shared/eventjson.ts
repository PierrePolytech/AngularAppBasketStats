import { Equipe } from './equipe';
import { Club } from './club';

export class EventJson {
    id: number;
    title: string;
    dateDebut: string;
    dateFin: string;
    infosSup: string;
    typeEvent: string;
    equipes: Equipe[];
    clubs: Club[];
    recurent: boolean;
    freq: string;
    bymonth: string;
    bymonthday: string;
    byweekday: string;
}
