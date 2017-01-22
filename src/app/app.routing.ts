import {Router, RouterModule} from '@angular/router';

import {LoginFormComponent} from "./login/login-form.component";
import {TableComponent} from "./table/table.component";

export const routing = RouterModule.forRoot([
    {path: 'table/:code', component: TableComponent},
    {path: '**', component: LoginFormComponent}
]);
