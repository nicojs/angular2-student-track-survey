import { Component } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';


// create a class with annotations..
@Component({
	selector: 'studenttrack-survey',
	template: `
	 <h1>{{title}}</h1>
	`
})
class SurveyApplication {
	public title = 'Studenttrack surveys';
}


// bootstrap our application..
bootstrap(SurveyApplication); 