import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Додаємо CommonModule

@Component({
  selector: 'app-teacher-details',
  standalone: true,
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.scss'],
  imports: [CommonModule], // Додаємо CommonModule до імпортів
})
export class TeacherDetailsComponent implements OnInit {
  teacher: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const teacherId = this.route.snapshot.params['id'];
    this.fetchTeacherDetails(teacherId);
  }

  fetchTeacherDetails(teacherId: number): void {
    this.http.get(`http://localhost:5000/api/teachers/${teacherId}`).subscribe(
      (data: any) => {
        this.teacher = data;
      },
      (error) => {
        console.error('Error fetching teacher details:', error);
      }
    );
  }

  bookSlot(slot: string): void {
    const bookingData = {
      id: new Date().getTime(),
      teacherId: this.teacher.id,
      slot,
      studentName: 'Student Name',
    };

    this.http.post('http://localhost:5000/api/book', bookingData).subscribe(
      () => {
        alert(`Booking confirmed for ${slot} with ${this.teacher.displayName}`);
      },
      (error) => {
        console.error('Error booking slot:', error);
        alert('Failed to book the slot.');
      }
    );
  }
}
