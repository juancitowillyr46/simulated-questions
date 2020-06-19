import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionsService } from '../questions.service';
import { CategoriesService } from '../../categories/categories.service';

import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup,
  FormBuilder,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faPlus, faInfoCircle, faCheckCircle, faCheck, faPen, faTrash, faArrowCircleLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { Answer } from '../../../core/models/answer.model';
import { FormQuestion } from '../../../core/models/formQuestion.model';
import { Question } from '../../../core/models/question.model';
import { SubmitMessage } from '../../../core/models/submitMessage.model';
// import { NotifierService } from 'angular-notifier';
import { MessageObservable } from '../../../observables/message.observable';

@Component({
  selector: 'app-questions-post',
  templateUrl: './questions-post.component.html',
  styleUrls: ['./questions-post.component.css']
})
export class QuestionsPostComponent implements OnInit {

  public typeCategories = [
    { 'id': 1, 'key': 'PMI_ACP', 'name': 'Project Management Institute'},
    { 'id': 2, 'key': 'SCRUM_MASTER', 'name': 'Scrum Master'}, // PSM
    { 'id': 3, 'key': 'PSPO', 'name': 'PSPO I'},
    { 'id': 4, 'key': 'PSKI', 'name': 'Scrum with Kanban Open'}
  ];

  public typeAnswer = [
    { 'id': 1, 'key': 'TRUE_OR_FALSE', 'name': 'Verdadero ó Falso', 'input' : 'radio' },
    { 'id': 2, 'key': 'ONE_ANSWER', 'name': 'Una respuesta', 'input' : 'radio' },
    { 'id': 2, 'key': 'MULTIPLE_ANSWER', 'name': 'Múltiples respuestas', 'input' : 'checkbox' },
  ];


  // -- Answers -- //
  public buildAnswers: Answer[] = [];

  public answerModel: Answer = {
    name: '',
    nameEn: '',
    value: this.buildAnswers.length,
    action: 'new',
    isCorrect: false
  };
  public answerObj: Answer = null;
  // -- Answers -- //
  public formGroup: FormGroup = null;

  public formQuestion: FormQuestion = null;

  public submitMessage: SubmitMessage = {
    message: ''
  };

  // private readonly notifier: NotifierService;

  constructor(
    private routeActive: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private questionsService: QuestionsService,
    private messageObservable: MessageObservable,
    private categoriesService: CategoriesService
  ) {
    library.add(faTimes, faPlus, faInfoCircle, faCheckCircle, faCheck, faPen, faTrash, faArrowCircleLeft, faSave);
  }

  ngOnInit() {
    const that = this;

    // that.categoriesService.getAllcategories().subscribe( res => {
    //   console.log(res);
    // });

    that.formGroup = this.formBuilder.group({
      question: ['', [Validators.required]],
      questionEn: ['', [Validators.required]],
      typeAnswer: ['TRUE_OR_FALSE', [Validators.required]],
      category: ['PMI_ACP', [Validators.required]],
      withImage: [''],
      image: [''],
      justification: ['']
    });

    this.formQuestion = {
      changeTypeInput: that.typeAnswer.find(t => t.key === 'TRUE_OR_FALSE'),
      typeAnswer: null,
      withImage: null,
      image: '',
      showModal: false,
      submit: false
    };

    if (
      that.routeActive.snapshot.paramMap.get('id') === undefined &&
      that.routeActive.snapshot.paramMap.get('id') == null
    ) {
      that.router.navigateByUrl('/mantainers/questions');
    } else {
      that.formQuestion.key = that.routeActive.snapshot.paramMap.get('id');
      if (that.formQuestion.key !== '0') {
        that.questionRead(that.formQuestion.key);
      } else {
        that.buildDefault();
      }
    }

  }

  public ir(event) {
    const that = this;
    that.messageObservable.changeMessage(null);
    event.preventDefault();
    that.router.navigate(['/questions/list']);
  }

  public changeTypeAnswer(event) {
    const that = this;
    this.formQuestion.changeTypeInput = that.typeAnswer.find(t => t.key === event.target.value);
    that.buildAnswers = [];
    if (event.target.value === 'TRUE_OR_FALSE') {
      that.buildDefault();
    }
  }

  public switchWithImage(event) {
    const that = this;
    if (event) {
      this.formQuestion.withImage = event.target.checked;
    }
  }

  public buildDefault() {
    const that = this;
    that.buildAnswers.push(
      {name: 'Verdadero', nameEn: 'True', value: true, action: 'edit', isCorrect: false},
      {name: 'Falso', nameEn: 'False', value: false, action: 'edit', isCorrect: false}
    );
  }

