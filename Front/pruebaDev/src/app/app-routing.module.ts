import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { UsersListComponent } from './Pages/users-list/users-list.component';
import { UsersDetailsListComponent } from './Pages/users-details-list/users-details-list.component';
import { HomeComponent } from './Pages/home/home.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'home', component: HomeComponent, children: [ 
    { path: '', component: UsersListComponent },
    { path: 'users', component: UsersListComponent },
    { path: 'users-details', component: UsersDetailsListComponent },
  ]
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
