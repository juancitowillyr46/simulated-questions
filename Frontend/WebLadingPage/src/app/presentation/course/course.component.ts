import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from "jquery";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  public courses = [
    {title: "PROFESSIONAL SCRUM MASTER I", description: '', key: 'PSMI'},
    {title: "AGILE CERTIFIED PRACTITIONER", description: '', key: 'ACP'},
    {title: "PROFESSIONAL AGILE LEADERSHIP", description: '', key: 'PAL'},
    {title: "PROFESSIONAL SCRUM PRODUCT OWNER", description: '', key: 'PSPO'}
  ];

  public course: {title: string, description: string, key: string};
 

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const that = this;
    $('html, body').animate({ scrollTop: 0 }, 100);
    that.route.paramMap.subscribe(params => {
      // console.log(params.get('key'));
      // console.log(params.get('key'));
      if(params.get('key')){
        that.course = that.courses.find(f => f.key == params.get('key'));
      };
    });
  }

}
