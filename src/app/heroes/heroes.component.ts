import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { MessageService } from '../message.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit{
  heroes : Hero[] = [];
  heroName : string = '';

  constructor(private heroService : HeroService,
    private msgService : MessageService)
  {
  }
  
  ngOnInit() : void {
    this.getHeroes();
  }

  getHeroes() : void
  { 
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name : string): void{
    name = name.trim();

    if(!name) {return ;}

    this.heroService.addHero({name} as Hero)
      .subscribe(hero => this.heroes.push(hero));
  }

  delete(hero : Hero) : void{
    this.heroes = this.heroes.filter(h => h != hero);

    this.heroService.deleteHero(hero)
      .subscribe();
  }
}
