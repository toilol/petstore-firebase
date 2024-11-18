import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LolPage } from './lol.page';

describe('LolPage', () => {
  let component: LolPage;
  let fixture: ComponentFixture<LolPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
