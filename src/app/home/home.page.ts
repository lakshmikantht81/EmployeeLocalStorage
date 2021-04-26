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

    EmployList =[]; 
    EmployPageList =[];
    filteredItems = [];
    pageSize = 10;
    pageNo = 1;
    noProfileUrl:string='../../assets/ProfilePic.jpg';

    constructor(public router: Router, private storageService: StorageService, private plt:Platform, private toastController: ToastController,private activatedRoute:ActivatedRoute) {
      this.activatedRoute.queryParams.subscribe(routeParams=>{
        //this.plt.ready().then(() =>{
          this.loadEmployee(this.pageNo, this.pageSize);
        //})
      })
    }

  ngOnInit(){

  }

  // loadEmployee(){
  //   this.storageService.getEmployee().then(empList => {
  //     if(empList!=null){
  //       this.EmployList = JSON.parse(empList);
  //     }
  //     else{
  //       this.storageService.setEmployeeList();
  //       this.loadEmployee()
  //       return;
  //     }
  //     this.assignCopy();
  //   });
  // }

  loadEmployee(pageNo, pageSize){
    this.EmployPageList=[];
    this.storageService.getEmployee().then(empList => {
      if(empList!=null){
        this.EmployPageList = JSON.parse(empList);
        if(this.EmployList.length != this.EmployPageList.length){
        var minResult = (pageNo-1) * pageSize;
        var maxResult = pageNo * pageSize;
        this.EmployPageList  = this.EmployPageList.slice(minResult, maxResult);

        for (let i = 0; i < this.EmployPageList.length; i++) {
          this.EmployList.push(this.EmployPageList[i]);
        }
  
        if(this.EmployPageList.length < pageSize){
            this.pageNo = 0;
        }
        else{
          this.pageNo = this.pageNo + 1 ;
        }
      }
      else{
        this.EmployList = JSON.parse(empList);
      }

      }
      else{
        this.storageService.setEmployeeList();
        this.loadEmployee(this.pageNo, this.pageSize)
        return;
      }
      this.assignCopy();
    });
  }

  loadData(event){
    setTimeout(() =>{
      //this.storageService.getEmployee();
      this.loadEmployee(this.pageNo, this.pageSize);
    if(this.pageNo > 0){
        event.target.complete();
    }
    else{
      event.target.disabled = true;
    }
  }, 500);
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
    this.filteredItems = Object.assign([], this.EmployList);
 }

 onCancel(event) {
  this.filterItem("");
}

 filterItem(value){
  if(!value){
      this.assignCopy();
  } // when nothing has typed
  // this.filteredItems = Object.assign([], this.EmployList).filter(
  //   item => (item.Name.toLowerCase().indexOf(value.toLowerCase()) > -1)
  // )

  this.filteredItems = Object.assign([], this.EmployList).filter(
    item => (item.Name.toLowerCase().indexOf(value.toLowerCase()) > -1 || (item.EmpNo).toString().toLowerCase().indexOf(value.toLowerCase()) > -1)
  )
}

}
