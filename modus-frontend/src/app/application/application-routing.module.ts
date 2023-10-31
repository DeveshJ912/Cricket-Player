import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AllPlayersComponent } from "./all-players/all-players.component";


import { AuthGuard } from '../../guard/auth.guard';
import { AppComponent } from "../app.component";
import { ApplicationComponent } from "./application.component";
import { AddPlayerComponent } from "./add-player/add-player.component";

const routes: Routes = [
  {
    path:'',component:ApplicationComponent,
    children:[
      { path: "", redirectTo: "all-players", pathMatch: "full" },
      { path: "login", component: LoginComponent },
      { path: "all-players", component: AllPlayersComponent },
      { path: "add-player", component: AddPlayerComponent,canActivate: [AuthGuard] },
    
    ]
  }
  
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class ApplicationRoutingModule {}
