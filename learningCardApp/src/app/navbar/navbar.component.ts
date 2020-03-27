import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../user/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(private _authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  logout() {
    console.log("loggin out");
    this._authenticationService.logout();
  }

}
