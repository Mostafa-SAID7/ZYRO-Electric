

import { MOCK_BRANCHES } from './mock-branches';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent  {constructor() { BranchesComponent.prototype.__init.call(this);BranchesComponent.prototype.__init2.call(this);BranchesComponent.prototype.__init3.call(this);BranchesComponent.prototype.__init4.call(this);BranchesComponent.prototype.__init5.call(this);BranchesComponent.prototype.__init6.call(this);BranchesComponent.prototype.__init7.call(this);BranchesComponent.prototype.__init8.call(this);BranchesComponent.prototype.__init9.call(this); }
  __init() {this.branches = MOCK_BRANCHES}
  __init2() {this.filteredBranches = []}
  
  __init3() {this.searchQuery = ''}
  __init4() {this.selectedCity = 'All'}
  __init5() {this.selectedService = 'All'}
  
  __init6() {this.selectedBranch = null}
  __init7() {this.preferredBranchId = null}
  
  __init8() {this.cities = ['All', 'New York', 'San Francisco', 'Austin', 'Chicago', 'Miami']}
  __init9() {this.servicesList = [
    'All',
    'Store Pickup',
    'Tech Support Bar',
    'Express Repairs',
    'Product Demos',
    'Trade-In Center',
    'VIP Lounge'
  ]}

  ngOnInit() {
    const saved = localStorage.getItem('zyro_preferred_branch');
    if (saved) {
      this.preferredBranchId = saved;
    } else {
      this.preferredBranchId = 'b-001';
    }
    this.applyFilters();
  }

  applyFilters() {
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

  onSearchChange() {
    this.applyFilters();
  }

  selectCity(city) {
    this.selectedCity = city;
    this.applyFilters();
  }

  selectService(service) {
    this.selectedService = service;
    this.applyFilters();
  }

  openBranchDetails(branch) {
    this.selectedBranch = branch;
  }

  closeBranchDetails() {
    this.selectedBranch = null;
  }

  setPreferredBranch(branchId, event) {
    if (event) {
      event.stopPropagation();
    }
    this.preferredBranchId = branchId;
    localStorage.setItem('zyro_preferred_branch', branchId);
  }

  getPreferredBranch() {
    return this.branches.find(b => b.id === this.preferredBranchId);
  }
}
