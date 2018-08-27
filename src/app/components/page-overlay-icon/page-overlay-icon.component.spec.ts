import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageOverlayIconComponent } from './page-overlay-icon.component';

describe('PageOverlayIconComponent', () => {
  let component: PageOverlayIconComponent;
  let fixture: ComponentFixture<PageOverlayIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageOverlayIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageOverlayIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
