import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() isLogin?: boolean;

  query: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  search(): void {
    this.router.navigate(['/incident-details', this.query])
      .then(result => {
        if (result) {
          this.query = '';
        }
      });
  }
}
