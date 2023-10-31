import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/services/playerService.service';
import { AlertService } from 'src/shared/common-services';
import { Cache } from 'src/shared/common-services/cache.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {
  playerForm: FormGroup;
  spinner:boolean=false;

  constructor(private fb: FormBuilder, private playerService: PlayerService, private router: Router, private cache: Cache,private alert:AlertService) {
    this.createForm();
  }

  ngOnInit(): void { }


  get form() {
    return this.playerForm.controls;
  }
  createForm() {
    this.playerForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      country: ["", [Validators.required, Validators.minLength(3)]],
      fifty: ["", [Validators.required]],
      century: ["", [Validators.required]],
      matches: ["", [Validators.required]]
    });

  }

  addPlayer() {
    let postData = this.playerForm.getRawValue();

    this.spinner =true;
    this.playerService.addPlayer(postData).then((resp: any) => {
      if (resp) {
        this.spinner=false;
        this.alert.success("Player Added");
        this.router.navigate(['/application/all-players'])
      } else {
        this.spinner=false;
        this.alert.error(resp.message)
        console.log("in error");
      }
    }, (error) => {
      this.alert.error(error);

    });
  }
}

