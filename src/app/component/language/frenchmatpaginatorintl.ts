import { MatPaginatorIntl } from '@angular/material';

export class FrenchMatPaginatorIntl extends MatPaginatorIntl {
    itemsPerPageLabel = 'éléments par page';

    getRangeLabel = function(page: number, pageSize: number, length: number) {
        const pageencours = page + 1;
        const pagemax = Math.ceil(length / pageSize);
        return ' page : ' + pageencours + ' - ' + pagemax;
    };
}
