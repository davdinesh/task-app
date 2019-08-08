import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskAddComponent } from './task-add/task-add.component';
import { FullscreenOverlayContainer } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
    data: {title: 'View Task'}
  },
  {
    path: 'task-edit/:id',
    component: TaskEditComponent,
    data: {title: 'Update Task'}
  },
  {
    path: 'task-add',
    component: TaskAddComponent,
    data: {title: 'Add Task'}
  },
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
