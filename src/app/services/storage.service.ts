import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'

export class objEmployee{
  constructor(
      public EmpNo?: number,
      public Name?: string,
      public PhoneNo?: string,
      public Email?: string,
      public Gender?: string,
      public Position?: string,
      public DOB?: Date,
      public Salary?: number
  ){

  }
}

const EMP_KEY = 'my-emp';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  

  constructor(private storage: Storage) { }

  async addEmployee(newEmp) {
    var empList=[];
    await this.getEmployee().then(empListstr => {
      if(empListstr!=null){
        empList=JSON.parse(empListstr);
      }

      empList.push(newEmp);
      this.storage.set(EMP_KEY, JSON.stringify(empList));
    })
  }

  getEmployee(): Promise<string>{
    return this.storage.get(EMP_KEY);    
  }


  async deleteEmployee(empNo: number){
    var empList=[];
    var newList=[];

    await this.getEmployee().then(empListstr => {
      if(empListstr!=null){
        empList=JSON.parse(empListstr);

        for (let i of empList){
          if(i.EmpNo !== empNo){
            newList.push(i);
          }
        }
        this.storage.set(EMP_KEY, JSON.stringify(newList));
      }
      });
    }

  async setEmploy(editEmploy){

    var empList=[];
    var newList=[];

    await this.storage.get(EMP_KEY).then(empListstr => {
      if(empListstr!=null){
        empList=JSON.parse(empListstr);

        for (let i of empList){
          if(i.EmpNo === editEmploy.EmpNo){
            newList.push(editEmploy);
          }
          else{
            newList.push(i);
          }
        }
        this.storage.set(EMP_KEY, JSON.stringify(newList));
      }
      });
    }

    setEmployeeList(){
     var empList = [{"EmpNo":1, "Name":"Mary Tan", "PhoneNo":"0161234567", "Email":"abc@gmail.com","Gender":"Female", "Position":"Senior Manager", "DOB":"25-Jan-1970", "Salary":5000.00}, 
     {"EmpNo":2,   "Name":"Aliasgar", "PhoneNo":"+60161234568", "Email":"xyz@yahoo.com","Gender":"Male", "Position":"Manager", "DOB":"02-Mar-1971", "Salary":3500.00}, 
     {"EmpNo":3,   "Name":"Justin Bieber", "PhoneNo":"0161234569", "Email":"abc2@gmail.com","Gender":"Male", "Position":"Manager", "DOB":"25-May-1972", "Salary":3300.00}, 
     {"EmpNo":4,   "Name":"Chow Yun Fatt", "PhoneNo":"0161234570", "Email":"xyz2@yahoo.com","Gender":"Male", "Position":"Engineer", "DOB":"13-Feb-1973", "Salary":2800.00}, 
     {"EmpNo":5,   "Name":"Angela Baby", "PhoneNo":"0161234571", "Email":"abc3@gmail.com","Gender":"Female", "Position":"Designer", "DOB":"08-Aug-1974", "Salary":2700.00}, 
     {"EmpNo":6,   "Name":"Mohd Rizal", "PhoneNo":"+80161234569", "Email":"xyz3@yahoo.com","Gender":"Male", "Position":"Engineer", "DOB":"23-Jan-1975", "Salary":2500.00}, 
     {"EmpNo":7,   "Name":"Ken Yoong", "PhoneNo":"+50161234571", "Email":"abc4@gmail.com","Gender":"Male", "Position":"Designer", "DOB":"31-Jan-1976", "Salary":2550.00}, 
     {"EmpNo":8,   "Name":"Willson Wong", "PhoneNo":"+44161234533", "Email":"xyz4@yahoo.com","Gender":"Male", "Position":"Senior Manager", "DOB":"28-Feb-1977", "Salary":5500.00}, 
     {"EmpNo":9,   "Name":"Vivian Chong", "PhoneNo":"0161234575", "Email":"abc5@gmail.com","Gender":"Female", "Position":"COO", "DOB":"25-Dec-1978", "Salary":7000.00}, 
     {"EmpNo":10,  "Name":"Shirley Tan Wai Ling", "PhoneNo":"0161234576", "Email":"xyz5@yahoo.com","Gender":"Female", "Position":"CEO", "DOB":"07-Jan-1979", "Salary":8000.00}, 
     {"EmpNo":11,  "Name":"Mary Tan 2", "PhoneNo":"01612345672", "Email":"abc9@gmail.com","Gender":"Female", "Position":"Senior Manager", "DOB":"25-Jan-1980", "Salary":5000.00}, 
     {"EmpNo":12,  "Name":"Aliasgar 2", "PhoneNo":"+601612345682", "Email":"xyz9@yahoo.com","Gender":"Male", "Position":"Manager", "DOB":"02-Mar-1981", "Salary":3500.00}, 
     {"EmpNo":13,  "Name":"Justin Bieber 2", "PhoneNo":"1612345692", "Email":"abc29@gmail.com","Gender":"Male", "Position":"Manager", "DOB":"25-May-1982", "Salary":3300.00}, 
     {"EmpNo":14,  "Name":"Chow Yun Fatt 2", "PhoneNo":"01612345702", "Email":"xyz29@yahoo.com","Gender":"Male", "Position":"Engineer", "DOB":"13-Feb-1983", "Salary":2800.00}, 
     {"EmpNo":15,  "Name":"Angela Baby 2", "PhoneNo":"01612345712", "Email":"abc39@gmail.com","Gender":"Female", "Position":"Designer", "DOB":"08-Aug-1984", "Salary":2700.00}, 
     {"EmpNo":16,  "Name":"Mohd Rizal 2", "PhoneNo":"+801612345692", "Email":"xyz39@yahoo.com","Gender":"Male", "Position":"Engineer", "DOB":"23-Jan-1985", "Salary":2500.00}, 
     {"EmpNo":17,  "Name":"Ken Yoong 2", "PhoneNo":"+501612345712", "Email":"abc49@gmail.com","Gender":"Male", "Position":"Designer", "DOB":"31-Jan-1986", "Salary":2550.00}, 
     {"EmpNo":18,  "Name":"Willson Wong 2", "PhoneNo":"+441612345332", "Email":"xyz49@yahoo.com","Gender":"Male", "Position":"Senior Manager", "DOB":"28-Feb-1987", "Salary":5500.00}, 
     {"EmpNo":19,  "Name":"Vivian Chong 2", "PhoneNo":"01612345752", "Email":"abc59@gmail.com","Gender":"Female", "Position":"CTO", "DOB":"25-Dec-1988", "Salary":7000.00}, 
     {"EmpNo":20,  "Name":"Shirley Tan Wai Ling 2", "PhoneNo":"01612345762", "Email":"xyz59@yahoo.com","Gender":"Female", "Position":"СМО", "DOB":"07-Jan-1989", "Salary":8000.00}]
     this.storage.set(EMP_KEY, JSON.stringify(empList));
    }
}
