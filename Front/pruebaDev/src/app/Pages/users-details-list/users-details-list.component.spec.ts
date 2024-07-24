import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDetailsListComponent } from './users-details-list.component';

describe('UsersDetailsListComponent', () => {
  let component: UsersDetailsListComponent;
  let fixture: ComponentFixture<UsersDetailsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersDetailsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
