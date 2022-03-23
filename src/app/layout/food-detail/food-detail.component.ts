import { ApiService } from './../../_services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { DetailService } from "../../detail.service";
import { ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import datap from "src/assets/data/datap.json";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit {
  editImage : string = "";
  actionBtn : string = "Add";
  productForm !: FormGroup;
  singleProduct: any = {};
  listProduct:any[]=datap.product;// product data 
  product: any;
  id: string | any;
  constructor( private api : ApiService, 
                private FormBuilder : FormBuilder, 
                @Inject(MAT_DIALOG_DATA) public editData : any,
                private dialogref : MatDialogRef<FoodDetailComponent>
            ) { }

  ngOnInit(): void {
    this.productForm = this.FormBuilder.group({
      id: [''],
      name: ["", Validators.required],
      price: ["", Validators.required],
      image: ["", Validators.required],
    });

    if(this.editData) {
      this.actionBtn = "Update";
      this.productForm.controls['id'].setValue(this.editData.id);
      this.productForm.controls['name'].setValue(this.editData.name);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['image'].setValue(this.editData.image);
    }
  }

  onSubmit(form:FormGroup) {
    console.log(form);
  }

  addProduct() {
    if(!this.editData) {
      if(this.productForm.valid) {
        this.singleProduct= {
          name: this.productForm.controls['name'].value,
          price: this.productForm.controls['price'].value,
          image: "assets/image/" + this.productForm.controls['image'].value.name,
        }
        this.api.postProduct(this.singleProduct).subscribe({
          next: (res) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your product has been added to the database',
              showConfirmButton: false,
              timer: 1500
            })
          },
            error:() => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: 'Please try again!'
              });
            }
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: 'Please try again!'
        });
      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    if(this.productForm.controls['image'].value.name) {
      this.productForm.controls['image'].setValue("assets/image/" + this.productForm.controls['image'].value.name);
    }
    this.api.putProduct(this.productForm.value, this.productForm.controls['id'].value).subscribe({
      next: (res) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your product has been updated',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: 'Please try again!'
        });
      }
    });
    
  }

  deleteProduct() {
    
  }



}
