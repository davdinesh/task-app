import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-menu',
  templateUrl: './task-menu.component.html',
  styleUrls: ['./task-menu.component.css']
})
export class TaskMenuComponent implements OnInit { 
  
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    
  }

}
