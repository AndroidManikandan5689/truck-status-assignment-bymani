import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/shared/component/alert-dialog/alert-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error: string;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private alertDialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
        // redirect to home if already logged in
        if (this.authService.userValue) {
            let currentUser = localStorage.getItem('user');
            if (currentUser != null) {
                this.router.navigate(['/']);
            }
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],    //assignmentuser@gmail.com
            password: ['', Validators.required]     //qwerty123
        });
    }

    // convenience getter for easy access to form fields
    get f(): any { return this.loginForm.controls; }

    /**
     * Login Api integrated while press login button in logic component
     * @returns 
     */
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.loading = false;
                    if(data.success)
                    {                        
                    this.showSnackBar(data.message);
                    this.router.navigate(["/"]);
                    }
                    else{
                        this.showErrorDialog(data.message);                        
                    }
                    console.log(data);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                    this.showErrorDialog(this.error);
                });
    }

    /**
     * Show the success message snack bar
     */
    showSnackBar(msg: string){
        this.snackBar.open(msg)
    }

    /**
     * Show the common alert dialog for error message
     * @param msg 
     */
    showErrorDialog(msg: string) {
        this.alertDialog.open(AlertDialogComponent, { data: { type: "Opps!", data: msg } })
    }

}
