import { Component, OnInit } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

import { GlobelServiceService } from "../globel-service.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  Batsman: any;
  bowlers:any
  positions: any;
  pos: any = ['Batsman','Bowler'];

  Dragform: FormGroup;

  myStorage = window.localStorage;
  constructor(
    private service: GlobelServiceService,
    private router: Router,
    private http: HttpClient,
    private formBiuld: FormBuilder
  ) {}

  ngOnInit() {
    this.Batsman = this.service.Batsmans;
    this.bowlers = this.service.Bowlers;

    console.log(this.Batsman,this.bowlers);
this.service.getData({comp_num :'56'}).subscribe(res=>{
  console.log(res)
})
  
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    moveItemInArray(this.pos, event.previousIndex, event.currentIndex);
//   this.service.updateItem({"pos_1": Object.keys(this.pos)}).subscribe(res=>{
//   console.log(res)
// })
  }

  logOut() {
    this.service.removeLocalStorage("User");
    this.router.navigate(["login"]);
  }

 
}











 // formInitialize() {
  //   this.Dragform = this.formBiuld.group({
  //     title: [""],
  //     index: [],
  //   });
  // }