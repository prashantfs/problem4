import { Component, ViewChild } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { DataService } from './services/data.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { UIChart } from 'primeng/chart';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  stageData = []
  title = 'client-angular';
  message = 'Hello';
  barData$: Observable<any>;
  @ViewChild('chart', {static: false}) chart: UIChart;

  constructor(private service: DataService, private http:HttpClient) {
    //in 10 seconds do something
    interval(5000).subscribe(x => {
      this.getDAta()
    });
  }

  ngOnInit() {
  //   setTimeout(() => {
  //     this.getDAta()
  // }, 1000);
    // this.courses$ = this.http
    //         .get<any>("https://c0b2-27-4-102-9.in.ngrok.io/getMessage")
    //         .map(data => _.values(data))
    //         .do(console.log);
    // this.stageData.push(
    //   {stage: 1, sender: 1, receiver: 2, interutted: true, completed: false},
    //   {stage: 2, sender: 1, receiver: 2, interutted: true, completed: false},
    //   {stage: 3, sender: 1, receiver: 2, interutted: true, completed: false},
    //   {stage: 4, sender: 1, receiver: 2, interutted: false, completed: true},
    //   {stage: 1, sender: 2, receiver: 1, interutted: false, completed: false},
    // )
    // console.log(this.stageData)
  }

  async getDAta() {
    let tempdata = await this.http.get<any>("https://61ff-27-4-102-9.in.ngrok.io/getMessage").toPromise()
    console.log(tempdata)
    this.stageData = tempdata
  }

  sendToServer($event) {
    // https://c0b2-27-4-102-9.in.ngrok.io/
    // this.subject.next(this.message);
    this.service.connect().error({code: 4000, reason: 'I think our app just broke!'});
    
  }
  unsubscribe($event) {
    this.service.connect().unsubscribe();
  }

  subscribe($event) {
    this.service.connect().subscribe();
  }

  getProgressBarData(value: any) {
    return (value/4) * 100
  }
  getStatusOfVillageCssMargin(value: any) {
    return '0%'
    if (value === 1) {
      return '0%'
    } else if (value === 2) {
      return '25%'
    } else if (value === 3) {
      return '75%'
    } else if (value === 4) {
      return '100%'
    }
  }
  getStatusOfVillage(value: any) {
    return value
    if (value === 1) {
      return 'At General 1'
    } else if (value === 2) {
      return 'At Village boundry'
    } else if (value === 3) {
      return 'Village Passed'
    } else if (value === 4) {
      return 'At General 2'
    }
  }
  getStatusOfVillage1(value: any) {
    return value
    if (value === 1) {
      return 'At General 2'
    } else if (value === 2) {
      return 'Village Passed'
    } else if (value === 3) {
      return 'At Village boundry'
    } else if (value === 4) {
      return 'At General 1'
    }
  }
  getStatusOfVillageCssMargin1(value: any) {
    if (value === 1) {
      return '100%'
    } else if (value === 2) {
      return '75%'
    } else if (value === 3) {
      return '25%'
    } else if (value === 4) {
      return '0%'
    }
  }

  getColor(interuption: any) {
    if(interuption== true) {
      return '#FF0000'
    } else {
      return '#488aff'
    }

  }
}
