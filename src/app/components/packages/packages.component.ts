import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PackageService } from 'src/app/services/package.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit{

  constructor(private _PackageService:PackageService,
              private _ActivatedRoute:ActivatedRoute){}

  data: any;
  options: any;

  rows: number = 3; 
  first: number = 0;

  packages:any[] = [];
  planID:any;

  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.planID = params.get('planID');
      }
    });

    this._PackageService.getAllPackages().subscribe({
      next:(res)=>{
        this.packages = res.$values; 
      },
      error:(err)=>{
        console.log(err);
      }
    });

    this._PackageService.getPackages().subscribe({
      next:(res)=>{        
        // this.packages = res.plans.$values; 
        const topPlans = res.topPlans;   

        if (topPlans) {
          const entries = Object.entries(topPlans).filter(([key]) => key !== '$id');
          const sorted = entries.sort((a, b) => parseFloat(String(b[1])) - parseFloat(String(a[1])));
          const top3 = sorted.slice(0, 3);
          const remaining = sorted.slice(3).reduce((sum, [, value]) => sum + parseFloat(String(value)), 0);

          // Prepare labels and values
          let labels = top3.map(([key]) => key.trim());
          let values = top3.map(([, value]) => parseFloat(String(value)));
          if (remaining > 0) {
            labels.push('Others');
            values.push(remaining);
          }
          const total = values.reduce((sum, val) => sum + val, 0);
          // Calculate percentages as decimals
          let dataValues = values.map(val => parseFloat(((val / total) * 100).toFixed(2)));

          this.data = {
            labels: labels,
            datasets: [
              {
                label: 'percentage',
                data: dataValues,
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
        }
    
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
