import {Router, RouterModule} from '@angular/router';

import {LoginFormComponent} from "./login/login-form.component";
import {TableComponent} from "./table/table.component";

import {SessionGuard} from "./system/session.guard";

export const routing = RouterModule.forRoot([
    {path: 'table/:code', component: TableComponent, canActivate: [SessionGuard]},
    {path: '**', component: LoginFormComponent}
]);
