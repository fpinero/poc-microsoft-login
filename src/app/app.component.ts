import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'poc-microsoft-login';
  userLogged: string | undefined;

  constructor (private msalService: MsalService) {
    
  }
  ngOnInit(): void {
    this.msalService.instance.handleRedirectPromise().then(
      res => {
        if ( res !== null && res.account !== null ) {
          this.msalService.instance.setActiveAccount(res.account)
        }
      }
    )
  }

  isLoggedIn() : boolean {
    if ( this.msalService.instance.getActiveAccount() !== null ) {
      this.userLogged = this.msalService.instance.getActiveAccount()?.username
      console.info("user logged is: " + this.userLogged);
      return true;
    } else {
      console.info("user is NOT logged in");
      return false;
    }
  }

  login() {
    
    this.msalService.loginRedirect();


    //login via popup
    //this.msalService.loginPopup().subscribe( (response: AuthenticationResult) => {
    //  this.msalService.instance.setActiveAccount(response.account)

    // Así se obtendría el token si se necesita para llamar al back
    // this.msalService.instance.setActiveAccount(response.accessToken)

   // } );
  }

  logout() {
    this.msalService.logout();

  }

}
