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
import { faTheaterMasks } from '@fortawesome/free-solid-svg-icons';

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
        that.setChecked();
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
      // console.log(that.plans);
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

  setChecked() {
    const that = this;
    setTimeout(() => {
      let userCategories = that.getUserCategories();
      if(userCategories.length > 0){
        let textinputs = document.querySelectorAll('input[type=checkbox]');
        textinputs.forEach(element => {
          if(userCategories.find(f => f.key == element['value'])){
            element['checked'] = true;
          }
        });

        that.checkProductsByUser();
      }
    }, 1000);
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
  
  getUserCategories() {
    const that = this;
    if(that.user.categories){
      let find = [];
      that.user.categories.forEach(element => {
        if(that.categories.find(f => f.clientKey == element.key)){
          find.push(element);
        }
      });
      return find;
    } else {
      return [];
    }
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

    if(that.user.settingLanguage) {
      // console.log('PUT');
      // console.log(that.user.settingLanguage);
      that.usersService.updateSettingLanguage(that.user.settingLanguage, that.user).subscribe( res => {
        console.log(res);
      });
    } else {
      // console.log('POST');
      // console.log(that.user.settingLanguage);
      that.usersService.postSettingLanguage(that.user.settingLanguage, that.user).subscribe( res => {
        console.log(res);
      });
    }


    that.usersService.updatePlanDateExp(that.user.planDateExpiration, that.user).subscribe(res => {
      console.log(res);
      that.usersService.updatePlanAssigned(that.user.planAssigned, that.user).subscribe(res => {
        console.log(res);
        that.usersService.updatePlanAssigned;
        
        that.enabledSpinnerUpPlan = false;
        that.getUsers();
        that.modalReference.close();
      });

      that.updateProducts();
      //alert("Nueva fecha de expiración: " + this.user.planDateExpiration);
    });
  }

  saveData() {
    const that = this;
    that.enabledSpinnerUpPlan = true;
    that.updatePlan();
  }

  updateProducts() {
    const that = this;
    const textinputs = document.querySelectorAll('input[type=checkbox]'); 
    const noEmpty = [].filter.call(textinputs, function( el ) {
      return el.checked
    });

    let addProducts = [];
    noEmpty.forEach(element => {
      console.log(element.value);
      addProducts.push({
        key: element.value
      });
    });
    that.usersService.updateProducts(addProducts, that.user).subscribe( res => {
      console.log(res);
    });
  }

  checkProductsByUser() {

    const that = this;
    const numProduct = that.plans.find(f => f.uuid == that.user.planAssigned).numProducts;

    const textinputs = document.querySelectorAll('input[type=checkbox]'); 

    let empty = [].filter.call(textinputs, function( el ) {
      return !el.checked
    });

    let noempty = [].filter.call(textinputs, function( el ) {
      return el.checked
    });

    if(numProduct == noempty.length) {
      empty.forEach(element => {
        element.disabled = true;
      });
    } else {
      empty.forEach(element => {
        element.disabled = false;
      });
    }

  }

  selectPlan() {
    const textinputs = document.querySelectorAll('input[type=checkbox]'); 
    textinputs.forEach(element => {
      element['disabled'] = false;
    });

  }
}
