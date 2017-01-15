import {Router, RouterModule} from '@angular/router';

import {LoginFormComponent} from "./login/login-form.component";

export const routing = RouterModule.forRoot([
    {path: '', component: LoginFormComponent},
    {path: '', component: LoginFormComponent}
]);