import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-users-details-list',
  templateUrl: './users-details-list.component.html',
  styleUrl: './users-details-list.component.css'
})
export class UsersDetailsListComponent  implements OnInit{

  users: any = []

  constructor(private userService: UserService){

  }

  async ngOnInit(): Promise<void> {
    await this.fetchData();
  }

  async fetchData(){
    var userList = await this.userService.getUsersDetails();
    this.users = userList.data;
    console.log(userList);
  }

}
