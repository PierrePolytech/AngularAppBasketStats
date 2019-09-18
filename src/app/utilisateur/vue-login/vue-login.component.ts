import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { UserConnection } from 'src/app/shared/userConnection';

@Component({
  selector: 'app-vue-login',
  templateUrl: './vue-login.component.html',
  styleUrls: ['./vue-login.component.css']
})
export class VueLoginComponent implements OnInit {
    loginForm = new FormGroup({
        username: new FormControl(''),
        password: new FormControl('')
    });
    
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public userService: UserService
    ) { }

    ngOnInit() {
    }
    
    onSubmit() {
        const user = new UserConnection();
        user.username = this.loginForm.value.username;
        user.password = this.loginForm.value.password;
        this.userService.connectUser(user).subscribe(
            success => {
                if(this.route.snapshot.queryParams.returnUrl) {
                    this.router.navigate([this.route.snapshot.queryParams.returnUrl]);
                }else {
                    this.router.navigate(['/']);
                }
            },
            error => alert(error)
        );
    }
}
