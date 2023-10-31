import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { PlayerService } from 'src/app/services/playerService.service';
import { Cache } from 'src/shared/common-services/cache.service';
// import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from 'src/shared/common-services';

@Component({
  selector: 'app-my-players',
  template: `<router-outlet></router-outlet>`,
//   styleUrls: ['./my-players.component.css']
})
export class ApplicationComponent {
}