  // Crud Answer
  public addAnswer(answerModel: Answer) {
    const that = this;
    answerModel.action = 'edit';
    answerModel.value = that.buildAnswers.length + 1;
    that.buildAnswers.push(answerModel);

    answerModel = null;
    that.answerModel = {
      name: '',
      nameEn: '',
      value: 0,
      action: 'new',
      isCorrect: false
    };
    that.formQuestion.showModal = false;
  }

  public deleteAnswer(answerModel: Answer) {
    const that = this;
    that.buildAnswers.splice((answerModel.value - 1), 1);
    answerModel = null;
  }

  public getAnswer(answerModel: Answer) {
    const that = this;
    that.answerModel = that.buildAnswers.find(f => f.value === answerModel.value);
    that.answerModel.action = 'edit';
    answerModel = null;
    that.formQuestion.showModal = true;
  }

  public updateAnswer(answerModel: Answer) {
    const that = this;
    that.buildAnswers[(answerModel.value - 1)] = answerModel;
    that.answerModel = {
      name: '',
      nameEn: '',
      value: 0,
      action: 'new',
      isCorrect: false
    };
    that.formQuestion.showModal = false;
  }

  public isCorrectEvent(event, answerModel: Answer) {
    const that = this;

    if (this.formQuestion.changeTypeInput.input === 'radio') {
      that.buildAnswers.forEach(answer => {
        answer.isCorrect = false;
      });
    }

    that.answerModel = that.buildAnswers.find(f => f.value === answerModel.value);
    that.answerModel.isCorrect = event.target.checked;

  }

  public save(event) {

    const that = this;
    const questionForm: any = that.formGroup.value;
    const question: Question = {
      question: questionForm.question,
      questionEn: questionForm.questionEn,
      typeAnswer: questionForm.typeAnswer,
      category: questionForm.category,
      withImage: questionForm.withImage,
      image: that.formQuestion.image,
      answers: that.buildAnswers,
      justification: questionForm.justification
    };

    that.formQuestion.submit = true;
    that.questionsService.create(question).subscribe(res => {

      that.formGroup.reset({
        question: '',
        questionEn: '',
        typeAnswer: 'TRUE_OR_FALSE',
        category: 'PMI_ACP',
        withImage: '',
        image: '',
        justification: ''
      });

      that.answerModel = null;
      that.answerObj = null;
      that.buildAnswers = [];
      that.buildDefault();

      that.messageObservable.changeMessage({message: 'Pregunta creada satisfactoriamente', state: 'success', hide: false});

      setTimeout(() => {
        that.router.navigate(['questions/list']);
      }, 4000);
      
    });

  }

  public update(event) {

    const that = this;
    const questionForm: any = that.formGroup.value;
    const question: Question = {
      question: questionForm.question,
      questionEn: questionForm.questionEn,
      typeAnswer: questionForm.typeAnswer,
      category: questionForm.category,
      withImage: questionForm.withImage,
      image: that.formQuestion.image,
      answers: that.buildAnswers,
      justification: questionForm.justification
    };

    that.formQuestion.key = that.routeActive.snapshot.paramMap.get('id');
    that.formQuestion.submit = true;
    that.questionsService.update(that.formQuestion.key, question).subscribe(res => {
      that.router.navigate(['questions/list']);
      that.messageObservable.changeMessage({message: 'Pregunta actualizada satisfactoriamente', state: 'success', hide: false});
    });

  }

  public questionRead(key: string) {
    const that = this;
    that.questionsService.read(key).subscribe(question => {

      that.formGroup = null;
      that.formGroup = this.formBuilder.group({
        question: [question.question, [Validators.required]],
        questionEn:[question.questionEn, [Validators.required]],
        typeAnswer: [question.typeAnswer, [Validators.required]],
        category: [question.category, [Validators.required]],
        withImage: [question.withImage],
        image: [''],
        justification: [question.justification, [Validators.required]]
      });

      that.formQuestion = {
        changeTypeInput: that.typeAnswer.find(t => t.key === question.typeAnswer),
        typeAnswer: question.typeAnswer,
        withImage: question.withImage,
        image: question.image,
        showModal: false,
        submit: false
      };

      that.buildAnswers = question.answers;

    });
  }

  changeListener($event): void {
    const that = this;
    console.log($event.target);
    that.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const that = this;
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      that.formQuestion.image = myReader.result;
    };
    myReader.readAsDataURL(file);
  }

}
