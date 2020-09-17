// import { Component, OnInit } from '@angular/core';
import { Component,  OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GlobelServiceService } from "../globel-service.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

new = [
  {
    pos : "1",
    order :1

  },
  {
    pos : "2",
    order :2
  },
  {
    pos : "3",
    order :3
  },
  {
    pos : "4",
    order :4
  }
];
  Movies = 
    [{task:"eat breakfast",order:1},
      {task:"eat lunch",order:2},
      {task:"eat dinner",order:3}
]
  ;

  

  drop(event: CdkDragDrop<any[]>): void { 
    if (event.previousContainer === event.container) { 
      moveItemInArray(this.Movies, event.previousIndex, event.currentIndex); 
    } else { 
      transferArrayItem(event.previousContainer.data, this.Movies, event.previousIndex, event.currentIndex); 
      //if transfer, recalculate the order of previous (the list from drag)
      event.previousContainer.data.forEach((x,index)=>{
        x.order=index
      })
      
    }
    //always, recalculate the order of the container (the list to drag)
    this.Movies.forEach((x,index)=>{
      x.order=index
    })
    console.log(this.Movies);
    
    console.log('previos:'+ event.previousIndex,'current:'+ event.currentIndex);
    
  }

  drop1(event: CdkDragDrop<any[]>): void { 
    if (event.previousContainer === event.container) { 
      moveItemInArray(this.new, event.previousIndex, event.currentIndex); 
    } else { 
      transferArrayItem(event.previousContainer.data, this.new, event.previousIndex, event.currentIndex); 
      //if transfer, recalculate the order of previous (the list from drag)
      event.previousContainer.data.forEach((x,index)=>{
        x.order=index
      })
      
    }
    //always, recalculate the order of the container (the list to drag)
    this.new.forEach((x,index)=>{
      x.order=index
    })
    console.log(this.new);
    
    console.log('previos:'+ event.previousIndex,'current:'+ event.currentIndex);
    
  }

  save(){
    console.log(this.new);
    // let data ;
    // data.pos_1 = this.new;
    // data.comp_num = '56';

    this.service.postdata({pos_1 : this.new,
    comp_num : '56'}).subscribe(res=>{
      if(res){
        if(res['status']== '1'){
          alert("inserted successfully")
        }
      }
    });
  }

  constructor( 
    private service: GlobelServiceService,
    private router: Router,
    private http: HttpClient,){

  }
  pos;
  ngOnInit(){
    this.service.getData({comp_num :'56'}).subscribe(res=>{
      
      this.pos =JSON.parse(JSON.stringify(res['data'].pos_1));
      console.log(this.pos)
    });

      

  }

}
