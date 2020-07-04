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

    // window.localStorage.clear();

    this.getUseCategoriesByKey('-LnFFh1I0l34rcV5nSrD');

    if(
      typeof localStorage.getItem("seconds") !== 'undefined' && 
      localStorage.getItem("seconds") != null
    ){

      let timeExam = Number(localStorage.getItem('seconds'));
      if(timeExam > 0){
        if(typeof localStorage.getItem("keyExam") !== 'undefined' && localStorage.getItem("keyExam") != null){
          let keyExam = localStorage.getItem("keyExam");
          if(keyExam){
            that.routers.navigateByUrl('/exams/'+ keyExam +'/questions/1');
          }
        }
      } else {
        return true;
      }


      
    } else{ 
      return true;
    }

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
        
        that.questions.forEach(question => {
          question.data.answers.forEach(answer => {
            if(answer['isCorrect'] == false) {
              answer['isCorrect'] = null;
            }
          });
        });

        that.questionsRandom = that.questions.sort((a, b) => 0.5 - Math.random()).slice(0, category.totalQuestions);
        localStorage.setItem('questions', JSON.stringify(that.questionsRandom));
        localStorage.setItem('seconds', category.timerSeconds); //category.timerSeconds
        localStorage.setItem('keyExam', category.clientKey);
        setTimeout(() => {
          that.disabledButton = false;
          that.modalReference.close();
          that.routers.navigateByUrl('/exams/'+ category.clientKey +'/questions/1');
        }, 1000);
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
