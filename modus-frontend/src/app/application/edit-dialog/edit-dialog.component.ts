import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/services/playerService.service';
import { AlertService } from 'src/shared/common-services';
import { Cache } from 'src/shared/common-services/cache.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  createPlayer: FormGroup;
  playerDetails:any;

  constructor(private fb: FormBuilder,
    private playerService: PlayerService,
    private router: Router,
    private cache: Cache,
    private alert: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditDialogComponent>) {
    this.createForm();
  }

  ngOnInit(): void {
    this.playerDetails = this.data;
    this.createPlayer.patchValue(this.playerDetails);
   }

  get form() {
    return this.createPlayer.controls;
  }
  createForm() {
    this.createPlayer = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      country: ["", [Validators.required, Validators.minLength(3)]],
      fifty: ["", [Validators.required]],
      century: ["", [Validators.required]],
      matches: ["", [Validators.required]]
    });

  }

  edit(){
    let postData = this.createPlayer.getRawValue();
    postData.id = this.playerDetails.id;
    this.playerService.updateData(postData).then((resp: any) => {
      if (resp) {
        this.dialogRef.close(true);
        this.router.navigate(['/application/all-players'])
      }
    }, (error:any) => {
      this.alert.error(error);
    });
  }
  close(){
    this.dialogRef.close();
  }
}
