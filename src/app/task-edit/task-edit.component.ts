import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormBuilder } from '@angular/forms';
import { ParentTask } from '../model/parent-task';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

  taskForm: FormGroup;
  id: number;
  task: string = '';
  startDate: Date = null;
  endDate: Date = null;
  parentTasks: ParentTask[] = [];
  parentTaskId: number = null;
  isLoadingResults = false;
  parentTask: FormControl = new FormControl();
  priority: FormControl = new FormControl();
  priorityValue: number = null;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getTask(this.route.snapshot.params['id']);
    this.taskForm = this.formBuilder.group({
      'task': [null, Validators.required],
      'parentTask': [null, Validators.required],
      'priority': [null, Validators.required],
      'startDate': [null, Validators.required],
      'endDate': [null, Validators.required]
    });
    //this.parentTasks = [{ "id": 1, "name": "Analysis" }, { "id": 2, "name": "Design" }];
    this.api.getParentTasks()
    .subscribe(res => {
      this.parentTasks = res;
      console.log(this.parentTasks);
    }, err => {
      console.log(err);
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.updateTask(this.id, form)
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

  getOptionText(option?: ParentTask) {
    return option ? option.name : undefined;
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }
    //this.taskForm.get('priority').setValue(value);
    return value;
  }

  onChange(event) {
    this.taskForm.get('priority').patchValue(event.value);
    console.log("event value : " + this.taskForm.get('priority').value);
  }

  getTask(id) {
    this.api.getTask(id).subscribe(data => {
      this.id = data.id;
      this.parentTaskId = data.parentTask.id;
      this.parentTask.setValue(data.parentTask);
      this.taskForm.setValue({
        task: data.task,
        parentTask: data.parentTask,
        priority: data.priority,
        startDate: data.startDate,
        endDate: data.endDate
      });
    });
  }


}
