import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from 'src/app/maintainers/categories/categories.service';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-exams-enabled',
  templateUrl: './exams-enabled.component.html',
  styleUrls: ['./exams-enabled.component.css']
})
export class ExamsEnabledComponent implements OnInit {
  closeResult = '';
  progressService = false;
  constructor(
    private routers: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {

    this.categoriesService.getCategories().subscribe( res => {
      console.log(res);
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
