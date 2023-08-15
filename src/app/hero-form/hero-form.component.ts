import { Component } from '@angular/core';
import { SuperHero } from '../super-hero';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent {

  power = ['Really Smart', 'Super Flexible',
  'Super Hot', 'Weather Changer'];

  model = new SuperHero(20, 'Dr. Strange', this.power[0], 'Allan Smith');
  
  submitted = false;

  onSubmitted(){
    this.submitted = true;
  }
}
