import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../../../core/models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { library } from '@fortawesome/fontawesome-svg-core';
import { GeneratePassword } from '../../../commons/generatePassword';
import { faUser, faTimes, faPlus, faInfoCircle, faCheckCircle, faCheck, faPen, faTrash, faArrowCircleLeft,
  faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users-post',
  templateUrl: './users-post.component.html',
  styleUrls: ['./users-post.component.css']
})
export class UsersPostComponent implements OnInit {

  public formGroup: FormGroup = null;
  public submit;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private generatePassword: GeneratePassword
  ) {
    library.add(faUser, faTimes, faPlus, faInfoCircle, faCheckCircle, faCheck, faPen, faTrash, faArrowCircleLeft, faSave);
  }

  ngOnInit() {
    const that = this;
    that.formGroup = that.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  public save() {
    const that = this;

    if (that.formGroup.invalid === true) {
      return false;
    }

    const hashedPassword = that.generatePassword.encriptarPassword(that.formGroup.value.password);

    const user: User = {
      username: that.formGroup.value.username,
      password: hashedPassword,
      email: that.formGroup.value.email,
      active: true,
      createdAt: new Date()
    };

    console.log(user);

    that.usersService.create(user).subscribe( res => {
      console.log(res);
    }, (err) => {
      console.log(err);
    }, () => {
      that.formGroup.reset({
        username: '',
        password: '',
        email: ''
      });
      that.submit = true;
    });

  }

}


