import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Task } from './model/task';
import { ParentTask } from './model/parent-task';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = "api/tasks";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getTasks (): Observable<Task[]> {
    return this.http.get<Task[]>(apiUrl + "/")
      .pipe(
        tap(item => console.log('Fetched Tasks')),
        catchError(this.handleError('getTasks',[]))
      );
  }

  getTask (id : number): Observable<Task> {
    const url = apiUrl + "/" + id;
    return this.http.get<Task>(url)
      .pipe(
        tap(_ => console.log('fetched task id=' + id)),
        catchError(this.handleError<Task>('getTask id=${id}'))
      );
  }

  addTask (task): Observable<Task> {
    return this.http.post<Task>(apiUrl+"/create", task, httpOptions).pipe(
      tap((task: Task) => console.log('added task w/ id=' + task.id)),
      catchError(this.handleError<Task>('addTask'))
    );
  }

  updateTask(id : number, task): Observable<any> {
    const url = apiUrl + "/update/" + id;
    return this.http.put(url, task, httpOptions).pipe(
      tap(_ => console.log('updated task id=${id}')),
      catchError(this.handleError<any>('updateTask'))
    );
  }

  deleteTask (id : number): Observable<Task> {
    const url = `${apiUrl}/${id}`;
    
    return this.http.delete<Task>(url, httpOptions).pipe(
      tap(_ => console.log('deleted task id=${id}')),
      catchError(this.handleError<Task>('deleteTask'))
    );
  }

  getParentTasks (): Observable<ParentTask[]> {
    return this.http.get<ParentTask[]>(apiUrl + "/parentTasks")
      .pipe(
        tap(item => console.log('Fetched Tasks')),
        catchError(this.handleError('getParentTasks',[]))
      );
  }
}
