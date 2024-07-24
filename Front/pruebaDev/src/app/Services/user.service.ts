import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { CommandResult } from '../Interface/command-result';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private rest: RestService) { }


  async getUsers(): Promise<any> {
    debugger
    const result = (await this.rest.Get("User/getUsers")).body as CommandResult;
    return result;
  }

  async getUsersDetails(): Promise<any> {
    debugger
    const result = (await this.rest.Get("User/getUsersDetails")).body as CommandResult;
    return result;
  }
}
