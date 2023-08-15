import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService
{
  createDb()
  {
    const heroes =
    [
      {id : 1, name : 'Batman'},
      {id : 2, name : 'Black Adam'},
      {id : 3, name : 'Spider Man'},
      {id : 4, name : 'Super Man'},
      {id : 5, name : 'Cat Woman'},
      {id : 6, name : 'Aqua Man'},
      {id : 7, name : 'Black Pantre'},
      {id : 8, name : 'Thor'},
      {id : 9, name : 'Ant Man'},
      {id : 10, name : 'Wasp Woman'},
    ];

    return {heroes};
  }

  genId(heroes : Hero[]) : number
  {
    return (heroes.length > 0) ? Math.max(...heroes.map(hero => hero.id)) + 1: 1;
  }
  constructor() { }
}
