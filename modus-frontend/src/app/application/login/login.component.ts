import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/services/playerService.service';
import { AlertService, CustomValidators } from 'src/shared/common-services';
import { Cache } from 'src/shared/common-services/cache.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  signIn = true;
  spinner: boolean = false;

  constructor(private fb: FormBuilder,
    private playerService: PlayerService,
    private router: Router,
    private cache: Cache,
    private alert: AlertService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.loginForm.get('firstname')?.disable();
    this.loginForm.get('lastname')?.disable();
  }

  get form() {
    return this.loginForm.controls;
  }
  createForm() {
    this.loginForm = this.fb.group({
      firstname: ["", [Validators.required, Validators.minLength(3)]],
      lastname: ["", [Validators.required, Validators.minLength(3)]],

      email: ["", [Validators.required, CustomValidators.emailValidator]],
      password: ["", [Validators.required, Validators.minLength(8)]]
    });

  }


  login() {
    let postData = this.loginForm.getRawValue();
    postData.name = postData.firstname + " " + postData.lastname
    this.cache.user.email = this.loginForm.get('email')?.value;
   
    this.cache.set("user", this.cache.user);
    if (this.signIn) {
      this.spinner = true;
      this.playerService.login(postData).then((resp: any) => {
        if (resp) {
          this.alert.success("You are successfully logged in");
          this.spinner = false;
          this.cache.user.name = resp.user?.name;
          this.cache.user.email = resp.user?.email;
          this.cache.user.loggedIn = true;
          this.cache.set("user", this.cache.user);
          this.router.navigate(['/application/all-players'])
        }
      }, (error) => {
        this.spinner = false;
        this.alert.error(error);
      });
    } else {
      postData.name = postData.firstname + " " + postData.lastname
      this.spinner = true;
      this.playerService.signUp(postData).then((resp: any) => {
        if (resp) {
          console.log(resp);
          this.cache.user.name = resp.data?.user?.name;
          this.cache.user.email = resp.data?.user?.email;
          this.cache.user.loggedIn = true;
          this.spinner = false;

          this.cache.set("user", this.cache.user);
          this.alert.success("You are successfully logged in");

          this.router.navigate(['/application/all-players'])

        }
      }, (error) => {
        this.spinner = false;
        this.alert.error(error);
      });
    }


  }
  signInToggle() {
    this.loginForm.reset();
    this.signIn = !this.signIn;
    if (this.signIn) {
      this.loginForm.get('firstname')?.disable();
      this.loginForm.get('lastname')?.disable();
    } else {
      this.loginForm.get('firstname')?.enable();
      this.loginForm.get('lastname')?.enable();
    }
  }
}
