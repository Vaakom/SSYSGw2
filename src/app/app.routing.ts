import {Router, RouterModule} from '@angular/router';

import {LoginFormComponent} from "./login/login-form.component";
import {TableComponent} from "./table/table.component";

import {SessionGuard} from "./system/session.guard";
import {ConfigGuard} from "./system/config.guard";

export const routing = RouterModule.forRoot([
    {path: 'table/:code', component: TableComponent, canActivate: [ConfigGuard, SessionGuard]},
    {path: '**', component: LoginFormComponent, canActivate: [ConfigGuard] }
]);
