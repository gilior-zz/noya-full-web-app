

import {CV} from "../../../../../shared/models";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Biography} from "./biography";
import {BiographyComponent} from "../biography/biography.component";
import {Actions} from "../../../store/actions/actions";
import {NgRedux} from "@angular-redux/store";
import {of} from "rxjs/index";
import {By} from "@angular/platform-browser";

describe('biographies (parent) ', () => {
  let mockNgRedux;
  let cvs: Array<CV> = [{Text: 'a'},
    {Text: 'b'},
    {Text: 'c'},
    {Text: 'd'},]
  let fixture: ComponentFixture<Biography>, mockActions
  beforeEach(() => {
    mockNgRedux = jasmine.createSpyObj(['select'])
    mockActions = jasmine.createSpyObj(['dispatcAction'])
    TestBed.configureTestingModule({

      declarations: [Biography, BiographyComponent],
      providers: [
        {provide: Actions, useValue: mockActions},
        {provide: NgRedux, useValue: mockNgRedux}]
    })
    fixture = TestBed.createComponent(Biography);
    mockNgRedux.select.and.returnValue(of(cvs))
    fixture.componentInstance.cvs = cvs
    fixture.detectChanges();
  })
  it(`should display correct number of cvs (${cvs.length})`, () => {

    let l = fixture.debugElement.queryAll(By.directive(BiographyComponent));
    let ll = l.length;
    expect(ll).toEqual(cvs.length);
  })
})
