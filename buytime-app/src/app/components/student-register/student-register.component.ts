import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Додаємо FormsModule
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-register',
  standalone: true,
  imports: [FormsModule], // Додаємо до імпортів
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.scss'],
})
export class StudentRegisterComponent {
  username = '';
  password = '';
  fullName = '';

  constructor(private http: HttpClient, private router: Router) {}

  register(): void {
    const data = { username: this.username, password: this.password, fullName: this.fullName };
    this.http.post('http://localhost:5000/api/register', data).subscribe(
      (response: any) => {
        alert('Registration successful!');
        this.router.navigate(['/login-student']);
      },
      (error) => {
        alert('Registration failed!');
        console.error(error);
      }
    );
  }
}
