import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 title = "angular test";
  postDetails: any;
  showLoadingIndicator: any;
  text!:'contact page';
  contactForm!: FormGroup ;
  contact = {
    name:'',
    email:'',
    text:''
  };
submitted = false;
 
constructor(private service : AppService){
    this.postDetails = [];
    this.createForm();
  }

  ngOnInit(){
    this.getPostDetails();
  }

  onSubmit(){
    this.submitted = true;
  }

  getPostDetails(){
    this.showLoadingIndicator = true;
    this.service.getPosts().subscribe((response:any) => {
      this.showLoadingIndicator = false;
      if(response && response.length > 0) {
        this.postDetails = response;
      } else {
        this.postDetails = [];
      }
    })
  }
  createForm(){
    this.contactForm = new FormGroup({
      'name' : new FormControl(this.contact.name,[
        Validators.required,
        Validators.minLength(4)
      ]),
      'email' : new FormControl(this.contact.email,[
        Validators.required,
        Validators.email
      ]),
      'text' : new FormControl(this.contact.name,[
        Validators.required,
      ]),
    })
  }
}