import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ErrorComponent } from "./error/error.component";

// import { AppLogin } from "./account/login/login.component";
// import { AppSignUp } from "./account/sign-in/sign-in.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "application", redirectTo: "application", pathMatch: "full" },

  { path: "home", component: HomeComponent },
    // { path: "sign-in", component: AppSignUp },
  {
    path: "application",
    
    loadChildren: () =>
    import("./application/application.module").then(m => m.ApplicationModule)
  },
  { path: "error", component: ErrorComponent },
  { path:'**',redirectTo:'error'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      scrollPositionRestoration: "top"
    })
  ],
  exports: [RouterModule],
  declarations: []
})
export class CustomerAppRoutingModule {}
