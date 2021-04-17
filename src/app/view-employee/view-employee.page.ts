import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.page.html',
  styleUrls: ['./view-employee.page.scss'],
})
export class ViewEmployeePage implements OnInit {
  employData: any;
  employNo: any;

  constructor(private route: ActivatedRoute, private router: Router, private storageService: StorageService ) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.employData = JSON.parse(params.special);
        this.employNo = this.employData.EmpNo;
      }
    });

   }

  ngOnInit() {
  }

  returnToHome(){
    this.router.navigate(['home']);
  }

  deleteEmploy(){
    this.storageService.deleteEmployee(this.employData.EmpNo);
    console.log(this.employData);
    this.router.navigate(['home']);
  }

  saveEmploy(){
    this.storageService.setEmploy(this.employData);
    console.log(this.employData);
    this.router.navigate(['home']);
}

}
