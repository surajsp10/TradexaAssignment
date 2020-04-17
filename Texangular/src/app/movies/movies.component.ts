import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormGroup, FormControl, Validators  } from '@angular/forms';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  get email() {
    return this.form.get('email');
  }
  get review() {
    return this.form.get('review');
  }
  movies;
  selectedmoviename:any;
  selectedmovieid:any;
  inputData: any;
 

  constructor(public http: HttpClient) {

   }
   form = new FormGroup({
    email : new FormControl('', [Validators.required,Validators.pattern("[^ @]*@[^ @]*")]),
   review : new FormControl('', [Validators.required]),
  
    });

  ngOnInit() {
  }
  search(event) {
    this.inputData = event.target.value;
    console.log(this.inputData);
    // tslint:disable-next-line: max-line-length
    this.http.get<any>('http://www.omdbapi.com/?&apikey=b5546e6e&s=' + this.inputData).subscribe(data => {
   this.movies = data.Search;
  }, );
  }

  click(movie){
    // console.log(movie.Title);
    // console.log(movie.imdbID)
    //this.selectedmovie = movie.value;
    console.log(movie);
    this.selectedmovieid=movie.imdbID;
    this.selectedmoviename=movie.Title;
  }
  
  
  ReviewData(form){
  
    console.log(form.value);
    console.log(this.selectedmovieid);
    console.log( this.selectedmoviename)
    let user = { 'movieid': this.selectedmovieid,'moviename': this.selectedmoviename,'emailid':form.value.emailid , 'review': form.value.review };
    console.log(user)
    localStorage.setItem('selectedmoviereview', JSON.stringify(user));
    this.form.reset();
    
    
    
  }

}
