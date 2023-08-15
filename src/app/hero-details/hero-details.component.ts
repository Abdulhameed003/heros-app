import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})

export class HeroDetailsComponent implements OnInit {
  constructor(private route : ActivatedRoute,
    private location : Location,
    private heroService: HeroService)
  {
  }

  @Input() hero? : Hero;

  getHero() : void
  {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.heroService.getHeroById(id)
      .subscribe(hero => this.hero = hero);
  }

  ngOnInit()
  {
    this.getHero();
  }
  
  save(): void
  {
    if(this.hero)
    {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }

  goBack() : void
  {
    this.location.back();
  }
}
