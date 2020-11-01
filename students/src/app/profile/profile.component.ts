import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';



export class Student{
  constructor(
    public city:String,
    public company: String,
    public email: String,
    public firstName: String,
    public grades:Array<String>,
    public id:String,
    public lastName:String,
    public pic:String,
    public skill:String,
    public tags:Array<String>,
  ){ }
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  searchStudent:Student[]=[];
  students:Student[]=[];
  allstudents:Student[]=[];
  searchText: string;
  detail=new Array;
  seTag:string;
  tags=[];
  constructor(private dataService:DataService,private router:Router) { }

  ngOnInit() {
    this.dataService.getAllStudents().subscribe(
      response=>{
        
        this.students=response['students'];
   
        this.allstudents=this.students;
      }
    )
  
  }

  getAverage(grades):number{
   
    let sum=0;

    for(let i=0;i<grades.length;i++){
       
      sum+=Number(grades[i]);

    }
    
    return sum/grades.length
  }

  search(){ 
    this.searchStudent=this.allstudents
   
    if(this.searchText!=""){
      
      this.searchStudent=this.searchStudent.filter(res=>{
 
        let fullName=res.firstName.concat(res.lastName.toString())
 
        return res.firstName.toLocaleLowerCase().startsWith(this.searchText.toLocaleLowerCase())||res.lastName.toLocaleLowerCase().match(this.searchText.toLocaleLowerCase())
        ||fullName.toLocaleLowerCase().startsWith(this.searchText.toLocaleLowerCase());
        
      });

      this.students= this.searchStudent;

    }else if(this.searchText ==""){
      

    }

  }

  getDetail(i){

    this.tags=[];

    this.detail[i] =!this.detail[i]; 

  }


  addTag(taginput:String,id){
    
    this.tags.push(
      taginput
    )

    this.students[id-1].tags=this.tags;
 
  }

  searchTag(){ 

    this.searchStudent=this.allstudents;

    if(this.searchText!=""){

      this.searchStudent=this.searchStudent.filter(res=>{
      
      return res.tags!==undefined;
      
    });

    this.searchStudent=this.searchStudent.filter(res=>{
     
      for(let i=0;i<res.tags.length;i++){

        return res.tags[i].match(this.seTag);
      
      }

    });
   
       
    this.students = this.searchStudent;
   
    }else if(this.searchText ==""){

  }
  
  }

  toggleClass(e) {
    
    const classList = e.target.classList;
    
    const classes = e.target.className;
   
    classes.includes('clicked') ? classList.remove('clicked') : classList.add('clicked');
  }
}
