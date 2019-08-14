import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Task } from '../model/task';
import { TaskSearchCriteria } from '../model/task-search-criteria';
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
  filteredData : Task[] = [];
  dataSource: any = null
  isLoadingResults = true;
  taskFilter: TaskSearchCriteria = new TaskSearchCriteria();
  
  constructor(private api: ApiService,private formBuilder: FormBuilder) { }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
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
  
  reset() {
    this.taskFilter = {
      "taskName" : null,
      "parentTaskName" : null,
      "startDate" : null,
      "endDate" : null,
      "priorityFrom" : '',
      "priorityTo" : ''
    };
    this.getTasks();
  }

  applyFilter(criteria : TaskSearchCriteria) {
    console.log("Apply Filter : " + criteria);
    this.api.getFilteredTasks(criteria)
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

  endTask(taskObj : Task) {
    this.isLoadingResults = true;
    let now = new Date();
    taskObj.endDate = now;
    this.api.updateTask(taskObj.id, taskObj)
      .subscribe(res => {
        let id = res['id'];
        this.isLoadingResults = false;
        this.getTasks();
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  taskEnded(taskObj : Task) {
    let now = new Date();
    if (taskObj.endDate = now) {
      return true
    } else {
      return false;
    }
  }
  

}
