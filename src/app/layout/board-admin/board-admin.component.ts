import { FoodDetailComponent } from './../food-detail/food-detail.component';
import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { User_Data } from '../../models/user.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from './../../_services/api.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css'],
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  data:User_Data[] | any = [] ;
  listProduct:any[]= [];
  displayedColumns: string[] = ['id', 'name', 'price', 'image', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private userService: UserService, 
              public dialog: MatDialog, 
              private api : ApiService, 
              
    ) { }

  ngOnInit(): void {

    this.userService.getAdminBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });

    this.userService.getAllUser().subscribe({
      next: data => {
        let json = data;
        this.data = JSON.parse(json);
      },
      error: err => {
        this.data = JSON.parse(err.error).message;
      }
    });

    this.getAllProduct();

  }

  openProductDialog() {
    this.dialog.open(FoodDetailComponent, {
      width: '500px',
    }).afterClosed().subscribe(result => {
      this.getAllProduct();
    });
  } 

  getAllProduct() {
    this.api.getProduct().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  editProduct(row:any) {
    this.dialog.open(FoodDetailComponent, {
      width: '500px',
      data: row
    }).afterClosed().subscribe(result => {
      this.getAllProduct();
    });

  }

  deleteProduct(row:any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.api.deleteProduct(row.id).subscribe({
          next: (res) => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.getAllProduct();
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: 'Please try again!'
            });
          }
        })
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}