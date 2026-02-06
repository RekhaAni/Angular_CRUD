import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from './student.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {

  students: any[] = [];
  currentPage = 1;
  totalPages = 1;

  form = { name: '', age: null as number | null, course: '' };
  editingId: number | null = null;

  constructor(
    private studentService: StudentService,
    private cdr: ChangeDetectorRef   
  ) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents(page: number = 1) {
    this.studentService.getStudents(page).subscribe(res => {
      this.students = res.students;
      this.totalPages = res.total_pages;
      this.currentPage = res.current_page;

      this.cdr.detectChanges();   
    });
  }

  submitForm() {
    if (!this.form.name || !this.form.age || !this.form.course) {
      alert("Please fill all fields");
      return;
    }

    const action = this.editingId
      ? this.studentService.updateStudent(this.editingId, this.form)
      : this.studentService.addStudent(this.form);

    action.subscribe(() => {
      this.resetForm();
      this.loadStudents(this.currentPage);
    });
  }

  editStudent(student: any) {
    this.form = { name: student.name, age: student.age, course: student.course };
    this.editingId = student.id;
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id)
      .subscribe(() => this.loadStudents(this.currentPage));
  }

  resetForm() {
    this.form = { name: '', age: null, course: '' };
    this.editingId = null;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.loadStudents(page);
    }
  }

  hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }

  hasPrevPage(): boolean {
    return this.currentPage > 1;
  }
}