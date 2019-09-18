import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { Router} from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { Token } from 'src/app/shared/token';

@Injectable()
export class AuthErrorHandler implements ErrorHandler {

    constructor(
        private injector : Injector,
        public userService: UserService,
        private zone: NgZone
    ) { 
    }

      handleError(error) {
        if (error.status === 401 || error.status === 403) {
            const router = this.injector.get(Router);
            const token = new Token();
            token.refreshToken = localStorage.getItem("refresh_token");
            if(token.refreshToken){
                 this.userService.refreshToken(token).subscribe(    
                    success =>{
                        this.refreshToken(success);
                    },
                    error => {
                        this.zone.run(() => router.navigate(['/login']));
                    }
                );
            }else {
                this.zone.run(() => router.navigate(['/login']));
            }
        }
      }
    
    refreshToken(json){
        localStorage.setItem('id_token', json.token);
        localStorage.setItem('refresh_token', json.refreshToken);
    }
}