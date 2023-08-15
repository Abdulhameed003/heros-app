import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DefaultHomeComponent } from './default-home.component';

describe('DefaultHomeComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [DefaultHomeComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(DefaultHomeComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Heroes Application'`, () => {
    const fixture = TestBed.createComponent(DefaultHomeComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('heroes Application');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(DefaultHomeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('Heroes Application app is running!');
  });
});

