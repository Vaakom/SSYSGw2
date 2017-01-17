import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: `        
        <top-menu #topMenu></top-menu>

        <div class="container-fluid">
            <router-outlet (onSuccessLogin)="console.log('Cought it!');"></router-outlet>
        </div>
    `
})

export class AppComponent {
}
