import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { objEmployee, StorageService,  } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    // EmployList: objEmployee[]; 
    EmployPageList =[];
    filteredItems = [];

    constructor(public router: Router, private storageService: StorageService, private plt:Platform, private toastController: ToastController,private activatedRoute:ActivatedRoute) {
      this.activatedRoute.queryParams.subscribe(routeParams=>{
        this.plt.ready().then(() =>{
           this.loadEmployee();
        })
      })
    }

  ngOnInit(){

  }

  loadEmployee(){
    this.storageService.getEmployee().then(empList => {
      if(empList!=null){
        this.EmployPageList = JSON.parse(empList);
      }
      else{
        this.storageService.setEmployeeList();
        this.loadEmployee()
        return;
      }
      this.assignCopy();
    });
  }

  selectEmploy(selectedEmp){
    console.log(selectedEmp);
    let navigationExtras: NavigationExtras = {
    queryParams: {
    special: JSON.stringify(selectedEmp)
      }
    };
    this.router.navigate(['view-employee'], navigationExtras);
  }

  AddNewEmploy(){
    this.router.navigate(['add-employee']);
  }

  assignCopy(){
    this.filteredItems = Object.assign([], this.EmployPageList);
 }

 onCancel(event) {
  this.filterItem("");
}

 filterItem(value){
  if(!value){
      this.assignCopy();
  } // when nothing has typed
  this.filteredItems = Object.assign([], this.EmployPageList).filter(
    item => item.Name.toLowerCase().indexOf(value.toLowerCase()) > -1
  )
}
}
