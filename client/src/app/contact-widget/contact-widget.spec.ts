import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ContactWidget} from './contact-widget';
import {ReactiveFormsModule} from '@angular/forms';
import {CacheManager, TranslationService} from '../services/services';
import {RouterTestingModule} from '@angular/router/testing';
import {PPipe} from '../pipes/pipes.pipe';
import {Actions} from '../../store/actions/actions';
import {of} from 'rxjs/index';
import {NgRedux} from '@angular-redux/store';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';

describe('contact-widget', () => {
  let mockNgRedux = jasmine.createSpyObj(['select'])
  let fixture: ComponentFixture<ContactWidget>;
  let actions = jasmine.createSpyObj(['dispatcAction']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, BrowserAnimationsModule],
      declarations: [ContactWidget, PPipe],
      providers: [CacheManager, TranslationService,
        {provide: Actions, useValue: actions},
        {provide: NgRedux, useValue: mockNgRedux}
      ]
    })
    fixture = TestBed.createComponent(ContactWidget);
    mockNgRedux.select.and.returnValue(of(true))
    fixture.detectChanges();
  })
  it('hide widget if showWidget is false', () => {
    fixture.componentInstance.showWidget = false;
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  })
  it('expand widget on click (after 2 seconds)', () => {
    let iElement = fixture.debugElement.query(By.css('i'));
    setTimeout(() => {
      let divElement = fixture.nativeElement.querySelector('div') as HTMLDivElement;
      iElement.triggerEventHandler('click', null);
      fixture.detectChanges();
      let clientHeight = divElement.clientHeight;
      console.log('clientHeight', clientHeight)
      expect(clientHeight).toBeGreaterThan(40)
    }, 2000)
  })

  it('button enabled after text input (after 2 seconds)', () => {
    setTimeout(() => {
      let iElement = fixture.debugElement.query(By.css('i'));
      let divElement = fixture.nativeElement.querySelector('div') as HTMLDivElement;
      iElement.triggerEventHandler('click', null);
      fixture.detectChanges();
      fixture.componentInstance.contactWidgetForm.controls['message'].setValue('some text');
      fixture.detectChanges();
    }, 2000)
  })
})
