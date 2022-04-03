import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  userDetails: any;
  userID: any = "";

  constructor(
    private classToggler: ClassToggleService,
    private router: Router,
    private service: UserService) {
    super();
  }

  ngOnInit() {
    this.userID = localStorage.getItem("user.userID");
    this.service.getUserDetails(this.userID).subscribe(
      res => {
        this.userDetails = res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  onLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user.userID");
    this.router.navigate(['/login']);
  }

}
