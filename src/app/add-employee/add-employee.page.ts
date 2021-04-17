import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { objEmployee,StorageService } from '../services/storage.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.page.html',
  styleUrls: ['./add-employee.page.scss'],
})
export class AddEmployeePage implements OnInit {

  employData; 

  constructor(public router: Router, public storageService: StorageService, private toastController: ToastController) { }

  ngOnInit() {
    this.employData = new objEmployee();
  }

  async AddEmploy(){
      //this.storageService.addEmployee(this.employData).then(employ =>{
        // this.employData = employ;
        // this.show('Employee Added');
        // this.router.navigate(['home']);
      //})
      console.log(this.employData);
      await this.storageService.addEmployee(this.employData);
      this.router.navigate(['home']);
  }


  backToHome(){
    this.router.navigate(['home']);
  }
}
