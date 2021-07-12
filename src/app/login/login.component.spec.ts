import { AuthService } from '../auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let service : AuthService;

  beforeEach(() => { (1)
    service = new AuthService();
    component = new LoginComponent(service);
  });

  afterEach(() => { (2)
    localStorage.removeItem('token');
  });


  it('needsLogin returns true when the user has not been authenticated', () => {
    expect(component.needsLogin()).toBeTruthy();
  });

  it('needsLogin returns false when the user has been authenticated', () => {
    localStorage.setItem('token', '12345');
    expect(component.needsLogin()).toBeFalsy();
  });
});
