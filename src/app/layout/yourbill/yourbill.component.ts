import { Component, OnInit } from '@angular/core';
import { ShareService } from "../../share.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-yourbill',
  templateUrl: './yourbill.component.html',
  styleUrls: ['./yourbill.component.css']
})
export class YourbillComponent implements OnInit {
  CardItems: any[]=[];
  totalOneItem:any ;
  totalPrice: number;
  constructor(private share: ShareService) { }
  ngOnInit(): void {
    /// lay du lieu tu service
    this.CardItems = this.share.listItemR.map(this.TotalOne);
    this.totalPrice = this.CardItems.reduce(this.TotalCoin,0)// tinh tong tien
    console.log(this.totalPrice);
  }
  //tinh tong
  TotalCoin(acc,curV){
    return acc + curV.Total 
  }
  TotalOne(arr){
    return {
      Id: arr.Id,
      ProName: arr.ProName,
      Price: arr.Price,
      ImageUrl:arr.ImageUrl,
      Quantity:arr.Quantity,
      Total:arr.Quantity*arr.Price
    }
  }
  //xu ly nut tang va cap nhat lai mang
  increaseQuantity(i){
    this.CardItems.forEach(e => {
      if (e.Id == i.Id) {
        e.Quantity = e.Quantity + 1 
        e.Total = e.Quantity* e.Price
        console.log(e.Total);    
        this.totalPrice= this.totalPrice + e.Price
        console.log(this.totalPrice );   
      }
    });
  }
  //xu ly nut giam va cap nhat lai mang
  decreaseQuantity(i){
    this.CardItems.forEach(e => {
      if (e.Id == i.Id) {
        e.Quantity = e.Quantity - 1 
        if (e.Quantity < 0) {
            e.Quantity=0
            this.totalPrice=0
        }
        else{
          e.Total = e.Quantity* e.Price
          this.totalPrice= this.totalPrice - e.Price
        }
      }
    });
  }
  // xoa va cap nhat lai mang
  del(i){
    for (let e = 0; e < this.CardItems.length; e++) {
        if(i.Id==this.CardItems[e].Id){
            this.CardItems.splice(e,1)
        }
    }
    this.CardItems.forEach(e => {
        this.totalPrice= this.totalPrice - i.Total
    })
    if (this.CardItems.length==0) {
        this.totalPrice=0
    }
  } 
} 
