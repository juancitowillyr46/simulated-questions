import { Answer } from './answer.model';

export interface Question {
 question: string;
 questionEn: string;
 typeAnswer: string;
 category: any;
 withImage: string;
 image: string;
 answers: Answer[];
 justification: string;
}
