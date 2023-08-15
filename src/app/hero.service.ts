import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators'
import { MessageService } from './message.service';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})

export class HeroService {
  private heroesUrl = 'api/heroes'; // Url to mock heroesApi 
  
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(
    private http : HttpClient,
    private msgService : MessageService) 
  {
  }

  getHeroById(id: number): Observable<Hero>{
    //const hero = this.http.get(this.heroesUrl,);
    const url = `${this.heroesUrl}/${id}`;

    return this.http.get<Hero>(url)
    .pipe(
      tap(_ => this.log(`fetching hero with id ${id}`)),
      catchError(this.handleError<Hero>(`getHeroById : id=${id}`))
    );
  }

  getHeroes() : Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
          .pipe( // pipe is used to extend the result of the get httpClient request
            tap(_ => this.log('fetched Heroes successfully')), //tap into the observable and perform an action
            catchError(this.handleError<Hero[]>('getHeroes', [])) // catchError intercepts an observable that failed!  
          ); 
  }
  
  updateHero(hero : Hero) : Observable<any>{
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero with id= ${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero : Hero) : Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl,hero,this.httpOptions).pipe(
      tap(_ => this.log(`created a new hero ${hero.name}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(hero : Hero) : Observable<any>{
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.delete(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero with id= ${hero.id}`)),
      catchError(this.handleError('deleteHero'))
    );
  }

  searchHeroes(term : string) : Observable<Hero[]>
  {
    if(!term.trim()){
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term.trim()}`).pipe(
      tap(x => x.length ? 
        this.log(`found heroes matching ${term}`) :
        this.log(`no heroes matching ${term}`)),
      catchError(this.handleError('searchHeroes',[]))
    );
  }

  private log(message : string) : void
  {
    this.msgService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result? : T)
  {
    return (error : any) : Observable<T> => {
      // log error on console
      console.error(error); 

      // log error for user appropriately and move on with app.
      this.log(`${operation} failed : ${error.message}`);

      return of(result as T);
    };
  }
}
