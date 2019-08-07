import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { ParentTask } from '../model/parent-task';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {

  taskForm: FormGroup;
  id: string='';
  //parentTask: ParentTask = null;
  task: string='';
  priority: number = null;
  startDate: Date = null;
  endDate: Date = null;
  parentTasks : ParentTask[] = [];
  parentTaskId : number = null;
  isLoadingResults = false;
  parentTaskControl : FormControl = new FormControl();
  priorityControl : FormControl = new FormControl();
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      'task' : [null, Validators.required],
      'parentTask' : [null, Validators.required],
      'priority' : [null, Validators.required],
      'startDate' : [null, Validators.required],
      'endDate' : [null, Validators.required]
    });
    this.api.getParentTasks()
    .subscribe(res => {
      this.parentTasks = res;
      console.log(this.parentTasks);
    }, err => {
      console.log(err);
    });
  }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    console.log("Task Form :: " + form)
    this.api.addTask(form)
      .subscribe(res => {
          let id = res['id'];
          this.isLoadingResults = false;
          this.router.navigate(['/tasks']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

  selectedclient(event) {
    console.log(event.option.value);
    this.parentTaskId = event.option.value.id;
    this.taskForm.controls['parentTask'].setValue(event.option.value);
    console.log("Parent Task id : " + this.parentTaskId)
  }

  getOptionText(option? : ParentTask) {
    return option? option.name : undefined;
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }
    this.taskForm.get('priority').setValue(value);
    return value;
  }

}
