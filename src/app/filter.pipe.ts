import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if(!items) return [];    
        if(!searchText) return items;
        searchText = searchText.toLowerCase();

        return items.filter(function(it) {
            var fullName = it.name.first + ' ' + it.name.last;
            return fullName.toLowerCase().includes(searchText);
        });
    }
}