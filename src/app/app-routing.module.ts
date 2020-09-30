import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { GoodCompanyComponent } from './good-company/good-company.component';
import { SimpleStatComponent } from './simple-stat/simple-stat.component';
import { MatchStatComponent } from './match-stat/match-stat.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent},
  { path: 'good-company', component: GoodCompanyComponent},
  { path: 'good-company/:playerName', component: SimpleStatComponent},
  { path: 'good-company/:playerName/match/:matchId', component: MatchStatComponent},
  { path: 'home/match/:matchId', component: MatchStatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
