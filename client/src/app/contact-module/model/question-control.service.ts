import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {QuestionBase} from './question-base';
import {ValidatorFn} from '@angular/forms/src/directives/validators';

@Injectable()
export class QuestionControlService {
  constructor() {
  }

  toFormGroup(questions: QuestionBase<any>[]) {
    let group: any = {};

    questions.forEach(question => {
        const validators: ValidatorFn[] = [];
        if (question.required)
          validators.push(Validators.required);
        if (question.minLength)
          validators.push(Validators.minLength(question.minLength));
        const formControl = new FormControl({value: question.value,disabled:false}, {validators:validators,updateOn:'blur'});
        group[question.key] = formControl

      }
    )
    return new FormGroup(group);
  }
}
