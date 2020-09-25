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
  testDetail;
  seTag:string;
  tags=[];
  constructor(private dataService:DataService,private router:Router) { }

  ngOnInit() {
    this.refreshStudents()
    

  }
  refreshStudents(){
    this.dataService.getAllStudents().subscribe(
      response=>{
        console.log(response)

        this.students=response['students'];
   
        this.allstudents=this.students
        
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
      
        return res.firstName.toLocaleLowerCase().startsWith(this.searchText.toLocaleLowerCase())||res.lastName.toLocaleLowerCase().match(this.searchText.toLocaleLowerCase());
        
      });
      this.students= this.searchStudent
      console.log(this.searchStudent)
    }else if(this.searchText ==""){
      this.ngOnInit();
    }

  }
  getDetail(i){
    this.tags=[]
    if(this.detail[i]==true){
      this.detail[i]=false;
    }else{
      this.detail[i]=true;
    }
    console.log(this.detail[i])
  }


  addTag(taginput:String,id){
    
    
   

    this.tags.push(
      taginput
    )
    this.students[id-1].tags=this.tags;
 

    console.log(this.tags)
    console.log(this.students)
  }


  searchTag(){ 
    this.searchStudent=this.allstudents
    if(this.searchText!=""){
    this.searchStudent=this.searchStudent.filter(res=>{
      
      return res.tags!==undefined;
      
    });
    this.searchStudent=this.searchStudent.filter(res=>{
      for(let i=0;i<res.tags.length;i++){
      return res.tags[i].match(this.seTag);
      }
    });
    console.log(this.searchStudent)
       
    this.students= this.searchStudent
   
  }else if(this.searchText ==""){
    this.ngOnInit();

  }

  }
  toggleClass(e) {
    const classList = e.target.classList;
    const classes = e.target.className;
    classes.includes('clicked') ? classList.remove('clicked') : classList.add('clicked');
  }
}
