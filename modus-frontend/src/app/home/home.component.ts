import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private router:Router) { }
  ngOnInit(): void {
    
  }
  goToPlayers(){
    this.router.navigate(['/application']);
  }
}
