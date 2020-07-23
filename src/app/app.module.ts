import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { GameReducer } from '../app/reducers/game.reducer';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './modules/material.module';

import { AppComponent } from './app.component';
import { GridComponent } from './components/grid/grid.component';
import { CellComponent } from './components/cell/cell.component';

import { GameStateService } from './services/game-state/game-state.service';

@NgModule({
  declarations: [AppComponent, GridComponent, CellComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ app: GameReducer }),
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [GameStateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
