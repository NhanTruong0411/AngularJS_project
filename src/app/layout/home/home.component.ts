import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { DomSanitizer, SafeUrl} from '@angular/platform-browser';
// import { Router } from '@angular/router';
import { ShareService } from "../../share.service";
import { DetailService } from "../../detail.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import datap from "src/assets/data/datap.json";
import { UserService } from 'src/app/_services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  phoneRegex = '^[0-9]{10,11}$';
  contactForm:FormGroup | any;
  listCarosel :any[]=datap.carosel;//carosel data
  listProduct:any[]=datap.product;// product data 
  caroActive : any[]=[];// caroselActive data
  Carosel: any[]=[];// carosel data
  // bien xu ly local url
  listLocation: any[]=datap.location;// location data
  listLocalSafe : any[]=[];
  localurl: SafeUrl
  //bien co danh dau 
  tick=false

  content?: string;

  /////////
  constructor(private dom:DomSanitizer,//xu ly url
              // private router:Router,   
              private share: ShareService,//service de send data 
              private detailP: DetailService,
              private userService: UserService
              ){}
    
  ngOnInit(): void {
    this.userService.getPublicContent().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      },
    });
    //
    this.caroActive = this.listCarosel.filter(function(i) {  // xu ly active carosel boostrap
      return i.name=='hero'
    })
    //
    this.Carosel = this.listCarosel.filter(function(i) {
      return i.name!='hero'
    })
    ///// su ly url   
    this.listLocation.forEach( e  => {
      this.listLocalSafe.push({
        id:e.id,
        image:e.image,
        name:e.name,
        content1: e.content1,
        content2: e.content2,
        local: this.localurl=this.dom.bypassSecurityTrustResourceUrl(e.local)}); //safe url 
    });

    this.initForm();
  }

  detail(i){
    console.log(i);
    this.detailP.datailProduct=i
    console.log("this service" ,this.detailP.datailProduct);
    
  }   

  order(i){ //lay ra va gui di 
    // gui di va loc trung de tang so luong
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
            e.Quantity =e.Quantity+1
        }
      });
    }
  }

  initForm() {
    this.contactForm = new FormGroup({
      'fullname': new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      'mail': new FormControl(null, [Validators.required, Validators.pattern(this.emailRegex)]),
      'phone': new FormControl(null, [Validators.required, Validators.pattern(this.phoneRegex)]),
      'info': new FormControl(null, [Validators.required]),
      'content': new FormControl(null, [Validators.required])
    });
  }

  onSubmit(contactForm: FormGroup) {
    if(contactForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: 'Please fill out the form correctly!'
      })
    } else {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your message has been sent. We will get back to you soon.',
        showConfirmButton: false,
        timer: 1500
      })
      this.contactForm.reset();
    }
  }


}
