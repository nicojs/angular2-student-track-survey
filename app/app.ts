import { Component } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Student, StudentTrack} from './models/student';
import {StudentDetails} from './components/studentdetails';
import {StudentTrackService} from './services/studenttrackservice';
import {StudentService} from './services/studentservice';
import {DemoFormSku} from './form';
import 'rxjs/Rx';

// create a class with annotations..
@Component({
    selector: 'student-track-survey',
    template: `
	<demo-form-sku></demo-form-sku>
	<div *ngFor="#studentTrack of studentTracks" class="studenttrack light-primary-color text-primary-color">
	   <h1 class="dark-primary-color text-primary-color">Student track {{studentTrack.name}} (<span [textContent]="studentTrack.getStudents().length"></span> attendees)</h1>
	    <student-details 
			[student]="student" 
			[isSelected]="currentStudent === student"
			*ngFor="#student of studentTrack.getStudents()"
            (deleted)="removeStudent(studenttrack, student)" 
			(selected)="setSelected(student)"> 
		</student-details>
	 </div>
	`,
    styles: [`
	 .student { padding:15px; }
	 .studentTrack { border:1px solid black;margin:5px;padding:0px; }
	 .studentTrack h1 { margin:0px;padding:15px;}
	`],
    directives: [StudentDetails/*, DemoFormSku*/]
})
export class SurveyApplication {
    public studentTracks: StudentTrack[];
    public currentStudent: Student;

    constructor(studentTrackService: StudentTrackService) {
        this.studentTracks = [];
        studentTrackService.getStudentTracks().subscribe(studentTracks => this.studentTracks = studentTracks);
    }

    setSelected(student: Student) {
        console.log(`student selected ${student.firstname}`);
        this.currentStudent = student;
    }

    removeStudent(track, student) {
        track.removeStudent(student);
    }
}

// bootstrap our application..
bootstrap(SurveyApplication, [StudentTrackService, StudentService, HTTP_PROVIDERS]); 