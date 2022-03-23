import { LoginComponent } from './layout/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YourbillComponent } from "./layout/yourbill/yourbill.component";
import { HomeComponent } from "./layout/home/home.component";
import { MenuComponent } from "./layout/menu/menu.component";
import { FoodDetailComponent  } from "./layout/food-detail/food-detail.component";
import { RegisterComponent } from './layout/register/register.component';
import { ProfileComponent } from './layout/profile/profile.component';
import { BoardAdminComponent } from './layout/board-admin/board-admin.component';
import { BoardModeratorComponent } from './layout/board-moderator/board-moderator.component';
import { BoardUserComponent } from './layout/board-user/board-user.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'HOME', component: HomeComponent },
  { path: 'LOGIN', component: LoginComponent },
  { path: 'REGISTER', component: RegisterComponent },
  { path: 'MENU', component: MenuComponent } ,
  { path: 'YOURBILL', component: YourbillComponent } ,
  { path: 'FOODDETAIL', component: FoodDetailComponent} ,
  { path: 'PROFILE', component: ProfileComponent },
  { path: 'USER', component: BoardUserComponent },
  { path: 'MOD', component: BoardModeratorComponent },
  { path: 'ADMIN', component: BoardAdminComponent, children: [ 
    
  ] },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
