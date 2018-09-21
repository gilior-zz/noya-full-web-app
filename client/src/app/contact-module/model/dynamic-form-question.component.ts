import {keys} from 'lodash'
import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors} from '@angular/forms';

import {QuestionBase} from './question-base';

@Component({
  selector: 'ny-question',
  styleUrls: ['./dynamic-form-question.component.scss'],
  templateUrl: './dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['disabled'])
    //   console.log(changes['disabled'])
  }

  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  @Input() disabled: boolean;

  get isInvalid() {

    return this.ctrl.invalid && (this.ctrl.dirty || this.ctrl.touched);
  }

  get ctrl(): FormControl {
    return this.form.controls[this.question.key] as FormControl
  }

  get errors(): string[] {


    return keys(this.ctrl.errors);
  }
}
