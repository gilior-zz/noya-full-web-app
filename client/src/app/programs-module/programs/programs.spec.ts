import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Programs} from "./programs";
import {ProgramComponent} from "../program/program.component";
import {SafeResourcePipe} from "../../pipes/safe.pipe";
import {Actions} from "../../../store/actions/actions";

import {Program} from "../../../../../shared/models";
import {By} from "@angular/platform-browser";
import {of} from "rxjs/index";
import {NgRedux} from "@angular-redux/store";

describe('programs', () => {
  let mockNgRedux;
  let prgs: Array<Program> = [{Text: 'a'},
    {Text: 'b'},
    {Text: 'c'},
    {Text: 'd'},]
  let fixture: ComponentFixture<Programs>, mockActions
  beforeEach(() => {
    mockNgRedux = jasmine.createSpyObj(['select'])
    mockActions = jasmine.createSpyObj(['dispatcAction'])
    TestBed.configureTestingModule({

      declarations: [Programs, ProgramComponent, SafeResourcePipe],
      providers: [
        {provide: Actions, useValue: mockActions},
        {provide: NgRedux, useValue: mockNgRedux}]
    })
    fixture = TestBed.createComponent(Programs);
    mockNgRedux.select.and.returnValue(of(prgs))
    fixture.componentInstance.prgs = prgs
    fixture.detectChanges();
  })
  it('should display correct number of ProgramComponent', () => {

    let l = fixture.debugElement.queryAll(By.directive(ProgramComponent));
    let ll = l.length;
    expect(ll).toEqual(prgs.length);
  })
})
