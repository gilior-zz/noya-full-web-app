import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CardsManagerComponent} from './cards-manager.component';
import {TraverseItemComponent} from '../card/traverse-item.component';
import {By} from '@angular/platform-browser';

describe('cards-manager.component', () => {
  let fixture: ComponentFixture<CardsManagerComponent>
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardsManagerComponent, TraverseItemComponent],
    })
    TestBed.createComponent(CardsManagerComponent);
  })
  xit('should display correct number of items', () => {
    let traverseItemComponents = fixture.debugElement.query(By.directive(TraverseItemComponent))
    expect()
  })
})
