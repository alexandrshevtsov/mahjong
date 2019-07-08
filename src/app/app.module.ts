import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { HomeComponent } from './pages/home/home.component';
import { GameComponent } from './pages/game/game.component';
import { ScoresComponent } from './pages/scores/scores.component';
import { NotFoundComponent } from './pages/notfound/notfound.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'game', component: GameComponent, pathMatch: 'full' },
    { path: 'scores', component: ScoresComponent, pathMatch: 'full' },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true } // <-- debugging purposes only
        )
    ],
    declarations: [
        AppComponent,
		MainMenuComponent,
        HomeComponent,
        GameComponent,
        ScoresComponent,
        NotFoundComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
