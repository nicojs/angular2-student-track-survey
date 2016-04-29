import {Component, EventEmitter} from 'angular2/core';
import {Student} from '../models/student';
import { StudentFormatter } from '../pipes/studentFormatter';


@Component({
    selector: 'student-details',
    inputs: ['student', 'isSelected'],
    outputs: ['selected', 'deleted'],
    pipes: [StudentFormatter],
    template: `
	<div class="student"><span (click)="setSelected()" [class.defaultPrimaryColor]="isSelected"  [innerHtml]="student | studentFormatter">
	</span><button (click)="onDeleted()">remove</button></div>
	`
})
export class StudentDetails {
    student: Student;
    isSelected: boolean;
    selected: EventEmitter<Student> = new EventEmitter<Student>();
    deleted: EventEmitter<Student> = new EventEmitter<Student>();

    setSelected() {
        this.selected.emit(this.student);
    }
    onDeleted() {
        this.deleted.next(this.student);
    }
}