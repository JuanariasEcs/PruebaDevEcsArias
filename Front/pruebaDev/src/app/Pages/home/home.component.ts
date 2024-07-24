import { Component, OnInit } from '@angular/core';
import { RestService } from '../../Services/rest.service';
import { SessionStorageService } from '../../Services/session-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  isAdmin : boolean = false;

  constructor(private authService: RestService, private sessionStorageService: SessionStorageService){

  }
  async ngOnInit(): Promise<void> {
    var sessionData = await this.sessionStorageService.getSessionData();
    debugger
    if(sessionData?.role.toLocaleLowerCase() == "admin"){
      this.isAdmin = true;
    }
  }

  async logOut(){
    await this.authService.logout();
  }

}
