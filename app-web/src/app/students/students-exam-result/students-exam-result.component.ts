import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { 
//   faFileAlt, 
//   faChevronRight, 
//   faListUl, 
//   faClock, 
//   faPlay, 
//   faHistory, 
//   faChevronLeft, 
//   faArrowCircleLeft, 
//   faArrowCircleRight, 
//   faSave, 
//   faSpinner, 
//   faCheck, 
//   faCheckCircle,
//   faPen, 
//   faCheckSquare, 
//   faSquare } from '@fortawesome/free-solid-svg-icons';
// ;

@Component({
  selector: 'app-students-exam-result',
  templateUrl: './students-exam-result.component.html',
  styleUrls: ['./students-exam-result.component.css']
})
export class StudentsExamResultComponent implements OnInit {

  constructor() { 
    // library.add(
    //   faFileAlt, 
    //   faChevronRight, 
    //   faListUl, 
    //   faClock, 
    //   faPlay, 
    //   faHistory, 
    //   faChevronLeft, 
    //   faChevronRight, 
    //   faArrowCircleLeft, 
    //   faArrowCircleRight,
    //   faSave,
    //   faSpinner,
    //   faCheck,
    //   faPen,
    //   faCheckCircle,
    //   faSquare,
    //   faCheckSquare
    // );

  }

  ngOnInit() {

    
    var myPieChart = new Chart(document.getElementById('realtime'), {
        type: 'pie',
        data: {
          labels: ['Correctas' + 12, 'Incorrectas' + 19],
          datasets: [{
            // label: '# of Tomatoes',
            data: [12, 19],
            backgroundColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)'
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255,99,132,1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          title: {
            display: false,
            text: 'Resultado'
          },
          responsive: false,
          cutoutPercentage: 50 
       }
    });

  }

}
