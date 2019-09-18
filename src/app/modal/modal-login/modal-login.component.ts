import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { UserService } from 'src/app/shared/user.service';
import { UserConnection } from 'src/app/shared/userConnection';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {

    
    loginForm = new FormGroup({
        username: new FormControl(''),
        password: new FormControl('')
    });

    constructor(
        public userService: UserService,
        public dialogRef: MatDialogRef<ModalLoginComponent>
    ) {
    }

    ngOnInit() {
    }
    
    onSubmit() {
        const user = new UserConnection();
        user.username = this.loginForm.value.username;
        user.password = this.loginForm.value.password;
        this.userService.connectUser(user).subscribe(
            success => {
                this.dialogRef.close(false);
            },
            error => alert(error)
        );
    }
    
    onNoClick(): void {
        this.dialogRef.close(false);
    }
}