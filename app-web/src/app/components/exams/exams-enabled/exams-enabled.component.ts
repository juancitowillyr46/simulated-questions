import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from 'src/app/maintainers/categories/categories.service';
import { UsersService } from 'src/app/maintainers/users/users.service';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-exams-enabled',
  templateUrl: './exams-enabled.component.html',
  styleUrls: ['./exams-enabled.component.css']
})
export class ExamsEnabledComponent implements OnInit {
  closeResult = '';
  progressService = false;

  private userCategories = [];
  public categories = null;

  constructor(
    private routers: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private categoriesService: CategoriesService,
    private userService: UsersService
  ) { }

  ngOnInit() {

    // Login user
    this.getUseCategoriesByKey('-LnFFh1I0l34rcV5nSrD');


  }


  private async getUseCategoriesByKey(key: string) {

    await this.userService.getUserByKey(key).then( res => {
      this.userCategories = res.categories;
    });

    await this.categoriesService.getCategories(this.userCategories).subscribe( res => {
      this.categories = res;
      console.log(this.categories);
    });
  } 


  getExamen(event) {
    this.routers.navigateByUrl('/exams/23423423/questions/1');
  }

  open(content) {
    const that = this;
    that.progressService = true;

    that.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      that.closeResult = `Closed with: ${result}`;
      that.progressService = false;
    }, (reason) => {
      that.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      that.progressService = false;
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
