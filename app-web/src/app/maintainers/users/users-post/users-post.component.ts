import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
// import { User } from '../../../core/models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { library } from '@fortawesome/fontawesome-svg-core';
// import { GeneratePassword } from '../../../commons/generatePassword';
import { AuthGuard } from '../../../auth.guard';
import { UserAuth } from '../../../core/models/userAuth.model';
import { AuthService } from '../../../auth.service';
import { CategoriesService } from '../../categories/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageObservable } from '../../../observables/message.observable';
import { faUser, faTimes, faPlus, faInfoCircle, faCheckCircle, faCheck, faPen, faTrash, faArrowCircleLeft,
  faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users-post',
  templateUrl: './users-post.component.html',
  styleUrls: ['./users-post.component.css']
})
export class UsersPostComponent implements OnInit {

  public formGroup: FormGroup = null;
  public categories: any[] = [];
  public submit;
  public formUser: any = null;
  public responseData: UserAuth = null;

  constructor(
    private routeActive: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    // private authService: AuthService,
    private categoriesService: CategoriesService,
    private messageObservable: MessageObservable
  ) {
    library.add(faUser, faTimes, faPlus, faInfoCircle, faCheckCircle, faCheck, faPen, faTrash, faArrowCircleLeft, faSave);
  }

  ngOnInit() {
    const that = this;
    that.formGroup = that.formBuilder.group({
      displayName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      role: ['USER_STUDENT', Validators.required],
      assignedTests: ['', Validators.required]
    });

    that.categoriesService.list().subscribe(res => {
      const categories: any = res;
      that.categories = [];
      for (let key$ in categories) {
        const category: any = res[key$];
        category.key = key$;
        that.categories.push(categories[key$]);
      };
    });

    if (
      that.routeActive.snapshot.paramMap.get('id') === undefined &&
      that.routeActive.snapshot.paramMap.get('id') == null
    ) {
      that.router.navigateByUrl('/mantainers/questions');
    } else {
      const key = that.routeActive.snapshot.paramMap.get('id');
      if (key !== '0') {
        that.usersService.read(key).subscribe(res => {
          that.responseData = res;
          that.formGroup = null;
          that.formGroup = this.formBuilder.group({
            displayName: [res.displayName, [Validators.required]],
            email: [res.email, [Validators.required]],
            role: [res.role, [Validators.required]],
            assignedTests: [(res.assignedTests)? res.assignedTests[0].key : '']
          });

        });
      }
    }

  }

  public done() {

    const that = this;

    if (that.formGroup.invalid === true) {
      return false;
    }

    console.log(that.formGroup.value);
    

    const { displayName, email, role, assignedTests }: any = that.formGroup.value;

    console.log(assignedTests);

    that.responseData.displayName = displayName;
    that.responseData.email = email;
    that.responseData.role = role;

    const assignedTestsArr: any[] = [];
    assignedTestsArr.push({ key: assignedTests, active: true });
    that.responseData.assignedTests = assignedTestsArr;

    const key = that.routeActive.snapshot.paramMap.get('id');

    that.usersService.update(key, that.responseData).subscribe(res => {
      that.router.navigate(['users/list']);
      that.submit = true;
      that.messageObservable.changeMessage({message: 'Usuario actualizado satisfactoriamente', state: 'success', hide: false});
    });

  }

}


