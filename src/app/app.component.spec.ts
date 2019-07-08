import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component'

describe('AppComponent', () => {
    beforeEach(async (() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                AppComponent,
                MainMenuComponent
            ]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should have main menu', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        let textContent = compiled.querySelector('main-menu').textContent;
        expect(textContent).toContain('Home');
        expect(textContent).toContain('Game');
        expect(textContent).toContain('High scores');
    });

    it('should have router placeholder', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('router-outlet').textContent).toBeDefined();
    });
});
