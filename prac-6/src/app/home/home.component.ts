import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Observable } from 'rxjs-compat';
//Operators- What we use to filter, transform and sort data between observer and observable
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
private firstObsSubscription: Subscription;
  constructor() { }

  ngOnInit() {
// this.firstObsSubscription = interval(1000).subscribe(count =>{
//   console.log(count)
// })
const customIntervalObservable = Observable.create(observer=>{
  let count = 0;
  setInterval(()=>{
    observer.next(count);
    if(count === 2){
      observer.complete()
    }
    if(count >3){
      observer.error(new Error('Count is greater than 3!'))
    }
    count++;
  }, 1000)
})
this.firstObsSubscription= customIntervalObservable.pipe(filter((data:number)=>{
  return data > 0;
}),map((data:number)=>{
  return 'Round: ' + (data + 1)
})).subscribe(data=>{
  console.log(data)
}, error=>{
  console.log(error)
  //Errors cancel obserables, they dont complete it
},()=>{
  console.log('Complete')
}
);
  }

  ngOnDestroy(): void {
    
    this.firstObsSubscription.unsubscribe()

  }

}
