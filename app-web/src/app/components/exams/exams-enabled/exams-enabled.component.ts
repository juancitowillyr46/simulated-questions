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
  closeResult = '';
  modalReference: NgbModalRef;

  progressService = false;

  disabledButton = false;
  // progressCategory = ;

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

    localStorage.removeItem("questions");

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

  private getQuestionsByKeyCategory(category: string) {
    const that = this;
    that.disabledButton = true;
    localStorage.removeItem('questions');
    that.questionsService.getQuestionsByKeyCategory(category).subscribe( res => {
      if(res) {
        that.questions = res;
        that.questionsRandom = that.questions.sort((a, b) => 0.5 - Math.random()).slice(0, 80);
        localStorage.setItem('questions', JSON.stringify(that.questionsRandom));
        setTimeout( () => {
          that.disabledButton = false;
          that.modalReference.close();
          that.routers.navigateByUrl('/exams/23423423/questions/1');
        }, 5000);
      }
    });
  }


  getExamen() {
    const that = this;
    
    that.getQuestionsByKeyCategory(that.category);
  }

  open(content, category: string) {
    const that = this;
    // that.progressService = true;
    that.category = category;
    that.modalReference = that.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    that.modalReference.result.then((result) => {
      that.closeResult = `Closed with: ${result}`;
      // that.progressService = false;
      that.category = null;
    }, (reason) => {
      that.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      // that.progressService = false;
      that.category = null;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
