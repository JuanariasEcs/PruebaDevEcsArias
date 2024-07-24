import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {

  users: any = []

  constructor(private userService: UserService){

  }

  async ngOnInit(): Promise<void> {
    await this.fetchData();
  }

  async fetchData(){
    var userList = await this.userService.getUsers();
    this.users = userList.data;
    console.log(userList);
  }

}
