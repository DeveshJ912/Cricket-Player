import { Component, OnInit, AfterViewInit,TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/services/playerService.service';
import { AlertService } from 'src/shared/common-services';
import { Cache } from 'src/shared/common-services/cache.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatTable} from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';


export interface UserData {
  id: string;
  name: string;
  country: string;
  fifty: string;
  century: number;
  matches: number;
}

@Component({
  selector: 'app-all-players',
  templateUrl: './all-players.component.html',
  styleUrls: ['./all-players.component.css']
})
export class AllPlayersComponent implements OnInit {
  players: any[] = [];
  isLoaded: boolean = false;
  spinner: boolean = false;

  displayedColumns: string[] = ['srno','id', 'name', 'country', 'fifty', 'century', 'matches', 'edit'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild('delete', { static: true }) delete: TemplateRef<any>;
  dialogRef: MatDialogRef<unknown, any>;
  private dialogSubscription: Subscription;

  constructor(private playerService: PlayerService, private cache: Cache, private router: Router,
    public dialog: MatDialog,
     private alert: AlertService) {
  }

  ngOnInit(): void {
    this.getAllPlayers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getAllPlayers() {
    this.spinner = true;
    this.playerService.getData().then(
      (resp: any) => {
        if (resp) {
          this.players = resp.results;
          this.spinner = false;
          this.dataSource = new MatTableDataSource(resp.results);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      (error: any) => {
        this.alert.error(error);
        this.spinner = false;
      }
    );
  }
  deletedata(row: any,index:any) {
    if(!this.cache.user.loggedIn){
      this.alert.warn("Please login to perform this action");
      return;
    }
    
    this.spinner = true;

    this.playerService.deleteData(row).then(
      (resp: any) => {
        if (resp) {
          console.log(resp);
          this.players = resp.results;
          this.spinner = false;
          this.table.renderRows();
          this.dataSource = new MatTableDataSource(resp.results);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.table.renderRows();
          this.alert.success("Player Deleted");

        }
      },
      (error: any) => {
        this.alert.error(error);
        console.log(error);
        this.spinner = false;
      }
    );
  }

  updatedata(row: any) {
    if(!this.cache.user.loggedIn){
      this.alert.warn("Please login to perform this action");
      return;
    }
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: row
    });
    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.alert.success("Player updated sucessfully");
        this.getAllPlayers();
      }
    });
  }

  addPlayer() {
    this.router.navigate(['/application/add-player'])
  }

}
