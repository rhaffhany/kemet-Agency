import { Component, OnInit } from '@angular/core';
import { PackageService } from 'src/app/services/package.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit{

  constructor(private _PackageService:PackageService){}

  data: any;
  options: any;

  rows: number = 4; 
  first: number = 0;

  packages:any[] = [];

  ngOnInit(): void {
    this.data = {
      labels: ['Entertainment', 'Bill Expense', 'Investment', 'Others'],
      datasets: [
        {
          // label: 'User Types',
          data: [300, 150, 200, 80],
          backgroundColor: [
            '#343C6A',
            '#FC7900',
            '#FA00FF',
            '#1814F3'
          ],
          borderWidth: 1,
        }
      ]
    };
    this.options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'right'
        }
      },
    };

    this._PackageService.getPackages().subscribe({
      next:(res)=>{
        this.packages = res.$values;        
      },
    });

  }

  get paginatedPackages() {
    return this.packages.slice(this.first, this.first + this.rows);
  }
  
  onPageChange(event: any) {
    this.first = event.first;
  }
  

}
