import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from 'src/app/maintainers/categories/categories.service';
import { UsersService } from 'src/app/maintainers/users/users.service';
import { QuestionsService } from 'src/app/maintainers/questions/questions.service';
import { VerificatePlanService } from 'src/app/core/services/verificate-plan.service';
import { environment } from 'src/environments/environment';
import { PlansService } from 'src/app/maintainers/plans/plans.service';
import { BehaviorSubject } from 'rxjs';
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
  public checkPlanActive = false;
  plans: any[] = [];
  findPlan: any;

  private obsPlan = new BehaviorSubject(null);
  public currentPlan = this.obsPlan.asObservable();
  public settingLanguage: any;
  
  constructor(
    private plansService: PlansService,
    private routers: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private categoriesService: CategoriesService,
    private userService: UsersService,
    private questionsService: QuestionsService,
    private verificatePlanService: VerificatePlanService
  ) { }

  ngOnInit() {

    const that = this;

    that.cleanTimer();

    that.getPlans();

    that.currentPlan.subscribe( res => {
      if(res){
        console.log(res);
        
        // Registrando la fecha
        let diasDelPlan = res.validDays; // 0;
        let fechaRegistro = JSON.parse(localStorage.getItem("user")).planDateExpiration;// '2020-07-27T00:00:00';
        
        let fechaExpiracion = this.verificatePlanService.incrementarPlan(fechaRegistro, diasDelPlan);
        that.checkPlanActive = this.verificatePlanService.verificarPlanPorFecha(fechaExpiracion);
      }

      
      if(typeof localStorage.getItem("userId") !== 'undefined' && localStorage.getItem("userId") != null){
        if(that.checkPlanActive !== false) {
          that.settingLanguage = JSON.parse(localStorage.getItem("user")).settingLanguage;
          let userId = localStorage.getItem("userId");
          this.getUseCategoriesByKey(userId);
        }
      } else {
        that.routers.navigateByUrl('/exams');
      }

    });

    
    

    // if(typeof localStorage.getItem("userId") !== 'undefined' && localStorage.getItem("userId") != null){
    //   if(that.checkPlanActive !== false) {
    //     let userId = localStorage.getItem("userId");
    //     this.getUseCategoriesByKey(userId);
    //   }
    // } else {
    //   that.routers.navigateByUrl('/exams');
    // }

    

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


  async getPlans() {
    const that = this;
    let plans = [];
    await that.plansService.all().subscribe(all => {
      let lst = [];
      let keys = Object.keys(all);
      keys.forEach((res, key) => {
        all[res]['key'] = keys[key];
        lst.push(all[res]);
      });
      lst.forEach(res => {
        that.plans.push(res);
      });
      that.findPlan = that.plans.find(f => f.uuid === JSON.parse(localStorage.getItem("user")).planAssigned);
      that.obsPlan.next(that.findPlan);
      console.log(that.plans);
    });
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
            if(answer['checked'] === undefined){
              answer['checked'] = null;
            }
          });
        });

        that.questionsRandom = that.questions.sort((a, b) => 0.5 - Math.random()).slice(0, category.totalQuestions);
        
        localStorage.setItem('questions', JSON.stringify(that.questionsRandom));
        localStorage.setItem('seconds', category.timerSeconds); //category.timerSeconds
        localStorage.setItem('keyExam', category.clientKey);
        localStorage.setItem("category", JSON.stringify(that.category));

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

  cleanTimer() :void {
    window.clearInterval();
    if(typeof localStorage.getItem("intervalId") !== 'undefined' && localStorage.getItem("intervalId") != null){
      let getIntervalId: any[] = JSON.parse(localStorage.getItem("intervalId"));
      if(getIntervalId.length > 0)
        getIntervalId.forEach(id => {
          window.clearInterval(id);
        });
    }
    localStorage.removeItem("endExam");
    localStorage.removeItem("questions");
    localStorage.removeItem("category");
    localStorage.removeItem("keyExam");
    localStorage.removeItem("intervalId");
  }

}
