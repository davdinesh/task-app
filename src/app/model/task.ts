import { ParentTask } from './parent-task';

export class Task {
    id: number;
    parentTask: ParentTask;
    task: string;
    startDate: Date;
    endDate: Date;
    priority: number;
}