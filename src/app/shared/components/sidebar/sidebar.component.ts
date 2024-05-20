import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AuthserviceService } from '../../../core/service/authservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterOutlet, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  userId = this.service.getCurrentUserId();
  studentProfile: any[] = [];

  constructor(private service: AuthserviceService, private router: Router) {
    this.userId = this.service.getCurrentUserId();
  }

  ngOnInit(): void {
    this.loadInfo();
  }

  loadInfo() {
    if (this.userId) {
      console.log(this.userId);
      this.service.getStudentProfile(this.userId).subscribe((res) => {
        this.studentProfile = res;
      });
    }
  }

  logout(): void {
    Swal.fire({
      title: 'Logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Logout Successfully',
          icon: 'success',
        });
        sessionStorage.removeItem('token');
        this.router.navigate(['login']);
      }
    });
  }
}
