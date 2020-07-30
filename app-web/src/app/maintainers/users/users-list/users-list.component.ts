import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { MessageObservable } from '../../../observables/message.observable';
import { CategoriesService } from '../../categories/categories.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { VerificatePlanService } from 'src/app/core/services/verificate-plan.service';
import { User } from '../user';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})

export class UsersListComponent implements OnInit {

  public users: User[] = [];
  public user: User = null;

  private obsUser = new BehaviorSubject(null);
  public currentUser = this.obsUser.asObservable();
  
  public enabledSpinnerUpPlan = false;
  public enabledSpinnerUpPlanExp = false;

  public modalReference: NgbModalRef;

  constructor(
    private usersService: UsersService,
    private modalService: NgbModal,
    private verificatePlanService: VerificatePlanService
  ) {

  }

  ngOnInit() {
    const that = this;
    that.usersService.usersAll().subscribe( res => {
      that.users = res;
    });

    that.currentUser.subscribe( res => {
      if(res != null){
        that.user = JSON.parse(res);
      }
    });
  }

  open(content, index: number) {
    const that = this;
    that.obsUser.next(JSON.stringify(that.users[index]));
    that.modalReference = that.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  activePlan() {
    const that = this;
    that.enabledSpinnerUpPlanExp = true;
    console.log(that.user);
    setInterval(() => {
      that.enabledSpinnerUpPlanExp = false;
      let diasDelPlan = environment.plans.find(f => f.id === Number(that.user.planAssigned)).days;
      let fechaRegistro = that.verificatePlanService.formatUpdate(new Date().getTime());
      this.user.planDateExpiration = this.verificatePlanService.formatUpdate(this.verificatePlanService.incrementarPlan(fechaRegistro, diasDelPlan));
    }, 500);
  }

  updatePlan() {
    const that = this;
    that.enabledSpinnerUpPlanExp = true;
    setInterval(() => {
      that.enabledSpinnerUpPlanExp = false;
      let diasDelPlan = environment.plans.find(f => f.id === this.user.planAssigned).days;
      let fechaRegistro = that.verificatePlanService.formatUpdate(new Date().getTime());
      this.user.planDateExpiration = this.verificatePlanService.formatUpdate(this.verificatePlanService.incrementarPlan(fechaRegistro, diasDelPlan));
    }, 500);
  }

  saveData() {
    const that = this;
    that.enabledSpinnerUpPlan = true;
    setInterval(() => {
      that.enabledSpinnerUpPlan = false;
    }, 500);
  }

}
