import {QuestionBase} from '../model/question-base';
import {TextboxQuestion} from '../model/question-textbox';
import {TextAreaQuestion} from '../model/question-textarea';

let name_min = 4
let email_min = 10


export const questions: QuestionBase<any>[] = [
  new TextboxQuestion({
    key: 'name',
    label: 'name',
    value: '',
    required: true,
    order: 1,
    minLength: name_min,
    errMsgs: {'required': 'name is required', 'minlength': 'must be at least ' + name_min + ' chars'}
  }),

  new TextboxQuestion({
    key: 'email',
    label: 'email',
    type: 'email',
    required: true,
    order: 2,
    errMsgs: {'required': 'email is required', 'email': 'invalid email'}
  }),
  new TextAreaQuestion({
    key: 'content',
    label: 'content',
    required: true,
    order: 3,
    minLength: email_min,
    errMsgs: {'required': 'content is required', 'minlength': 'must be at least ' + email_min + ' chars'}
  })

]
