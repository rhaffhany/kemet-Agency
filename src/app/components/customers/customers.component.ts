import { CustomerService } from './../../services/customer.service';
import { MatSort } from '@angular/material/sort';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})

export class CustomersComponent implements OnInit , AfterViewInit  {

  constructor(private _ProfileService:ProfileService, private _CustomerService:CustomerService){}
  
  searchIcon: string = "../../../assets/icons/Search.png";
  agencyPP:string = '../../../assets/img/Agency pp.png'
  kLogo:string = '../../../assets/logo/K.png'
  
  user:string = '@'
  travelAgencyData:any = {};

  customersIcon: string = '../../../assets/icons/profile-2user.png';
  newCustomers: string = '../../../assets/icons/new customers.png';

  //table
  data: any;
  options: any;

  rows: number = 4; 
  first: number = 0;

  customersData:any = {};
  customers:any[] = [];

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns = ['name', 'date', 'package', 'phone', 'email', 'category'];

  ngOnInit(): void {

    this._ProfileService.getTravelAgencyDashboard().subscribe({
      next: (data) => {
        this.travelAgencyData = data;
      },
    })

    this._CustomerService.getTravelAgencyCustomers().subscribe({
      next: (res) => {
        this.customersData = res;
        this.customers = res.customers.$values;
        this.dataSource = new MatTableDataSource(this.customers);
        this.dataSource.data = this.customers;
      }
    });

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortByDate(order: 'newest' | 'oldest') {
    this.customers.sort((a, b) => {
    const dateA = this.parseDate(a.createdAt);
    const dateB = this.parseDate(b.createdAt);

    return order === 'newest'
    ? dateB.getTime() - dateA.getTime()
    : dateA.getTime() - dateB.getTime();
    });
    
    this.dataSource.data = [...this.customers]; 
    // this.dataSource.sort = this.sort;
  }

  parseDate(dateString: string): Date {
    return new Date(dateString);
  }
    
  get paginatedPackages() {
    return this.customers.slice(this.first, this.first + this.rows);
  }
  
  onPageChange(event: any) {
    this.first = event.first;
  }

}
