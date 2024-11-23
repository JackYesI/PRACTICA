import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.scss']
})
export class TeacherProfileComponent implements OnInit {
  profile: any = { schedule: [] };
  newMeeting = { day: '', time: '', description: '' };
  meetings: any[] = [];
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProfile();
    this.loadMeetings();
  }

  loadProfile(): void {
    const username = localStorage.getItem('username');
    this.http.get(`http://localhost:5000/api/profile/${username}`).subscribe(
      (data: any) => {
        this.profile = data;
      },
      (error) => {
        this.errorMessage = 'Не вдалося завантажити профіль.';
        console.error('Помилка завантаження профілю:', error);
      }
    );
  }

  loadMeetings(): void {
    const username = localStorage.getItem('username');
    this.http.get(`http://localhost:5000/api/meetings/${username}`).subscribe(
      (data: any) => {
        this.meetings = data;
      },
      (error) => {
        console.error('Помилка завантаження зустрічей:', error);
      }
    );
  }

  createMeeting(): void {
    const username = localStorage.getItem('username');
    const meeting = { ...this.newMeeting, teacher: username };

    this.http.post('http://localhost:5000/api/meetings', meeting).subscribe(
      () => {
        alert('Зустріч створено!');
        this.newMeeting = { day: '', time: '', description: '' };
        this.loadMeetings();
      },
      (error) => {
        alert('Помилка під час створення зустрічі.');
        console.error('Помилка створення зустрічі:', error);
      }
    );
  }
}
