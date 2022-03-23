import { Component, OnInit } from '@angular/core';
import datap from 'src/assets/data/datap.json';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  listpage:any =datap.pages;
  constructor() { }

  ngOnInit(): void {
  }

}
