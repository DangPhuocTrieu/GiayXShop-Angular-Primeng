import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })
  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private messageService: MessageService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  handleSubmit(form: FormGroup) {
    form.markAllAsTouched()

    if(!form.valid) return
    
    this.authService.login(this.form.value).subscribe({
      next: (res) => {
        localStorage.setItem('user', JSON.stringify(res.data))
        this.router.navigate(['/'])
      },
      error: ({ error }) => {
        this.messageService.add({severity:'error', summary:'Failed', detail:  error.message ? error.message : 'Internal server error' });
      }
    })
  }

}
