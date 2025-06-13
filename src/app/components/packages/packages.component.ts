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
          const total = entries.reduce((sum, [, value]) => sum + Number(value), 0);
    
          let labels = entries.map(([key]) => key.trim());
          let dataValues = entries.map(([, value]) =>
            Math.round((Number(value) / total) * 100)
          );

          const percentSum = dataValues.reduce((sum, val) => sum + val, 0);

          // If the total isn't 100%, add "Others"
          const remaining = 100 - percentSum;
          if (remaining > 0) {
            labels.push('Others');
            dataValues.push(remaining);
          }

          this.data = {
            // a3la 3 plans w others
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
