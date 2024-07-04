import { TestBed } from '@angular/core/testing';

import { DbTaskService } from './db-task.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('DbTaskService', () => {
  let service: DbTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SQLite]
    });
    service = TestBed.inject(DbTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
