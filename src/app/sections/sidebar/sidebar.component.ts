import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  constructor(private loginService: LoginService,
    private router: Router) {}

  ngOnInit(): void {
  }

  onSignOut(): void {
    this.loginService.signOutUser()
    .then(() => {
      this.router.navigate(['/login']);
    });
  }
}
