import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Contact} from './contact';
import {QuestionControlService} from '../model/question-control.service';
import {CacheManager, TranslationService} from '../../services/services';
import {Actions} from '../../../store/actions/actions';
import {questions} from './questions';
import {DynamicFormQuestionComponent} from '../model/dynamic-form-question.component';
import {By} from '@angular/platform-browser';
import {NgForm, ReactiveFormsModule} from '@angular/forms';
import {PPipe} from '../../pipes/pipes.pipe';


describe('contact', () => {
  let qcs, cache, actions
  let fixture: ComponentFixture<Contact>
  beforeEach(() => {
    qcs = jasmine.createSpyObj(['toFormGroup']);
    cache = jasmine.createSpyObj(['GetFromCache']);
    actions = jasmine.createSpyObj(['dispatcAction']);
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [Contact, DynamicFormQuestionComponent, PPipe],
      providers: [
        TranslationService,
        QuestionControlService,
        CacheManager,
        Actions
      ]
    })
    fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
  })

  it(`should dosplay correct number of questions ${questions.length}`, () => {
    let dynamicFormQuestionComponents = fixture.debugElement.queryAll(By.directive(DynamicFormQuestionComponent));
    expect(dynamicFormQuestionComponents.length).toEqual(questions.length)
  })
  describe(`form sanity`, () => {
    let ngForm, form, button, dynamicFormQuestionComponents;
    let legalValue = 'lslfgjlgnjhklkgnjldfkg@dfgdfgfdgsdgbdgf.com';
    let ilegalValue = '';
    beforeEach(() => {
      fixture.detectChanges();
      ngForm = fixture.debugElement.query(By.css('form')).componentInstance.form as NgForm;
      form = fixture.debugElement.query(By.css('form'));
      button = fixture.debugElement.query(By.css('button'));
      dynamicFormQuestionComponents = fixture.debugElement.queryAll(By.directive(DynamicFormQuestionComponent));
    })


    describe('send button sanity', () => {

      it('button is enabled for valid fields', () => {
        dynamicFormQuestionComponents.forEach((dynamicFormQuestionComponent) => {
          ngForm.controls[dynamicFormQuestionComponent.componentInstance.question.key].setValue(legalValue);
          fixture.detectChanges();
          let item = dynamicFormQuestionComponent.query(By.css('input, textarea'));
        })
        expect(button.properties['disabled'].toString()).toBe('false');
      })
      it('button is disabled for invalid fields', () => {
        dynamicFormQuestionComponents.forEach((dynamicFormQuestionComponent) => {
          ngForm.controls[dynamicFormQuestionComponent.componentInstance.question.key].setValue(ilegalValue);
          fixture.detectChanges();
        })
        expect(button.properties['disabled'].toString()).toBe('true');
      })
      it('send button is disabled after sending (wait 2 seconds!!)', () => {
        dynamicFormQuestionComponents.forEach((dynamicFormQuestionComponent) => {
          ngForm.controls[dynamicFormQuestionComponent.componentInstance.question.key].setValue(legalValue);
          fixture.detectChanges();
        })
        setTimeout(() => {
          form.triggerEventHandler('submit', null);
          fixture.detectChanges();
          expect(button.properties['disabled'].toString()).toBe('true');
        }, 2000)
      })
    })
  })
})
