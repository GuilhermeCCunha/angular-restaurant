import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PageErrorComponent } from './pages/page-error/page-error.component';
import { MenuComponent } from './pages/menu/menu.component';
import { DetailsComponent } from './pages/details/details.component';
import { CustomReuseStrategy } from './reuse-strategy/custom-reuse-strategy';
import { CrudComponent } from './pages/crud/crud.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      reuseComponent: true
    }
  },
  {
    path: 'menu',
    component: MenuComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'menu/details/:_id',
    component: DetailsComponent
  },
  {
    path: 'menu/crud',
    component: CrudComponent
  },
  { path: '404', component: PageErrorComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
  providers: [
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}
  ],
})
export class AppRoutingModule {}
