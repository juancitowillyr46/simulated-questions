import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { library } from '@fortawesome/fontawesome-svg-core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../categories.service';
import { MessageObservable } from '../../../observables/message.observable';
import { faUser, faTimes, faPlus, faInfoCircle, faCheckCircle, faCheck, faPen, faTrash, faArrowCircleLeft,
  faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-categories-post',
  templateUrl: './categories-post.component.html',
  styleUrls: ['./categories-post.component.css']
})
export class CategoriesPostComponent implements OnInit {
  public formGroup: FormGroup = null;
  public responseData: any = null;
  public submit = true;
  public key: any = 0;

  constructor(
    private formBuilder: FormBuilder,
    private routeActive: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService,
    private messageObservable: MessageObservable
  ) {
    library.add(faUser, faTimes, faPlus, faInfoCircle, faCheckCircle, faCheck, faPen, faTrash, faArrowCircleLeft, faSave);
  }

  ngOnInit() {
    const that = this;
    that.formGroup = that.formBuilder.group({
      name: ['', Validators.required],
      totalQuestions: ['', Validators.required],
      durationTimeMM: ['', Validators.required],
      clientKey: ['', Validators.required]
    });

    if (
      that.routeActive.snapshot.paramMap.get('id') === undefined &&
      that.routeActive.snapshot.paramMap.get('id') == null
    ) {
      that.router.navigateByUrl('/categories/list');
    } else {
      that.key = that.routeActive.snapshot.paramMap.get('id');
      if (that.key !== '0') {
        that.categoriesService.read(that.key).subscribe(res => {
          that.responseData = res;
          that.formGroup = null;
          that.formGroup = this.formBuilder.group({
            name: [res.name, [Validators.required]],
            totalQuestions: [res.totalQuestions, [Validators.required]],
            durationTimeMM: [res.durationTimeMM, [Validators.required]],
            clientKey: [res.clientKey, [Validators.required]]
          });

        });
      }
    }

  }

  done() {
    const that = this;

    if (that.formGroup.invalid === true) {
      return false;
    }

    console.log(that.formGroup.value);

    that.key = that.routeActive.snapshot.paramMap.get('id');

    that.categoriesService.update(that.key, that.formGroup.value).subscribe(res => {
      that.router.navigate(['categories/list']);
      that.submit = true;
      that.messageObservable.changeMessage({message: 'Categoria actualizada satisfactoriamente', state: 'success', hide: false});
    });
  }

  public save(event) {
    const that = this;

    that.categoriesService.create(that.formGroup.value).subscribe(res => {
      that.submit = true;
      that.messageObservable.changeMessage({message: 'Categoria creada satisfactoriamente', state: 'success', hide: false});
      that.formGroup.reset({
        name: '',
        totalQuestions: '',
        durationTimeMM: '',
        clientKey: ''
      });


    });

  }

}
