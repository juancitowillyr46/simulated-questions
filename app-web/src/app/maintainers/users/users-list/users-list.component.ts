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
import { map } from 'rxjs/operators';
import { PlansService } from '../../plans/plans.service';
import { Plan } from '../../plans/plan';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})

export class UsersListComponent implements OnInit {

  public users: User[] = [];
  public user: User = null;

  public plans: Plan[] = [];
  public categories: any[] = [];

  private obsUser = new BehaviorSubject(null);
  public currentUser = this.obsUser.asObservable();
  
  public enabledSpinnerUpPlan = false;
  public enabledSpinnerUpPlanExp = false;

  public modalReference: NgbModalRef;

  constructor(
    private categoriesService: CategoriesService,
    private plansService: PlansService,
    private usersService: UsersService,
    private modalService: NgbModal,
    private verificatePlanService: VerificatePlanService
  ) {

  }

  ngOnInit() {
    const that = this;
    that.currentUser.subscribe( res => {
      if(res) {
        that.user = JSON.parse(res);
      }
    });
    that.getCategories();
    that.getPlans();
    that.getUsers();
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
      console.log(that.plans);
    });
  }

  async getUsers() {
    const that = this;
    await that.usersService.all().subscribe( res => {
      that.users = [];
      let lst = [];
      let keys = Object.keys(res);

      keys.forEach((user, key) => {
        res[user]['key'] = keys[key];
        lst.push(res[user]);
      });

      lst.forEach(user => {
        that.users.push(user);
      });


      let localFilter = that.users.filter(f => f.role == 'USER_STUDENT');
      that.users = localFilter;

    });
  }

  async getCategories() {
    const that = this;
    await that.categoriesService.all().subscribe( res => {

      let lst = [];
      let keys = Object.keys(res);

      keys.forEach((user, key) => {
        res[user]['key'] = keys[key];
        lst.push(res[user]);
      });

      lst.forEach(user => {
        that.categories.push(user);
      });

      let localFilter = that.categories.filter(f => f.active == true);
      that.categories = localFilter;

    });
  }
  

  findCategoryLabel(uuid: string) {
    const that = this;
    const find = that.plans.find(f => f.uuid === uuid);
    if(find){
      return find.name;
    }
    return '-';
  }

  formatDate(date: any) {
    try {
      return date.split("T")[0]+" "+date.split("T")[1];
    } catch (error) {
      return "-";
    }
  }
  

  open(content, index: number) {
    const that = this;
    console.log(that.users[index]);
    that.obsUser.next(JSON.stringify(that.users[index]));
    that.modalReference = that.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  activePlan() {
    const that = this;
    that.enabledSpinnerUpPlanExp = true;
    console.log(that.user);
    setInterval(() => {
      that.enabledSpinnerUpPlanExp = false;
      let diasDelPlan = that.plans.find(f => f.uuid == that.user.planAssigned).validDays;
      let fechaRegistro = that.verificatePlanService.formatUpdate(new Date().getTime());
      this.user.planDateExpiration = this.verificatePlanService.formatUpdate(this.verificatePlanService.incrementarPlan(fechaRegistro, diasDelPlan));
    }, 500);
  }

  updatePlan() {
    const that = this;
    let plan = that.plans.find(f => f.uuid == that.user.planAssigned);
    let diasDelPlan = plan.validDays;
    let fechaRegistro = that.verificatePlanService.formatUpdate(new Date().getTime());
    this.user.planDateExpiration = this.verificatePlanService.formatUpdate(this.verificatePlanService.incrementarPlan(fechaRegistro, diasDelPlan));

    let isTrueSet: any = that.user.emailVerified;

    that.usersService.updateEmailVerified(JSON.parse(isTrueSet), that.user).subscribe( res => {
      console.log(res);
    });

    that.usersService.updatePlanDateExp(that.user.planDateExpiration, that.user).subscribe(res => {
      console.log(res);
      that.usersService.updatePlanAssigned(that.user.planAssigned, that.user).subscribe(res => {
        console.log(res);
        that.usersService.updatePlanAssigned;
        alert("Fecha de expiración: " + this.user.planDateExpiration);
        that.enabledSpinnerUpPlan = false;
        that.getUsers();
        that.modalReference.close();
      });
    });
  }

  saveData() {
    const that = this;
    that.enabledSpinnerUpPlan = true;
    that.updatePlan();
  }

}
