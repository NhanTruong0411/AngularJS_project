import { Component, OnInit } from '@angular/core';
import { ShareService } from "../../share.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';

import datap from "src/assets/data/datap.json";
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  listProduct: any[]=datap.product;
  tick=false
  constructor(private share: ShareService) { }

  ngOnInit(): void {
  }

  order(i){
  if (this.share.listItemR.length==0) {
      this.tick=false
  } else {
    this.share.listItemR.forEach(e => {
      if(e.ProName==i.ProName){
        this.tick=true
      }
    });
  }
  if (this.tick==false) {
      this.share.listItemR.push({
        Id:i.Id,
        ProName:i.ProName,
        ImageUrl:i.ImageUrl,
        Price: i.Price,
        Quantity: 1 
      }),
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your product has been added to the cart',
        showConfirmButton: false,
        timer: 1500
      })
  }
  else{
    this.share.listItemR.forEach(e => {
      if (e.Id==i.Id) {
          e.Quantity = e.Quantity+1
      }
    });
  }

  console.log(this.share.listItemR);

  }
  
}
