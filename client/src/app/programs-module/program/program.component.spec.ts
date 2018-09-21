import {ComponentFixture, TestBed} from "@angular/core/testing";
import {ProgramComponent} from "./program.component";
import {SafeResourcePipe} from "../../pipes/safe.pipe";

describe('program.component', () => {
  let fixture: ComponentFixture<ProgramComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramComponent, SafeResourcePipe]
    })
    fixture = TestBed.createComponent(ProgramComponent)
    fixture.componentInstance.prg = {Text: 'some text'}
    fixture.detectChanges();
  })
  it('should render text into div', () => {
    let l = fixture.nativeElement.querySelector('div')
    let ll = l.textContent;
    expect(ll).toBe('some text')
  })
})
