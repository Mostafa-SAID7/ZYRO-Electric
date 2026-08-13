import { Component, OnInit } from '@angular/core';
import { Branch } from './models/branch.model';
import { MOCK_BRANCHES } from './mock-branches';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {
  branches: Branch[] = MOCK_BRANCHES;
  filteredBranches: Branch[] = [];
  
  searchQuery: string = '';
  selectedCity: string = 'All';
  selectedService: string = 'All';
  
  selectedBranch: Branch | null = null;
  preferredBranchId: string | null = null;
  
  cities: string[] = ['All', 'New York', 'San Francisco', 'Austin', 'Chicago', 'Miami'];
  servicesList: string[] = [
    'All',
    'Store Pickup',
    'Tech Support Bar',
    'Express Repairs',
    'Product Demos',
    'Trade-In Center',
    'VIP Lounge'
  ];

  ngOnInit(): void {
    const saved = localStorage.getItem('zyro_preferred_branch');
    if (saved) {
      this.preferredBranchId = saved;
    } else {
      this.preferredBranchId = 'b-001';
    }
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredBranches = this.branches.filter(branch => {
      const matchesSearch = 
        branch.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        branch.city.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        branch.zipCode.includes(this.searchQuery) ||
        branch.address.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesCity = this.selectedCity === 'All' || branch.city === this.selectedCity;
      const matchesService = this.selectedService === 'All' || branch.services.includes(this.selectedService);

      return matchesSearch && matchesCity && matchesService;
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  selectCity(city: string): void {
    this.selectedCity = city;
    this.applyFilters();
  }

  selectService(service: string): void {
    this.selectedService = service;
    this.applyFilters();
  }

  openBranchDetails(branch: Branch): void {
    this.selectedBranch = branch;
  }

  closeBranchDetails(): void {
    this.selectedBranch = null;
  }

  setPreferredBranch(branchId: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.preferredBranchId = branchId;
    localStorage.setItem('zyro_preferred_branch', branchId);
  }

  getPreferredBranch(): Branch | undefined {
    return this.branches.find(b => b.id === this.preferredBranchId);
  }
}
