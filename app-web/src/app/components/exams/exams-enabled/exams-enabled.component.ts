import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from 'src/app/maintainers/categories/categories.service';
import { UsersService } from 'src/app/maintainers/users/users.service';
import { QuestionsService } from 'src/app/maintainers/questions/questions.service';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-exams-enabled',
  templateUrl: './exams-enabled.component.html',
  styleUrls: ['./exams-enabled.component.css']
})
export class ExamsEnabledComponent implements OnInit {
  
  modalReference: NgbModalRef;

  progressService = false;

  disabledButton = false;

  private userCategories = [];
  public categories = [];

  public category = null;
  public questions = [];
  public questionsRandom = [];

  constructor(
    private routers: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private categoriesService: CategoriesService,
    private userService: UsersService,
    private questionsService: QuestionsService
  ) { }

  ngOnInit() {
    const that = this;
    // if(typeof localStorage.getItem("seconds") !== 'undefined' && localStorage.getItem("seconds") != null){
    //   var r = confirm("¿Estás seguro de que deseas abandonar el exámen?");
    //   if (r == true) {
    //     // localStorage.removeItem("questions");
    //     // localStorage.removeItem("seconds");
    //     // window.clearInterval();
    //     // if(typeof localStorage.getItem("intervalId") !== 'undefined' && localStorage.getItem("intervalId") != null){
    //     //   let intervalId = Number(localStorage.getItem("intervalId"));
    //     //   window.clearInterval(intervalId);
    //     // }
    //   } else {
    //     let keyExam = localStorage.getItem("keyExam");
    //     location.href = '/exams/'+ keyExam +'/questions/1';
    //   }
    // }
    // Login user
    this.getUseCategoriesByKey('-LnFFh1I0l34rcV5nSrD');
  }


  private async getUseCategoriesByKey(key: string) {

    const that = this;

    that.progressService = true;
    await this.userService.getUserByKey(key).then( res => {
      this.userCategories = res.categories;
    });
    await this.categoriesService.getCategories(this.userCategories).subscribe( res => {
      that.progressService = false;
      this.categories = (res.data.length > 0)? res.data : [];
    });
  } 

  private getQuestionsByKeyCategory(category: any) {
    const that = this;
    that.disabledButton = true;
    localStorage.removeItem('questions');
    that.questionsService.getQuestionsByKeyCategory(category.clientKey).subscribe( res => {
      if(res) {
        that.questions = res;
        that.questionsRandom = that.questions.sort((a, b) => 0.5 - Math.random()).slice(0, category.totalQuestions);
        localStorage.setItem('questions', JSON.stringify(that.questionsRandom));
        localStorage.setItem('seconds', category.timerSeconds);
        localStorage.setItem('keyExam', category.clientKey);
        setTimeout(() => {
          that.disabledButton = false;
          that.modalReference.close();
          that.routers.navigateByUrl('/exams/'+ category.clientKey +'/questions/1');
        }, 3000);
      }
    });
  }


  getExamen() {
    const that = this;
    that.getQuestionsByKeyCategory(that.category);
  }

  open(content, category: any) {
    const that = this;
    that.category = category;
    that.modalReference = that.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    that.modalReference.result.then((result) => {
      that.category = null;
    }, (reason) => {
      that.category = null;
    });
  }

}
