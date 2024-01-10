import { Component, OnInit, inject } from '@angular/core';
import { NoLoggedService } from '../services/no-logged.service';
import { Town } from '../models/town';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  serviceNoLogged = inject(NoLoggedService);

  protected towns: Town[] = [];
  protected town: Town = {} as Town;
  protected loaded: boolean = false;
  protected selectedTown: any = "";

  ngOnInit(): void {
    this.serviceNoLogged.getTowns().subscribe({
      next: (response: any) => {
        this.towns = response;
        this.loaded = true
        //set the default value of the first town when data is loaded
        this.selectedTown = this.towns[0].id;
      },
      error: (error: any) => {
        console.log("Error getting Towns:\n" + error);
      }
    });
  }

  onSelected(value:string): void {
		this.selectedTown = value;
	}

}