import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CountryDialogComponent } from './country-dialog/country-dialog.component';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

/* app.component.ts
//==========
//
//AUTHOR: Ecem Gulec (ecegulec35@gmail.com)
// CREATED: 2023-08-02
// UPDATED: 2023-08-16
*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //properties
  countryDataSource = new MatTableDataSource(); 

  columns = ["Name", "Code", "Continent", "SurfaceArea","Population"];
  radios = ["All", "Africa", "Asia", "Europe", "North America", "South America", "Antarctica", "Oceania"];
  selected = "All"
  filterCountry = "";

  @ViewChild("sortCountry") sortCountry!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //ctor:inject httpclient
  constructor(http: HttpClient, public dialog: MatDialog){

    //load JSON remotely
    const URL = "http://ejd.songho.ca/syst24444/world/";
    http.get(URL).subscribe({
      //success
      next : (json: any) => {
        console.log(json);
        this.countryDataSource.data = json.Country;
        this.countryDataSource.sort=this.sortCountry;
        this.countryDataSource.paginator = this.paginator;

        console.log("Loaded Country JSON");
      },
      //failed
      error: e => console.log(e.message)
    });

  }

  //generate flag image URL
  getFlagImage(country : any){
   //get 2-char code as lower case
   let code = country.Code2.toLowerCase(); 
   return "http://ejd.songho.ca/syst24444/flags/" + code + ".jpg";
  }

  //open the detail dialog and pass the selected country object
  openDialog(country: any){
    //first, create dialog config object
    let config = new MatDialogConfig();
    config.data = country;

    //second, call open()
    this.dialog.open(CountryDialogComponent, config);

  }

  openInfo(){
    let config = new MatDialogConfig();
    this.dialog.open(InfoDialogComponent, config);
  }

  searchCountry() {
    this.countryDataSource.filter = this.filterCountry.trim().toLowerCase();
  }

  changeContinent(){
    if (this.selected== 'All') {
      this.countryDataSource.filter='';
    } else {
      this.countryDataSource.filter = this.selected;
    }
  }
  
}



