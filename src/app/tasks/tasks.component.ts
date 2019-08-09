import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Task } from '../model/task';
import { MatTableDataSource, MatSort } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  sampleData : any[] = [{"id":1,"parentTask":{"id":1,"name":"Design"},"task":"High Level Design","startDate":"2019-02-01","endDate":"2019-02-10","priority":3},{"id":2,"parentTask":{"id":1,"name":"Design"},"task":"Low Level Design","startDate":"2019-02-11","endDate":"2019-02-15","priority":5},{"id":3,"parentTask":{"id":2,"name":"Development"},"task":"Configuration update","startDate":"2019-08-08","endDate":"2019-08-10","priority":8},{"id":4,"parentTask":{"id":3,"name":"Testing"},"task":"Performance tuning","startDate":"2019-08-08","endDate":"2019-08-10","priority":17}];
  displayedColumns: string[] = ['task_name', 'parent_task','priority','start_date','end_date','actions'];
  data: Task[] = [];
  dataSource: any = null
  isLoadingResults = true;
  taskSearchForm: FormGroup;
  taskName : string = '';
  parentTaskName : string = '';
  priorityFrom : number;
  priorityTo : number;
  startDate : Date = null;
  endDate : Date = null;
  constructor(private api: ApiService,private formBuilder: FormBuilder) { }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.taskSearchForm = this.formBuilder.group({
      'taskName': null,
      'parentTaskName': null,
      'priorityFrom': null,
      'priorityTo': null,
      'startDate': null,
      'endDate' : null
    });
    this.api.getTasks()
    .subscribe(res => {
      this.data = res;
      this.dataSource = new MatTableDataSource<Task>(this.data);
      this.dataSource.sort = this.sort;
      console.log(res);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
  

}
