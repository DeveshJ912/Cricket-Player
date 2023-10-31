import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AllPlayersComponent } from './all-players/all-players.component';
import { SharedModule } from 'src/shared/shared.module';
import { ApplicationRoutingModule } from './application-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { ApplicationComponent } from './application.component';
import { AddPlayerComponent } from './add-player/add-player.component';


@NgModule({
  declarations: [
    LoginComponent,
    AllPlayersComponent,
    AddPlayerComponent,
    EditDialogComponent,
    ApplicationComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ApplicationModule { }
