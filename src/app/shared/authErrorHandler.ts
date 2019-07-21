import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { Token } from 'src/app/shared/token'

@Injectable()
export class AuthErrorHandler implements ErrorHandler {

    constructor(
        public userService: UserService,
        private injector: Injector,
        private _ngZone: NgZone
    ) { }

      handleError(error) {
        const router = this.injector.get(Router);
        if (error.status === 401 || error.status === 403) {
            const token = new Token();
            token.refreshToken = localStorage.getItem("refresh_token");
            if(token.refreshToken){
                 this.userService.refreshToken(token).subscribe(
                    success =>{
                         this.refreshToken(success);
                    },
                    error => this._ngZone.run(() => {router.navigate(['login'])})
                );
            }else {
                this._ngZone.run(() => {router.navigate(['login'])});
            }
        }
      }
    
    refreshToken(json){
        localStorage.setItem('id_token', json.token);
        localStorage.setItem('refresh_token', json.refreshToken);
    }
}