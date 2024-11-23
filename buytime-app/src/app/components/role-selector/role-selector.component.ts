import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-role-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './role-selector.component.html',
  styleUrls: ['./role-selector.component.scss']
})
export class RoleSelectorComponent {
  constructor(private router: Router) {}

  selectRole(role: string): void {
    if (role === 'student') {
      this.router.navigate(['/student-auth']);
    } else if (role === 'teacher') {
      this.router.navigate(['/teacher-auth']);
    }
  }
}
