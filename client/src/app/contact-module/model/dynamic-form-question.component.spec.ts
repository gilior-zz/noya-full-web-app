import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DynamicFormQuestionComponent} from './dynamic-form-question.component';
import {TextAreaQuestion} from './question-textarea';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CacheManager, TranslationService} from '../../services/services';
import {PPipe} from '../../pipes/pipes.pipe';
import {QuestionControlService} from './question-control.service';
import {questions} from '../Contact/questions';
import {TextboxQuestion} from './question-textbox';


describe('dynamic-form-question.component', () => {
  let fixture: ComponentFixture<DynamicFormQuestionComponent>;
  let form, questionControlService;
  let formGroup: FormGroup;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DynamicFormQuestionComponent, PPipe],
      providers: [TranslationService, CacheManager, QuestionControlService]
    })
    fixture = TestBed.createComponent(DynamicFormQuestionComponent);
    questionControlService = fixture.debugElement.injector.get(QuestionControlService);
    formGroup = questionControlService.toFormGroup(questions);
    fixture.componentInstance.form = formGroup;
  })
  it('should disply text area question', () => {
    const textAreaQuestion = new TextAreaQuestion({
      key: 'content',
      label: 'content',
      required: true,
      order: 3,
      minLength: 5,
      errMsgs: {'required': 'content is required', 'minlength': 'must be at least ' + 5 + ' chars'}
    })
    fixture.componentInstance.question = textAreaQuestion;
    fixture.detectChanges();
    let textarea = fixture.nativeElement.querySelector('textarea');
    expect(textarea).toBeTruthy();
  })
  it('should disply text box question', () => {
    const textboxQuestion =  new TextboxQuestion({
      key: 'email',
      label: 'email',
      type: 'email',
      required: true,
      order: 2,
      errMsgs: {'required': 'email is required', 'email': 'invalid email'}
    })
    fixture.componentInstance.question = textboxQuestion;
    fixture.detectChanges();
    let input = fixture.nativeElement.querySelector('input');
    expect(input).toBeTruthy();
  })
})
