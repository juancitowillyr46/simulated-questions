import { Component, OnInit } from '@angular/core';
import { NgbAccordionConfig, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Chart } from 'chart.js';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamClearTimerObservable } from 'src/app/core/observables/exam-clear-timer.observable';

@Component({
  selector: 'app-exams-score',
  templateUrl: './exams-score.component.html',
  styleUrls: ['./exams-score.component.css']
})
export class ExamsScoreComponent implements OnInit {

  public getQuestions;
  public answerCheckedError = 0;
  public answerCheckedSuccess = 0;
  public porcApproved = 0;
  public alert = {
    type: '',
    message: ''
  } 


  constructor(config: NgbAccordionConfig,
    private routers: Router,
    private route: ActivatedRoute,
    private examClearTimerObservable: ExamClearTimerObservable
  ) 
    { 
    config.closeOthers = true;
    config.type = 'muted';

    const that = this;  
    // that.examClearTimerObservable.changeMessage(true);

    // if(that.porcApproved == 0){
    //   that.routers.navigateByUrl('/exams');
    // }

    if(typeof localStorage.getItem("questions") !== 'undefined' && localStorage.getItem("questions") != null){
      this.getQuestions = JSON.parse(localStorage.getItem("questions"));
    } else {
      that.routers.navigateByUrl('/exams');
    }

    that.examClearTimerObservable.currentMessage.subscribe( res => {
      if(!res) {
        that.routers.navigateByUrl('/exams');
      }
    });

    this.route.params.subscribe(res => {
      if(res){
        let element = document.querySelector('#' + res.hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
          }, 200 );
        }
      }
    });
    

  }

  public validateOptionCorrect(answer, typeAnswer) {
    if(answer.checked !== undefined) {
      if(answer.checked === answer.isCorrect && answer.checked === true && answer.isCorrect === true) {
        return ['fas', 'check'];
      } else {
        return ['fas', 'times'];
      }
    } else if(answer.checked === undefined) {
      return ['fas', 'user'];
    }
  }

  public checkedIsNullOption(answer, typeAnswer) {
    if(answer.checked === undefined) {
        return true;
    } else if(answer.checked === null) { 
        return true;
    }
  }


  public validateCheckedUser(answer, typeAnswer) {
    
    if(typeAnswer === 'MULTIPLE_ANSWER') {
      
      if(answer.checked !== undefined){

        if(answer.checked === true) {
          return ['fas','square'];
        } else  if(answer.checked === null) {
          return ['far','square'];
        }

      } else  if(answer.checked === undefined){
        return ['far','square'];
      }

    } else if(typeAnswer === 'ONE_ANSWER') {

      if(answer.checked !== undefined){

        if(answer.checked === true) {
          return ['fas','circle'];
        } else  if(answer.checked === null) {
          return ['far','circle'];
        }

      } else  if(answer.checked === undefined){
        return ['far','circle'];
      }

    } else if(typeAnswer === 'TRUE_OR_FALSE') {

      if(answer.checked !== undefined){

        if(answer.checked === true) {
          return ['fas','circle'];
        } else  if(answer.checked === null) {
          return ['far','circle'];
        }

      } else  if(answer.checked === undefined){
        return ['far','circle'];
      }

    }
    
  }

  public validateCheckedSystem(answer, typeAnswer) {
    if(typeAnswer === 'MULTIPLE_ANSWER') {
      
      if(answer.isCorrect === true){
        return ['fas','square'];
      } else if(answer.isCorrect === null){
        return ['far','square'];
      }

    } else if(typeAnswer === 'ONE_ANSWER') {

      if(answer.isCorrect === true){
        return ['fas','circle'];
      } else if(answer.isCorrect === null){
        return ['far','circle'];
      }

    } else if(typeAnswer === 'TRUE_OR_FALSE') {

      if(answer.isCorrect === true){
        return ['fas','circle'];
      } else if(answer.isCorrect === null){
        return ['far','circle'];
      }

    }
  }


  ngOnInit() {

    const that = this;
    

    // if(typeof localStorage.getItem("questions") !== 'undefined' && localStorage.getItem("questions") != null){
    //   this.getQuestions = JSON.parse(localStorage.getItem("questions"));
    // } else {

    // }

    // this.getQuestions = [
    //   {
    //     "key": "-M2aTzn518NZVL2rzmOs",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Facilitar eventos Scrum según lo solicitado o necesario",
    //           "value": 1,
    //           "checked": true
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Encontrar técnicas para una gestión eficaz de la cartera de productos",
    //           "value": 2,
    //           "checked": true
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Comprender la planificación de productos en un entorno empírico",
    //           "value": 3,
    //           "checked": true
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Introducir prácticas de desarrollo de vanguardia.",
    //           "value": 4,
    //           "checked": null
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Liderando y entrenando a la organización en su adopción de Scrum",
    //           "value": 5,
    //           "checked": null
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "¿Cómo ayuda el Scrum Master al propietario del producto? Seleccione las tres respuestas más apropiadas.",
    //       "typeAnswer": "MULTIPLE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M4BWERTOIPoeLJSiAgd",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Asegúrese de que cada incremento los cumpla.",
    //           "value": 1,
    //           "checked": true
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Asegúrese de que el departamento de lanzamiento comprenda estos requisitos, pero no es responsabilidad del equipo de desarrollo",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Manejarlos durante el Sprint de integración que precede al Sprint de lanzamiento",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Asignarlos a los desarrolladores principales del equipo.",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "¿Cómo debe un equipo de desarrollo lidiar con los requisitos no funcionales? - PSM I",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-MAYdVlou6OwIdWzbDfa",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Colaborar con el propietario del producto para determinar qué es posible y aceptable.",
    //           "nameEn": "Collaborate with the Product Owner to determine what is possible and acceptable.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Complete parcialmente la funcionalidad y discuta el trabajo restante en la Revisión de Sprint.",
    //           "nameEn": "Partially complete the functionality, and discuss the remaining work at the Sprint Review.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Agregar un especialista al equipo de desarrollo.",
    //           "nameEn": "Add a specialist to the Development Team.",
    //           "value": 3,
    //           "checked": true
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Diferir el trabajo a un Sprint más apropiado.",
    //           "nameEn": "Defer the work to a more appropriate Sprint.",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "justification": "",
    //       "question": "Cuando un equipo de desarrollo tiene problemas para entregar un incremento de trabajo porque no comprende un requisito funcional, ¿qué debe hacer?",
    //       "questionEn": "When a Development Team is having trouble delivering a working increment because they don't understand a functional requirement, what should they do?",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-MAZ6d0WMh7dskrLWOzH",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Cómo han cambiado las condiciones y cómo debe evolucionar  el Product Backlog",
    //           "nameEn": "How conditions have changed and how the Product Backlog should evolve.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Qué salió mal en el último Sprint y qué hacer de manera diferente este Sprint.",
    //           "nameEn": "What went wrong in the last Sprint and what to do differently this Sprint. ",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Qué hacer y quién lo hará.",
    //           "nameEn": "What to do and who will do it.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Quién está en el equipo y cuáles serán los roles de los miembros del equipo.",
    //           "nameEn": "Who is on the team and what team member roles will be.",
    //           "value": 4,
    //           "checked": null
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Qué se puede hacer y cómo hacerlo.",
    //           "nameEn": "What can be done and how to do it.\n",
    //           "value": 5,
    //           "checked": true
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "justification": "En el Sprint Planning realizamos un forecast de las PBI que podemos cumplir  y su posible solución.",
    //       "question": "¿Qué respuesta describe mejor los temas cubiertos en Sprint Planning?",
    //       "questionEn": "Which answer best describes the topics covered in Sprint Planning?",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M2pZ_J9G2rYuwOH_Ckf",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "4 horas",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Mensual.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "8 horas por un Sprint mensual. Para Sprints más cortos, generalmente es más corto.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Cada vez que se hace.",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "¿El horario para la reunión de planificación de Sprint es?\n\nJustificación : La planificación de Sprint tiene un límite de tiempo de hasta ocho horas para un Sprint de un mes. Para Sprints más cortos, el evento suele ser más corto.",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-LnOYQZeyhO-1rfoTHSC",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Características adicionales en un estado utilizable, que se integran con las entregadas e iteraciones anteriores.\n",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Una descomposición de todos los elementos del Backlog del Producto en tareas para futuras listas de Backlog del Sprint.\n",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Un conjunto de pruebas automatizadas para verificar la funcionalidad entregada en iteraciones anteriores.\n",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Un nuevo diseño de interfaz de usuario para la funcionalidad entregada en iteraciones anteriores.\n",
    //           "value": 4
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Diagramas UML que escriben cómo entregar funcionalidad en futuras iteraciones.",
    //           "value": 5
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "¿Cuál de las siguientes opciones describe mejor un incremento de software en funcionamiento?",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-MAS7FHTsqXUCHkQSGuX",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Involucre al equipo de desarrollo completo.",
    //           "nameEn": "Involve the complete Development Team.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Pídale a un especialista técnico externo que tome la decisión.",
    //           "nameEn": "Ask an external technical specialist to make the decision.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Envíe a cada miembro del equipo al departamento de Recursos Humanos de la compañía para expresar sus preocupaciones.",
    //           "nameEn": "Send every team member for the company's Human Resources department to express their concerns.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Use técnicas de entrenamiento, como preguntas abiertas y escucha activa.",
    //           "nameEn": "Use coaching techniques, such as, open questions and active listening.",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "justification": "El Scrum Master utiliza técnicas de manejo de conflictos, como preguntas abiertas y escucha activa e involucramiento del equipo.",
    //       "question": "¿Cuales son esas dos técnicas que podría usar el Scrum Master cuando el equipo Scrum queda atrapado en un desacuerdo interno sobre qué técnicas de desarrollo aplicar?",
    //       "questionEn": " What two techniques could the Scrum Master use when the Scrum Team gets caught in an internal disagreement about which development techniques to apply?",
    //       "typeAnswer": "MULTIPLE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M2_za_o9xUQnrIzcb15",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Para monitorear continuamente los niveles de personal del equipo de desarrollo.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Facilitar a los equipos de Scrum información y recursos que los ayuden a mejorar.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Para monitorear la productividad del equipo de desarrollo.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Identificar y eliminar personas que no están trabajando lo suficiente.",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "justification": "Facilitar a los equipos en Scrum de información y recursos que los ayuden a mejorar",
    //       "question": "¿Cuál es el papel de la administración en Scrum? (elige la mejor respuesta)",
    //       "questionEn": "What is the role of management in Scrum? (choose the best answer)",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M2pWgcJvaprXW1YzDVg",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Verdadero",
    //           "value": true
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Falso",
    //           "value": false
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "Scrum no tiene un rol llamado \"Gerente de Proyecto\".",
    //       "typeAnswer": "TRUE_OR_FALSE",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M34-M8KHSSLOIjQFp_I",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El Scrum Master es responsable de actualizar el Sprint Burndown.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "En la Revisión de Sprint, el Scrum Master identifica lo que se ha \"hecho\" y lo que no se ha \"hecho\".",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "El Scrum Master ayuda a aquellos que estan fuera del equipo a interactuar con el Equipo Scrum.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "  El Scrum Master enseña al equipo de desarrollo a mantener las reuniones de Scrum en su timebox.",
    //           "value": 4
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El Scrum Master asigna tareas a los miembros del Equipo de Desarrollo cuando necesitan trabajo.",
    //           "value": 5
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "¿Cuáles de los siguientes dos son ciertos acerca del Rol del Scrum Master?\nSeleccionar las  dos mejores  respuestas - PSM I",
    //       "typeAnswer": "MULTIPLE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-Lkv9OfXg42rQjRlshSe",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "  Sashimi\n",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "      Velocidad\n",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "      Capacidad\n",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "      Fibonacci",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "Agile usa una secuencia numérica para estimar. Todas las series de números comienzan con 0,1,3,5... y se calculan sumando los dos números privativos para obtener el siguiente número.\nEsta secuencia de números se llama",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M2a4phcbTQdFDoDRTV8",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El equipo de desarrollo trabaja horas extras durante el Sprint",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Reclute miembros adicionales del Equipo de Desarrollo antes de que el trabajo pueda comenzar.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Eliminar o cambiar los elementos seleccionados del Backlog del producto.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "El equipo de desarrollo se asegura de que el propietario del producto esté listo, inicia el Sprint y monitorear el progreso.\n",
    //           "value": 4
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Cancelar el Sprint",
    //           "value": 5
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "A medida que avanza la reunión de Sprint Plannig, el Equipo de Desarrollo ve que la modificación es más amplia de lo que pueden manejar. ¿Cuáles son dos acciones válidas?",
    //       "typeAnswer": "MULTIPLE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-MAYTIp0__t2F10smbSO",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Verdadero",
    //           "nameEn": "True",
    //           "value": true
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Falso",
    //           "nameEn": "False",
    //           "value": false
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "justification": "Un producto deberia tener un Product Backlog.",
    //       "question": "Verdadero o falso: cuando varios equipos trabajan juntos en el mismo producto, cada equipo debe mantener un Backlog de producto separado.",
    //       "questionEn": " True or False: When multiple teams work together on the same product, each team should maintain a separate Product Backlog.",
    //       "typeAnswer": "TRUE_OR_FALSE",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-MAWt64d7DzqAg7Rvhti",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Ayuda a los demás miembros del equipo Scrum.",
    //           "nameEn": "Help the other Scrum Team members.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Envíe nuestro informe de estado diario.",
    //           "nameEn": "Send our a daily status report.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Trabajar hasta tarde.",
    //           "nameEn": "Work late.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Siempre entregue los artículos en el pronóstico de Sprint.",
    //           "nameEn": "Always deliver the items in the Sprint forecast.",
    //           "value": 4
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Haz tu mejor esfuerzo.",
    //           "nameEn": "Do your best.",
    //           "value": 5
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "justification": "El compromiso se asocia, con la ayuda a los miembros del equipo, y entrega de los item dentro del pronostico del Sprint.\n\n",
    //       "question": "Para lograr los beneficios de Scrum, es importante promover el valor del compromiso. ¿Dos acciones que demuestran el compromiso de los miembros del equipo Scrum?",
    //       "questionEn": "In order to achieve the benefits of Scrum, it is important to enact the value of commitment. What two actions demonstrate the commitment of Scrum team members?",
    //       "typeAnswer": "MULTIPLE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-LkzVzBDUjZsmb8qOq-a",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "El scrum master aplica la regla de que solo participan los miembros del equipo de desarrollo.\n",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Se lleva a cabo en el mismo lugar y hora todos los días.\n",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "El propietario del producto proporciona una actualización.\n",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Es tiempo en caja(Time Boxing).",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "¿ cuál de los siguientes tres puntos sobre el scrum diario ( Daily Scrum) son ciertos ?",
    //       "typeAnswer": "MULTIPLE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-LmIEZyk4xdhYNdoZ5Ou",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Es el plan del Equipo de Desarrollo para el Sprint.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Lo solicita el propietario del producto.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Es una lista completa de todo el trabajo a realizar en un Sprint.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Cada artículo tiene un propietario designado",
    //           "value": 4
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Cada tarea se estima en horas.",
    //           "value": 5
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Cada artículo tiene un propietario designado.",
    //           "value": 6
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "¿Qué enunciado describe mejor el Sprint Backlog como resultado de la planificación del Sprint?",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-LkzYqUj4agGXRcSeOHY",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Fecha de lanzamiento porcentaje de adherencia\n",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Defectos atribuibles a los requisitos de soporte de la plataforma.\n",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Porcentaje de NFR (requisitos no funcionales) cumplidos\n",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Valor comercial realizado por lanzamiento\n",
    //           "value": 4
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Porcentaje de aumento en el número de lanzamientos",
    //           "value": 5
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "¿ Cuál  de lo siguiente no es una métrica que mide el rendimiento de los devops en ágil ?",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-Lkv-OrxivPC5MTZR0C6",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Aproximadamente entre el 15% y el 20% del proyecto total\n",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Menos del 20% del proyecto total\n",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Aproximadamente el 10% del proyecto total",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Aproximadamente el 20% del proyecto total",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "La actividad de “preparación” (grooming) de la Sprint Backlog (Pila del Sprint) priorización, detalle y estimación de los elementos que la componen es un proceso que se realiza de forma puntual, en cualquier momento, continua y colaborativamente por parte del Product Owner (Dueño del Producto) y el Development Team (Equipo de Desarrollo). No debe consumir más de:",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-LkvOz4rBoOkNp6hFYS6",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "5\n\n",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "7\n",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Depende\n",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Entre 3 y 9",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "¿ El tamaño óptimo del equipo scrum es ?\n\nJustificación : El tamaño óptimo del equipo de desarrollo es lo suficientemente pequeño como para ser ágil y lo suficientemente grande como para completar un trabajo significativo. Menos de tres miembros del Equipo de Desarrollo disminuyen la interacción y resultan en ganancias de productividad más pequeñas. Más de nueve miembros simplemente requieren demasiada coordinación.",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M3CS8j2Cwjs1ns4Vibc",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Cada artículo tiene un propietario designado.\n",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Lo ordena el propietario del producto\n",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Es una lista completa de todo el trabajo a realizar en un Sprint.\n",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Cada tarea se estima en horas.\n",
    //           "value": 4
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Es el plan del Equipo de Desarrollo para el Sprint.",
    //           "value": 5
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "¿Qué enunciado describe mejor el  Sprint Backlog  como resultado de la planificación de Sprint?\nSelecciona la mejora respuesta - PSM I",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-MAi2z2dMBlb2GbMMGtc",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Cierto. Los resultados se ven afectados por su participación y disponibilidad.",
    //           "nameEn": "True. Outcomes are affected by their participation and availability.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Falso. Un propietario de producto puede ser reemplazado por un analista de negocios en el equipo de desarrollo.",
    //           "nameEn": "False. A Product Owner can be replaced by a business analyst in the Development Team.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Falso. Un Scrum Master solo se requiere cuando lo solicita el Equipo de Desarrollo.",
    //           "nameEn": "False. A Scrum Master is only required when asked for by the Development Team.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Cierto. Cada uno debe estar 100% dedicado al Equipo Scrum.",
    //           "nameEn": "True. Each must be 100% dedicated to the Scrum Team.",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "justification": "Las recomendaciones de Scrum, es tener a ambos roles en un ritmo sostenible.",
    //       "question": "Verdadero o falso: Cada equipo Scrum debe tener un Propietario del Producto y un Scrum Master.",
    //       "questionEn": "True or False: Every Scrum Team must have a Product Owner and Scrum Master.",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-Ll3ZnukB7cMej0C4wxr",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Sí, pero solo para equipos scrums cuyo trabajo tiene dependencias.\n",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Sí, de lo contrario los Propietarios del producto (y las partes interesadas) no podrán inspeccionar con precisión lo que se hace.\n",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "No, cada equipo de scrum está solo.\n",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "No, eso es demasiado difícil y debe hacerse en un sprint de endurecimiento.",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "¿Cuando muchos equipos scrum están trabajando en el mismo producto, ¿deberían integrarse todos sus incrementos en cada Sprint?",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M2aX8OWEywel_FLhLa6",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Verdadero",
    //           "value": true
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Falso",
    //           "value": false
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "El Equipo de Desarrollo debería poder explicarle al Propietario del Producto y al Scrum Master cómo pretende trabajar como un equipo autoorganizado para lograr el Objetivo Sprint y crear el Incremento anticipado.",
    //       "typeAnswer": "TRUE_OR_FALSE",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M2aS8iTD9-VHxgkcDuB",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El equipo de desarrollo",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "La guía de Scrum",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El Scrum Master y el propietario del producto",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Un pequeño equipo de personas que es altamente flexible y adaptable.",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "¿Cuál es la esencia de Scrum? Seleccione la opción más adecuada.",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M34EsxBcutDHex-txvg",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "La persona que entra en último lugar. Esto alienta a las personas a llegar a tiempo y ayuda a mantenerse dentro del tiempo.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Quien decida del equipo de desarrollo puede comenzar.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "La persona que tiene la ficha.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El Scrum Master. Esto asegura que el Equipo de Desarrollo tenga la reunión y se mantenga dentro del tiempo.",
    //           "value": 4
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "La última persona que rompió la construcción.",
    //           "value": 5
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "¿Quién comienza el Daily Scrum?\nSeleccionar la mejora respuesta - PSM I",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M2_cw7Go_xm4zZMxe4l",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "El equipo de desarrollo es responsable y puede necesitar ayuda del Scrum Master.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El gerente de contratación es responsable, porque él / ella contrató al desarrollador.\n",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El Scrum Master es responsable, porque él / ella elimina los impedimentos.\n",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El propietario del producto es responsable porque controla el retorno de la inversión (ROI).",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "Un nuevo desarrollador tiene continuos conflictos con los miembros del Equipo de Desarrollo y crea un entorno hostil. \n¿Quién es responsable de eliminar al miembro del equipo?",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-LkvGzGgr37aQfltPSc-",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El proyecto debe ser rechazado.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "No tengo suficiente información\n",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "El proyecto debe ser realizado en otro momento.\n",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El proyecto debe ponerse en espera hasta que el valor sea 0",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "El valor actual neto del VPN es una relación que compara el valor de un dólar actual con el valor del mismo dólar en el futuro. Un VPN que sea negativo sugiere   que  :",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M2pMgwwDcV0eSAMf2JT",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Optimizando el valor del trabajo que hace el Equipo de Desarrollo.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Evite que las partes interesadas distraigan al equipo de desarrollo.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Gestiona la  dirección del equipo de desarrollo.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Gestiona el proyecto y garantizar que el trabajo cumpla con los compromisos con los interesados.",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "¿Qué enunciado describe mejor la responsabilidad del propietario del producto?\n\nJustificación : El propietario del producto es responsable de maximizar el valor del producto y el trabajo del equipo de desarrollo.",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-MAX04nyy1YB0RPMGuaa",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Scrum Master.",
    //           "nameEn": "Scrum Master.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Product Owner.",
    //           "nameEn": "Product Owner.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Miembro del equipo de desarrollo.",
    //           "nameEn": "Development Team member.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Gerente de proyecto.",
    //           "nameEn": "Project Manager.",
    //           "value": 4
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Ninguna de las anteriores.",
    //           "nameEn": "None of the above. ",
    //           "value": 5
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "justification": "Los roles core de Scrum son : Scrum Master , Product Owner y Equipo de desarrollo.",
    //       "question": "¿Quién está en el equipo Scrum?",
    //       "questionEn": "Who is on the Scrum Team?",
    //       "typeAnswer": "MULTIPLE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M2pNxQ0hJ_0JaCbE_Q7",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Planificación, demostración, retrospectiva",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Planificación, Inspección, Adaptación",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Inspección, Transparencia, Adaptación",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Respeto a las personas, Kaizen, eliminando el desperdicio",
    //           "value": 4
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Transparencia, Eliminando Residuos, Kaizen",
    //           "value": 5
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "Los tres pilares del control empírico del proceso son:\n\nJustificación : Scrum se basa en la teoría empírica de control de procesos o empirismo. El empirismo afirma que el conocimiento proviene de la experiencia y toma decisiones basadas en lo que se conoce.\nTres pilares sostienen cada implementación del control empírico del proceso: transparencia, inspección y adaptación.",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-MAb28lMWu7gIn5qtupT",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Actualice el plan del proyecto con las partes interesadas.",
    //           "nameEn": "Update the project plan with stakeholders.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Trabaje con los departamentos de Garantía de calidad en el incremento del Sprint actual.",
    //           "nameEn": "Work with the Quality Assurance departments on the increment of the current Sprint.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "No hay tales actividades. El siguiente Sprint comienza inmediatamente después del Sprint actual.",
    //           "nameEn": "There are no such activities. The next Sprint starts immediately after the current Sprint.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Refina la cartera de productos.",
    //           "nameEn": "Refine the Product Backlog.",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "justification": "",
    //       "question": "¿Qué actividades realiza normalmente el propietario de producto en la fase entre el final del Sprint actual y el comienzo del próximo Sprint?",
    //       "questionEn": "What activities would a Product Owner typically undertake in the phase between the end of the current Sprint and the start of the next Sprint?\n",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-LkuvVY0y1wMh300IPjs",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "¿Qué obstáculos hay en el camino?\n",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "¿Qué trabajo me asigno el Scrum Master para hoy?",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": " ¿Qué solicitudes del cliente recibimos?\n",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "¿Quién se encargará de la siguiente tarea?",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "justification": "La reunión diaria como su propio nombre indica consiste en reunirse todos los días el equipo Scrum al completo para que cada cada miembro secuencialmente habla durante 2-3 minutos respondiendo a estas 3 preguntas: ¿Qué hiciste ayer. ¿Qué harás hoy? ¿Hay algún impedimento u obstáculo para culminar con la meta?",
    //       "question": "Durante el Scrum Diario, se responde tres preguntas \n¿Cuál de las siguientes preguntas es?",
    //       "questionEn": "During the Daily Scrum, three questions are answered. Which of the following questions is it?",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-LmICY_4UwBmTCBJ4hPH",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El propietario del producto decide.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El propietario del producto debe proporcionar a cada equipo su propia cartera de productos.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Los equipos de desarrollo realizan el trabajo de acuerdo con el propietario del producto.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El Equipo Scrum con la velocidad más alta tira primero los elementos de la Lista de Producto.",
    //           "value": 4
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Cada equipo Scrum toma el mismo número de artículos.",
    //           "value": 5
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "¿Cómo deben elegirse los elementos del Backlog del producto cuando varios equipos Scrum trabajan desde el mismo Backlog del producto?",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-MAiJ3FSkGhN-f7WwY52",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Liderar las discusiones del equipo de desarrollo.",
    //           "nameEn": "Lead the discussions of the Development Team.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Asegúrese de que las 3 preguntas hayan sido respondidas por cada miembro del equipo.",
    //           "nameEn": "Make sure that all 3 questions have been answered by each member of the team.\n",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Mantenga un registro de si cada miembro del equipo tiene la oportunidad de hablar.\n",
    //           "nameEn": "Keep track of whether each team member has a chance to speak.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Enseñe al equipo de desarrollo a mantener el Scrum diario dentro del plazo de 15 minutos.",
    //           "nameEn": "Teach the Development Team to Keep The Daily Scrum Within the 15 minute time-box.",
    //           "value": 4
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Todas las anteriores.",
    //           "nameEn": "All of the above.",
    //           "value": 5
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "justification": "",
    //       "question": "¿Cuál de los siguientes servicios son apropiados para un Scrum Master con respecto al Daily Scrum?",
    //       "questionEn": "Which of the following services are appropriate for a Scrum Master in regard to the Daily Scrum?",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M2_uRzQgmjjPaC1cY3T",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Scrum prohíbe la estimación.\n",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El propietario del producto realiza las estimaciones, pero es mejor verificarlas con el equipo de desarrollo.\n",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Los elementos del product Backlog deben estimarse en puntos de historia.\n",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Las estimaciones deben estar en unidades relativas.\n",
    //           "value": 4
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Las estimaciones son hechas por el Equipo de Desarrollo.",
    //           "value": 5
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "¿El propietario de un producto desea recibir asesoramiento de Scrum sobre la estimación del trabajo en Scrum. ¿Cuál de estas es la pauta que debe dar un Scrum Master?",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-MAYC6VpBOOAL6QKXrbJ",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El propietario del producto y la gestión.",
    //           "nameEn": "The Product Owner and management.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El equipo de desarrollo y gestión.",
    //           "nameEn": "The Development Team and management.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "El equipo Scrum y las partes interesadas.",
    //           "nameEn": "The Scrum Team and stakeholders.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El equipo de desarrollo y las partes interesadas.",
    //           "nameEn": "The Development Team and stakeholders.",
    //           "value": 4
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El propietario del producto y las partes interesadas.",
    //           "nameEn": "The Product Owner and stakeholders.",
    //           "value": 5
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El propietario del producto y el equipo de desarrollo.",
    //           "nameEn": "The Product Owner and Development Team. ",
    //           "value": 6
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "justification": "El sprint Review es una oportunidad para inspeccionar y adaptar,  donde el equipo Scrum, y los interesados son los roles más importantes.",
    //       "question": "¿El Sprint Review es principalmente una oportunidad de inspección y adaptación para qué grupo?",
    //       "questionEn": "The Sprint Review is mainly an inspect and adapt opportunity for which group?",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-Lkv1_Qx-mpZ3yXFvF_s",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": " Se debe utilizar alguna herramienta para la presentación de los resultados\n\n",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "El objetivo es ver el incremento realizado\n",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Es una reunión informativa\n",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Es una reunión informal\n",
    //           "value": 4
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El equipo debe guiar al Product Owner en la comprobación de las funcionalidades\n",
    //           "value": 5
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El equipo de desarrollo solo permite ejecutar las pruebas que sabe van a funcionar",
    //           "value": 6
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "Marque los elementos que considere identificativos de una Sprint Review (Revisión del Sprint)",
    //       "typeAnswer": "MULTIPLE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-MAhJlCgEHFWAq-du0vT",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Agrega el elemento al siguiente Sprint.",
    //           "nameEn": "Add the item to the next Sprint.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Informe al propietario del producto para que pueda trabajar con el CEO.",
    //           "nameEn": "Inform the Product Owner so he/she can work with the CEO.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Agrega el elemento al Sprint actual sin ningún ajuste.\n",
    //           "nameEn": "Add the item to the current Sprint without any adjustments.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Agregue el elemento al Sprint actual y suelte un elemento del mismo tamaño.",
    //           "nameEn": "Add the item to the current Sprint and drop an item of equal size.",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "justification": "El Product Owner  es la personas más idonea para encargarse de este tema.",
    //       "question": "El CEO le pide al Equipo de Desarrollo que agregue un elemento \"muy importante\" a un Sprint que está en progreso ¿Qué debe hacer el Equipo de Desarrollo?",
    //       "questionEn": "The CEO asks the Development Team to add a “very important” item to a Sprint that is in progress What should the Development Team do?",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-MASH49d_64AwsVXhua0",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Descubra por qué el equipo de desarrollo quiere esto y trabaje con ellos para mejorar el resultado del Daily Scrum.",
    //           "nameEn": "Learn why the Development Team wants this and work with them to improve the outcome of the Daily Scrum.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Haga que los desarrolladores voten.",
    //           "nameEn": "Have the developers vote.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Entrene al equipo sobre por qué el Daily Scrum es importante como una oportunidad para actualizar el plan.",
    //           "nameEn": "Coach the team on why the Daily Scrum is important as an opportunity to update the plan.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Reconocer y apoyar la decisión del equipo autoorganizado.",
    //           "nameEn": "Acknowledge and support the self-organizing team`s decision.",
    //           "value": 4
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Considere la solicitud y decida qué dice que debería ocurrir el Daily Scrum.",
    //           "nameEn": "Consider the request and decide on which says the Daily Scrum should occur.",
    //           "value": 5
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "justification": "Las reuniones diarias, deben ejecutarse diariamente, es oportunidad para que el equipo se alinie. Apoye al equipo a mejorar sus Daily Scrum.\nEl Daily Scrum se realiza a la misma hora y en el mismo lugar todos los días para reducir la complejidad. Durante la reunión, el equipo de desarrollo decide la mejor manera de comunicarse para lograr el objetivo del Sprint. (Según la guía de Scrum 2017) ",
    //       "question": "Durante una retrospectiva de Sprint, el equipo de desarrollo propone mover el Daily Scrum para que solo ocurra los martes y jueves. ¿Cuáles son las respuestas más apropiadas del Scrum Master?",
    //       "questionEn": "During a Sprint Retrospective, the Development Team proposes moving the Daily Scrum to only occur on Tuesday and Thursday. Which two are the most appropriate responses for the Scrum Master?",
    //       "typeAnswer": "MULTIPLE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M2aLBv41R9l9iuNLiZZ",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Verdadero",
    //           "value": true
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Falso",
    //           "value": false
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "justification": "Los elementos de lista de producto, son responsabilidad del equipo.",
    //       "question": "¿Cada elementos de la Lista de Producto deben ser propiedad de un miembro del Equipo de Desarrollo?",
    //       "questionEn": "Should every Product Backlog  item be owned by a member of the Development Team?",
    //       "typeAnswer": "TRUE_OR_FALSE",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M2aP0WNXlWSzq38UXpC",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": " Siempre",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Aveces",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Nunca",
    //           "value": 3
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "El propietario del producto, \"Product Owner\", participa en la estimación de las historias de usuario, \"User Stories\"",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M2_dtzHn0ysAA0bvbeW",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Identificando mejoras de proceso de alta prioridad para el próximo Sprint.\n",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Cómo colabora el equipo.\n",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Documentar los criterios de aceptación para los artículos en el próximo Sprint.\n",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El orden de los elementos en la cartera de productos.",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "¿Cuáles de los dos  siguientes son temas apropiados para la discusión durante una Retrospectiva de Sprint?",
    //       "typeAnswer": "MULTIPLE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-MAXPe-qGmhWGP9M5c3Z",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El equipo de desarrollo, solo.",
    //           "nameEn": "The Development Team, alone.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "The Scrum Master.",
    //           "nameEn": "The Scrum Master.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "El equipo de desarrollo después de aclarar los requisitos con el propietario del producto.",
    //           "nameEn": "The Development Team after clarifying requirements with the Product Owner.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El propietario del producto con aportes del equipo de desarrollo",
    //           "nameEn": "The Product Owner with input from the Development Team",
    //           "value": 4
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Las personas más importantes de la organización, incluidos arquitectos y expertos en la materia.",
    //           "nameEn": "The most senior people in the organization, including architects and subject matter experts.",
    //           "value": 5
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "justification": "Las estimaciones son realizadas por el equipo de desarrollo en la planificación del Sprint",
    //       "question": "¿Quién crea la estimación de un elemento de Backlog del producto?",
    //       "questionEn": "Who creates a Product Backlog item's estimate?",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-MAbAtDjIu13d1mHTxK0",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Ofrezca al propietario del producto ayuda para que comprenda el objetivo de ordenar el Product Backlog es maximizar el valor.",
    //           "nameEn": "Offer the Product Owner help in understanding that the goal of ordering the Product Backlog is to maximize value.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Sugiera que el equipo de desarrollo haga el pedido para asegurarse de que sea un pedido de trabajo factible.",
    //           "nameEn": "Suggest that the Development Team does the ordering to be sure that it is a feasible ordering of work.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Anime al propietario del producto a trabajar con el equipo de desarrollo para ver qué elementos son técnicamente más rápidos de implementar.",
    //           "nameEn": "Encourage the Product Owner to work with the Development Team to see which items technically are fastest to implement.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Sugiérale al propietario del Producto que extienda el Sprint, para que pueda tener más tiempo para ordenar el Product Backlog.",
    //           "nameEn": "Suggest the Product owner extend the Sprint, so he can have more time to order the Product Backlog.",
    //           "value": 4
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Presente al propietario del producto un Product Backlog ordenado para su uso.",
    //           "nameEn": "Present the Product Owner with an ordered Product Backlog to use. ",
    //           "value": 5
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "justification": "",
    //       "question": "El Scrum Master observa que el propietario del producto tiene dificultades para ordenar el Product Backlog ¿Cuál es la acción más apropiada del Scrum Master?",
    //       "questionEn": " The Scrum Master observes the Product Owner struggling with ordering the Product Backlog. what is an appropriate action for the Scrum Master to take?",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-Lk76FIJGeUxSxEAWkrC",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "El producto desarrollado hasta la fecha en los incrementos anteriores (excepto si se trata del primer sprint)",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Dato de la velocidad o rendimiento del equipo en el último sprint",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Que se emplea como criterio para estimar la cantidad de trabajo que es razonable suponer para el próximo sprint",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Duración del Sprint y fecha del Sprint Review (Planificación del Sprint)",
    //           "value": 4
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Circunstancias de las condiciones de negocio del cliente y del escenario tecnológico empleado,Product Backlog (Pila del producto)",
    //           "value": 5
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "justification": "Las Entradas necesarias son : \nLa pila del producto.\nEl producto desarrollado hasta la fecha en los incrementos anteriores (excepto si se trata del primer sprint).\nDato de la velocidad o rendimiento del equipo en el último sprint, que se emplea como criterio para estimar la cantidad de trabajo que es razonable suponer para el próximo sprint.\nCircunstancias de las condiciones de negocio del cliente y del escenario tecnológico empleado.",
    //       "question": "Seleccione las entradas que son necesarias para una realización exitosa de una Planificación del Sprint",
    //       "questionEn": "Select the inputs that are necessary for a successful Sprint Planning",
    //       "typeAnswer": "MULTIPLE_ANSWER"
    //     }
    //   },
    //   {
    //     "key": "-LkvDEgeODbAjl4Dd2dN",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Exploratory-testing\n",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Acceptance testing\n",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Unit testing",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Test driven development\n",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "Las pruebas que a menudo se producen entre DONE y criterio de aceptación son :",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M2aShPHNYKpMIT77ink",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Verdadero",
    //           "value": true
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Falso",
    //           "value": false
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "La definición de Hecho se puede revisar y adaptar durante cada Retrospectiva de Sprint. ¿Verdadero o falso?",
    //       "typeAnswer": "TRUE_OR_FALSE",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M2_skw3AdUXt-kKgNUn",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Verdadero",
    //           "value": true
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Falso",
    //           "value": false
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "justification": "No existe restricción.",
    //       "question": "¿Un Equipo Scrum solo puede reunirse con los interesados durante la Revisión de Sprint ?",
    //       "questionEn": "Can a Scrum Team only meet with stakeholders during the Sprint Review?",
    //       "typeAnswer": "TRUE_OR_FALSE",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-LkvExPx_GecmLkVnMaB",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Verdadero",
    //           "value": true
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Falso",
    //           "value": false
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "justification": "Es falso, los requisitos no funcionales no tienen un modelo definido, ya que ellos no fomentan la transparencia.",
    //       "question": "Los requisitos no funcionales deben escribirse como historias de usuario siempre que sea posible.",
    //       "questionEn": "Non-functional requirements should be written as user stories whenever possible",
    //       "typeAnswer": "TRUE_OR_FALSE",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M3DNWJIBEkiKcNSMpIt",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Haga un plan para el resto del proyecto.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Analice, describa y documente los requisitos para los Sprints posteriores.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Desarrolle al menos una pieza de funcionalidad.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Analice, diseñe y describa la arquitectura e infraestructura completas.",
    //           "value": 4
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Cree un incremento de software potencialmente liberable.",
    //           "value": 5
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "¿Dos cosas que debe hacer el Equipo de Desarrollo durante el primer Sprint? (Escoge dos.) PSM I",
    //       "typeAnswer": "MULTIPLE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-MAhtrZzx2nuBquLiX4t",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Póngalo en el Backlog del producto para que el propietario del producto decida qué hacer con él.",
    //           "nameEn": "Put it on the Product Backlog for the Product Owner to decide what to do with it.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Revise el elemento, agregue la parte \"Done\" en la estimación a la velocidad y cree una Historia para el trabajo restante.",
    //           "nameEn": "Review the item, add the “Done” part of the estimate to the velocity and create a Story for the remaining work.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Si las partes interesadas están de acuerdo, el propietario del producto puede aceptarlo y entregarlo a los usuarios.",
    //           "nameEn": "If the stakeholders agree, the Product Owner can accept it and release it to the users.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "No incluya el artículo en el incremento de este Sprint.",
    //           "nameEn": "Do not include the item in the increment this Sprint. ",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "justification": "",
    //       "question": "Al final de un Sprint, un Product Backlog item trabajado no cumple con la definición de \"Done\". ¿Dos cosas que deberia suceder con el Product Backlog item incompleto?",
    //       "questionEn": "At the end of a Sprint a Product Backlog item worked on during the Sprint does not meet the definition of “Done”. what two things should happen with the undone Product Backlog item?",
    //       "typeAnswer": "MULTIPLE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M2aNs9xj3wb-Btrf_u2",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Asume la responsabilidad de seguir progresando a pesar de todos los bloqueos",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Es totalmente responsable de los entregables entregados al cliente",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Trata de asegurarse de que dividen el trabajo entre ellos de una manera justa y asumen nuevas tareas una vez que terminan sus tareas.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Se respetan mutuamente sus cualidades y habilidades y se complementan entre sí al adquirir habilidades según sus áreas fuertes",
    //           "value": 4
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Está abierto mientras se discuten problemas y bloqueadores y tiene como objetivo resolver problemas en lugar de caer en el juego de la culpa o la política interna.",
    //           "value": 5
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Es totalmente responsable y trabaja de forma individual para sacar adelante la entrega continua de valor",
    //           "value": 6
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "Cuáles son las características de un buen equipo Scrum? ",
    //       "typeAnswer": "MULTIPLE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M4BzlxjAHKNMT7_q4IU",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Foco\n",
    //           "nameEn": "Focus",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Respeto\n",
    //           "nameEn": "Respect",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Apertura\n",
    //           "nameEn": "openness",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Coraje",
    //           "nameEn": "courage",
    //           "value": 4
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Compromiso.\n",
    //           "nameEn": "Commitment.",
    //           "value": 5
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Todo lo anterior.",
    //           "nameEn": "All previous",
    //           "value": 6
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "justification": "Los valores en scrum son : Coraje, respeto, apertura, foco, compromiso.",
    //       "question": "¿Qué valor de Scrum se ve afectado por la falta de confianza en el equipo de Scrum? ",
    //       "questionEn": "What Scrum value is affected by lack of trust in the Scrum team?",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-LnOYPUrfPCMfmc94ejd",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Descubra por qué el equipo de desarrollo quiere esto y trabaje con ellos para mejorar el resultado del Daily Scrum.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Haga que los desarrolladores voten.\n",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Considere la solicitud y decida en qué días debe ocurrir el Daily Scrum.\n",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Entrene al equipo sobre por qué el Daily Scrum es importante como una oportunidad para actualizar el plan.\n",
    //           "value": 4
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Reconocer y apoyar la decisión del equipo autoorganizado.",
    //           "value": 5
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "Durante una Retrospectiva de Sprint, el Equipo de Desarrollo propone mover el Daily Scrum para que solo ocurra los martes y jueves. ¿Cuáles son las respuestas más apropiadas por el Scrum Master?",
    //       "typeAnswer": "MULTIPLE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M2p_Lgw6jcM-HK91nmK",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Asegúrese de que las 3 preguntas hayan sido respondidas.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Enseñe al equipo de desarrollo a mantener el Daily Scrum dentro de los 15 minutos.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Facilita de una manera que garantice que cada miembro del equipo tenga la oportunidad de hablar.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Liderar las discusiones del equipo de desarrollo.",
    //           "value": 4
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Todas las respuestas aplican.",
    //           "value": 5
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "¿Cuál de los siguientes servicios son apropiados para un Scrum Master con respecto al Daily Scrum?\n\nJustificación : El Scrum Master asegura que el Equipo de Desarrollo tenga la reunión, pero el Equipo de Desarrollo es responsable de llevar a cabo el Daily Scrum. El Scrum Master le enseña al Equipo de Desarrollo a mantener el Daily Scrum dentro del plazo de 15 minutos. El Scrum Master aplica la regla de que solo los miembros del Equipo de Desarrollo participan en el Daily Scrum.",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M2pEwkQWhAnGhq28OEh",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El Equipo Scrum, en un esfuerzo de colaboración donde el resultado es el denominador común de todas las definiciones de los miembros.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "La organización de desarrollo o Equipo de desarrollo si no hay ninguno disponible en la organización de desarrollo.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El propietario del producto como él / ella es responsable del éxito del producto",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El Scrum Master como él / ella es responsable de la productividad del equipo de desarrollo",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "¿Quién crea la definición de \"DONE\"?\n\nJustificación : Si la definición de \"DONE\" es parte de las convenciones, estándares o pautas de la organización de desarrollo, todos los Equipos Scrum deben seguirla como mínimo. El equipo de desarrollo del equipo Scrum puede complementarlo con elementos específicos para el producto o contexto.\nSi \"DONE\" para un incremento no es una convención de la organización de desarrollo, el Equipo de Desarrollo del Equipo Scrum debe definir una definición de \"DONE\" apropiado para el producto.",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M2pSVtMAfxZMaUpLOzx",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El miembro más junior del equipo.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El dueño del producto",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El Scrum Master",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "El equipo de desarrollo",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "¿Quién es responsable de administrar el progreso del trabajo durante un Sprint?\n\nJustificación : El Equipo de Desarrollo realiza el Scrum diario para inspeccionar el progreso hacia la Meta de Sprint y para inspeccionar la tendencia del progreso hacia completar el trabajo en la Pila de Sprint.",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M2aVkoWFma6mVhdtmtj",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": " El equipo de desarrollo no está autorizado para el refinamiento de la cartera de productos",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": " No más del 10%",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "No más del 20%",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "No más del 5%",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "¿Qué parte de la capacidad del equipo de desarrollo consume habitualmente el refinamiento de la cartera de productos?",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M2aKH69k2qbI-aM0CQW",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "El propietario del producto y el equipo de desarrollo",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El propietario del producto ",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Equipo de desarrollo",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "La Gerencia General y los interesados relevantes.",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "Durante un Sprint, un Equipo de Desarrollo determina que no podrá finalizar el pronóstico completo. ¿Quién debe estar presente para revisar y ajustar el trabajo de Sprint seleccionado?",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-Lkuwhk1-4k1Sh-LjuVk",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "El Scrum Master\n\n",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El Product Owner (Dueño del Producto)\n",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Los Responsables de Pruebas\n",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El Development team (Equipo de Desarrollo)",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "justification": "La persona que puede inspeccionar la evolución del Framework , es el Scrum Master.",
    //       "question": "La Alta Gerencia desea auditar periódicamente si el equipo está siguiendo las prácticas y los principios de Scrum. ¿Quién está en la mejor posición para realizar tal auditoría?",
    //       "questionEn": "Senior Management wants to periodically audit whether the team is following Scrum practices and principles. Who is in the best position to conduct such an audit?",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-MAY40xCWd3GFlH1sOdv",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Sprint Retrospective.",
    //           "nameEn": "Sprint Retrospective.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Los miembros deben ponerse de pie en el Daily Scrum.",
    //           "nameEn": "Members must stand up at the Daily Scrum.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Sprint Burndown chart.",
    //           "nameEn": "Sprint Burndown chart.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Release Planning.",
    //           "nameEn": "Release Planning.",
    //           "value": 4
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Todas las anteriores.",
    //           "nameEn": "All of the above. ",
    //           "value": 5
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "justification": "",
    //       "question": " ¿Cuál de los siguientes es requerido por Scrum?",
    //       "questionEn": "Which of the following is required by Scrum?",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-LkzXDfqZaJi2HpxIX1Z",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Equipos seleccionados a mano\n",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Equipos de ubicación conjunta\n",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Equipos auto-organizados\n",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Equipos multi-funcionales",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "Las mejores arquitecturas, requisitos y diseños surgen de",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M2ovFA-J6xNGCklBSvQ",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "El equipo de desarrollo invita a personas externas a la planificación de Sprint para preguntarles cómo convertir un elemento de Backlog del producto en un incremento a través de un Backlog completo y detallado del Sprint.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El Equipo de Desarrollo tiene todas las habilidades necesarias para crear un Incremento liberable.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El equipo de desarrollo crea su propio Sprint Backlog, que refleja todo el trabajo que forma parte de la definición de \"DONE\".",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Las partes interesadas asisten al Daily Scrum para verificar el progreso y trabajar con el Scrum Master y optimizar el alcance funcional del Sprint.",
    //           "value": 4
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Los miembros del Equipo de Desarrollo están trabajando dentro de los límites de su descripción funcional y entregando muy bien el trabajo del analista al desarrollador y al probador a la integración.",
    //           "value": 5
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Los miembros del Equipo de Desarrollo seleccionan en colaboración su propio trabajo durante el Sprint.",
    //           "value": 6
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "justification": "El Daily Scrum es para el equipo de desarrollo y al que asiste el equipo de desarrollo. Las partes interesadas externas no deben usarlo para verificar el progreso.\nDurante la planificación del Sprint, el Equipo Scrum debe elaborar el Objetivo del Sprint en función del conjunto de elementos de la Lista de Producto seleccionada para el sprint. El equipo de desarrollo identifica el trabajo necesario para cumplir con el objetivo de Sprint.\nLos miembros del equipo de desarrollo de Scrum no tienen títulos ni sub-equipos; tales como pruebas, arquitectura u operaciones son reconocidas. La responsabilidad pertenece al equipo de desarrollo en su conjunto, independientemente de si los miembros del equipo tienen habilidades especializadas.",
    //       "question": "¿Tres comportamientos que demuestran que un equipo NO se autoorganiza y NO sigue la Guía Scrum?\n\n",
    //       "questionEn": "Three behaviors that demonstrate that a team does NOT self-organize and does NOT follow the Scrum Guide?",
    //       "typeAnswer": "MULTIPLE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M2_f7VcumqXlVxPuZMW",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Contiene todas las tareas y requisitos previsibles a partir de los cuales el equipo Scrum puede desarrollar y mantener un plan de proyecto completo.\n",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Proporciona información suficiente para permitir que un equipo Scrum comience la fase de diseño de un producto.\n",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Se basa en seguir los procesos de gestión de cambios.\n",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Se le permite crecer y cambiar a medida que se aprende más sobre el producto y sus clientes.",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": " ¿Cuál describe mejor  un Product Backlog?",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-LmIH5POK6dXEBTvcVYB",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Características adicionales en un estado usable que complementan las entregadas en la iteración anterior.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Una descomposición de todos los elementos del Backlog del Producto en tareas para futuras listas de Backlog de Sprint.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Un conjunto de pruebas automatizadas para verificar la funcionalidad entregada en iteraciones anteriores.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Un nuevo diseño de interfaz de usuario para la funcionalidad entregada en iteraciones anteriores.",
    //           "value": 4
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Diagramas UML que describen cómo entregar funcionalidad en futuras iteraciones.",
    //           "value": 5
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "¿Cuál de las siguientes opciones describe mejor un incremento de software en funcionamiento?",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M2aSV600SZkhAht4Ugg",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Enseña al equipo de desarrollo a mantener el Scrum diario dentro de los 15 minutos.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Si hay otros presentes en el Daily Scrum, se asegura de que no interrumpan la reunión.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Es responsable de llevar a cabo el Daily Scrum.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Asegura que el equipo de desarrollo tenga la reunión",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "El Scrum Master hace lo siguiente con respecto al Daily Scrum (seleccione todas las variantes aplicables):",
    //       "typeAnswer": "MULTIPLE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-MANZ9shGOhqFTWOK8H7",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El lunes siguiente a la Revisión de Sprint.",
    //           "nameEn": "The Monday following the Sprint Review.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Inmediatamente después de la conclusión del Sprint anterior.",
    //           "nameEn": "Immediately after the conclusion of the previous Sprint.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Inmediatamente después del siguiente Sprint Planning.",
    //           "nameEn": "Immediately following the next Sprint Planning.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Cuando el propietario del producto esté listo.",
    //           "nameEn": "When the Product Owner is ready.",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "justification": "Los Sprint inician inmediatamente después de la conclusión del Sprint anterior",
    //       "question": "¿Cuándo comienza el próximo Sprint?",
    //       "questionEn": "When does the next Sprint begin?",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M2aPyQqNMEFvGRsga_J",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Verdadero",
    //           "value": true
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Falso",
    //           "value": false
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "justification": "No necesariamente.",
    //       "question": "¿El Scrum Master debe participar en todas las reuniones de Scrum?",
    //       "questionEn": "Does the Scrum Master have to participate in all Scrum meetings?",
    //       "typeAnswer": "TRUE_OR_FALSE",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M2pRC_RkSZRLAevkGwX",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Un proceso definido y predictivo que se ajusta a los principios de la Gestión Científica.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Una metodología completa que define cómo desarrollar software.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Un marco dentro del cual se desarrollan productos complejos en entornos complejos.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Un libro de cocina que define las mejores prácticas para el desarrollo de software.",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "¿Qué enunciado describe mejor a Scrum?\n\nJustificación : Scrum no es un proceso o una técnica para construir productos; más bien, es un marco dentro del cual puede emplear diversos procesos y técnicas.",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M3DQA4x6euu-MfOiSpn",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Verdadero",
    //           "value": true
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Falso",
    //           "value": false
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "Verdadero / Falso - Un scrum Master es esencialmente lo mismo que un PM tradicional (Jefe de Proyectos) - PSM I",
    //       "typeAnswer": "TRUE_OR_FALSE",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M3CNMzavdo0hmEEHk2d",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Daily Scrum",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Sprint Retrospective\n",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Sprint Review",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Reunión de Refinamiento",
    //           "value": 4
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Planificación de Lanzamientos",
    //           "value": 5
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "¿Cuáles de los siguientes tres son bucles de retroalimentación en scrum?\n(Elige tres mejoras respuestas) - PSM I",
    //       "typeAnswer": "MULTIPLE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-MAd_DzWlqfB60nXgsgY",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Espere para mencionar esto en la Retrospectiva del Sprint.\n",
    //           "nameEn": "Wait to bring this up until the Sprint Retrospective.\n",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Entrene al propietario del producto sobre cómo hablar con el equipo de desarrollo sobre esta preocupación.",
    //           "nameEn": "Coach the Product Owner on how to talk with the Development Team about this concern.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Lleve la preocupación a los QA para mejorar cómo se prueba el sistema.",
    //           "nameEn": "Bring the concern to the testers to improve how the system is tested.\n",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Aliente al propietario del producto a poner el rendimiento en el Product Backlog y exprese la preocupación de las partes interesadas al equipo de desarrollo.",
    //           "nameEn": "Encourage the Product Owner to put performance on the Product Backlog and express the stakeholders concern to the Development Team. ",
    //           "value": 4
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Explique al propietario del producto que depende del equipo de desarrollo decidir sobre estándares de rendimiento aceptables.",
    //           "nameEn": "Explain to the Product Owner that it's up to the Development Team to decide on acceptable performance standards.",
    //           "value": 5
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "justification": "ninguna",
    //       "question": "Varios Sprints estan en un proyecto, el Propietario del producto le dice al Scrum Master que una parte interesada clave acaba de comenzar a usar el producto. La parte interesada no está contenta con el bajo rendimiento. ¿Cuáles son esas dos buenas opciones para el Scrum Master?  ",
    //       "questionEn": "Several Sprints into a project, the Product Owner tells the Scrum Master that a key stakeholder just started using the product. The stakeholder is unhappy with the slow performance. What are two good options for the Scrum Master?",
    //       "typeAnswer": "MULTIPLE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M2a0iqV3JG48A6wAY94",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Para saber qué entregará el equipo en los próximos tres Sprints",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Para poder reprender al equipo cuando no alcanzan su objetivo de velocidad para el Sprint.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Hace una completa transparencia de lo que se ha hecho al final de cada Sprint.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Para predecir la productividad del equipo a lo largo del tiempo.",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "¿Por qué el propietario del producto quiere que el equipo de desarrollo se adhiera a su definición de Listo?",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-MAhz2zHJzHWjO-eTrJJ",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El Scrum Master o el Scrum Master pueden hacer que el equipo de desarrollo lo haga.",
    //           "nameEn": "The Scrum Master, or the Scrum Master may have the Development Team do it.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "El Product Owner.",
    //           "nameEn": "The product Owner.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El analista de negocios que representa al propietario del producto en el equipo de desarrollo.",
    //           "nameEn": "The business analyst who represents the Product Owner in the Development Team.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "El Scrum Master. ",
    //           "nameEn": "The Scrum Master. ",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "justification": "El responsable de dar la claridad  de los Product Backlog Items, es el Product Owner.",
    //       "question": "¿Quién es responsable de expresar claramente los  Product Backlog items?",
    //       "questionEn": "Who is responsible for clearly expressing Product Backlog items?",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-MAiHsgUYshOS32746DC",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Haga que el equipo Scrum cree un Product Backlog items  para cada preocupación.",
    //           "nameEn": "Have the Scrum Team create Product Backlog items for each concern.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Delegue el trabajo al departamento en cuestión.",
    //           "nameEn": "Delegate the work to the concerned department.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Agregue un Sprint para resolver específicamente todos los problemas de seguridad.",
    //           "nameEn": "Add a Sprint to specifically resolve all security concerns.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Posponga el trabajo hasta que un especialista pueda realizar una auditoría de seguridad y cree una lista de elementos de la Pila de productos relacionados con la seguridad.",
    //           "nameEn": "Postpone the work until a specialist can perform a security audit and create a list of security-related Product Backlog items.",
    //           "value": 4
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Agregue problemas de seguridad a la definición de \"Done\".",
    //           "nameEn": "Add security concerns to the definition of “Done”.",
    //           "value": 6
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "justification": "",
    //       "question": "¿Cuáles son dos buenas maneras para que un equipo Scrum se asegure de que se satisfagan las preocupaciones de seguridad?",
    //       "questionEn": "What are two good ways for a Scrum Team to ensure security concerns are satisfied?",
    //       "typeAnswer": "MULTIPLE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M2aXWbuI3ea-K-ItipN",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Verdadero",
    //           "value": true
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Falso",
    //           "value": false
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "Todos los equipos de desarrollo que trabajan en el mismo producto deben usar la misma cartera de productos.",
    //       "typeAnswer": "TRUE_OR_FALSE",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-MAY5B54qe-5HQx8CmEi",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Ejecute las pruebas de integración y regresión antes del final del Sprint, y capture el trabajo abierto para el Backlog de Sprint del próximo Sprint.",
    //           "nameEn": "Run the integration and regression tests before the end of the Sprint, and capture the open work for the Sprint Backlog of the next Sprint.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Agréguelos a la cartera de productos y mantenga informado al propietario del producto sobre el esfuerzo esperado.",
    //           "nameEn": "Add them to the Product Backlog and keep the Product Owner posted on the expected effort.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Póngalos en una lista separada en el tablero Scrum, disponible para que todos lo vean.",
    //           "nameEn": "Put them on a separate list on the Scrum board, available for all to see.\n",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Agréguelos a la definición de \"Done\" para que el trabajo se haga cargo de cada Sprint.",
    //           "nameEn": "Add them to the definition of “Done” so the work is taken care of every Sprint.",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "justification": "",
    //       "question": "¿Cuáles son dos buenas maneras para que el equipo de desarrollo haga visibles los requisitos no funcionales?",
    //       "questionEn": "What are two good ways for the Development Team to make non.functional requirements visible?",
    //       "typeAnswer": "MULTIPLE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M2pG9RwWHuoMiP7I68V",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Según sea necesario, sin una asignación especial para cambios en la productividad.",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Nunca, porque reduce la productividad.",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Según sea necesario, teniendo en cuenta una reducción a corto plazo de la productividad.",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Cada Sprint para promover el aprendizaje compartido.",
    //           "value": 4
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "¿La membresía del equipo de desarrollo debe cambiar ?\n\nJustificación : Los equipos suelen seguir algunos pasos antes de lograr un estado de mayor rendimiento. Cambiar la membresía generalmente reduce la cohesión, afectando el rendimiento y la productividad a corto plazo.",
    //       "typeAnswer": "ONE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-LkvQBXOiGGlO7yR_ice",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Se comunica a todos los miembros del equipo y partes interesadas.\n",
    //           "value": 1
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Cumple con la definición de hecho.\n",
    //           "value": 2
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Como resultado, el propietario del producto actualiza las hojas de ruta y el plan de lanzamiento.\n",
    //           "value": 3
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "El arquitecto lo ha aprobado.\n",
    //           "value": 4
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "No hay deuda técnica.",
    //           "value": 5
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "Elija cuáles afirmaciones son verdaderas sobre las iteraciones aprobadas ",
    //       "typeAnswer": "MULTIPLE_ANSWER",
    //       "withImage": ""
    //     }
    //   },
    //   {
    //     "key": "-M2pR_aIEJz_aXR6wOWa",
    //     "data": {
    //       "answers": [
    //         {
    //           "action": "edit",
    //           "isCorrect": null,
    //           "name": "Verdadero",
    //           "value": true
    //         },
    //         {
    //           "action": "edit",
    //           "isCorrect": true,
    //           "name": "Falso",
    //           "value": false
    //         }
    //       ],
    //       "category": "SCRUM_MASTER",
    //       "image": "",
    //       "question": "El Equipo Scrum debe elegir al menos una mejora del proceso de alta prioridad, identificada durante la Retrospectiva de Sprint, y colocarla en la Lista de Producto.\n\nJustificación :  Falso, para garantizar una mejora continua, el Backlog de Sprint en lugar del Backlog del Producto incluye al menos una mejora de proceso de alta prioridad identificada en la reunión retrospectiva de Sprint anterior.",
    //       "typeAnswer": "TRUE_OR_FALSE",
    //       "withImage": ""
    //     }
    //   }
    // ];

    this.getQuestions.forEach(question => {
      if(question.data) {          

        if(question.data.answers) {
          let incorrect = 0;
          let correct   = 0;

          let findAnswerTrue = question.data.answers.filter(f => f.isCorrect === true);
          let findAnswerNull = question.data.answers.filter(f => f.isCorrect === null);

          question.data.answers.forEach(answer => {

            if(answer.checked !== undefined) {
              if(answer.checked === answer.isCorrect && answer.checked === true && answer.isCorrect === true) {
                correct += 1;
              }
              if(answer.checked !== answer.isCorrect && answer.checked === true && answer.isCorrect === null) {
                incorrect += 1;
              }
            } else {
              
            }            
          });

          question.data['checkedIcon'] = '';

          if(findAnswerTrue.length === correct && findAnswerTrue.length > 0 && correct > 0 && incorrect == 0) {
            this.answerCheckedSuccess = this.answerCheckedSuccess + 1;
            question.data['checkedIcon'] = '';
          }
          
          if(findAnswerNull.length > 0 && incorrect > 0) {
            this.answerCheckedError = this.answerCheckedError + 1;
            question.data['checkedIcon'] = 'exclamation';
          }

        }
      }
    });


    that.porcApproved = Math.round(((that.answerCheckedSuccess / this.getQuestions.length) * 100));

    if(that.porcApproved >= 80) {
      that.alert.type = 'success';
      that.alert.message = '¡Felicitaciones, aprobaste el examen!';
    } else {
      that.alert.type = 'warning';
      that.alert.message = 'No pudiste aprobar el examen';
    }

    var myPieChart = new Chart(document.getElementById('realtime'), {
        type: 'pie',
        data: {
          labels: ['Correctas', 'Incorrectas'],
          datasets: [{
            data: [that.answerCheckedSuccess, that.answerCheckedError],
            backgroundColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)'
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255,99,132,1)'
            ],
            borderWidth: 0
          }]
        },
        options: {
          title: {
            display: false,
            text: 'Resultado'
          },
          responsive: true,
          layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        }
      }
    });


  }

  public beforeChange($event: NgbPanelChangeEvent) {
    // console.log($event);
    // var my_element = document.getElementById($event.panelId.toString() + '-header');
    // my_element.scrollIntoView({
    //   behavior: "smooth",
    //   // block: "start",
    //   // inline: "nearest"
    // });
    this.routers.navigateByUrl('/exams/SCRUM_MASTER/score/' + $event.panelId.toString() + '-header' );

    // this.routers.navigateByUrl('/exams/SCRUM_MASTER/score/' + $event.panelId.toString() + '-header' );
    // if ($event.panelId === 'preventchange-2') {
    //   $event.preventDefault();
    // }

    // if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
    //   $event.preventDefault();
    // }
  }

}
