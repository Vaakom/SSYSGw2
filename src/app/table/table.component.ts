import {Component, OnInit, OnDestroy} from '@angular/core';
import {SessionService} from "../session.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'table',
  templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit, OnDestroy {
  code: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.code = params["code"];
    });
  }


  ngOnDestroy(): void {
  }
}
