import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

/* info-dialog.component.html
//==========
//
//AUTHOR: Ecem Gulec (ecegulec35@gmail.com)
// CREATED: 2023-08-09
// UPDATED: 2023-08-16
*/
@Component({
  selector: 'app-country-dialog',
  templateUrl: './country-dialog.component.html',
  styleUrls: ['./country-dialog.component.css']
})
export class CountryDialogComponent {
  //property 
  country: any;
  map: any;
  cityDataSource = new MatTableDataSource();
  columns = ['Name', 'District', 'Population'];

  //ctor
  constructor(http: HttpClient, @Inject(MAT_DIALOG_DATA) data: any){
    this.country = data;
    this.map = this.getMapImage();

    //laoding City JSON file
    const URL = "http://ejd.songho.ca/syst24444/city/";
    http.get(URL).subscribe({
     next : (json: any) => {
        this.cityDataSource.data = json.City.filter((city: any) => 
          city.CountryCode == this.country.Code
        );
       },
       error: e => console.log(e.message)
      });
  }

  //get Images from Maps
  getMapImage(){
    let code = this.country.Code.toLowerCase(); 
    return  "http://ejd.songho.ca/syst24444/maps/" + code +".gif";
  }

}
