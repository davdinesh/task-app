import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Task } from '../model/task';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  
  displayedColumns: string[] = ['task_name', 'parent_task','priority','start_date','end_date','actions'];
  data: Task[] = [];
  dataSource: any = null
  isLoadingResults = true;
  constructor(private api: ApiService) { }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
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
