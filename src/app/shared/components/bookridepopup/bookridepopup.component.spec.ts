import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookridepopupComponent } from './bookridepopup.component';

describe('BookridepopupComponent', () => {
  let component: BookridepopupComponent;
  let fixture: ComponentFixture<BookridepopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookridepopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookridepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
