import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { AppService } from 'src/app/utils/services/app.service';
import { TokenStorageService } from 'src/app/utils/services/tokenStorage.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/utils/services/auth.service';

@Component({
  selector: 'app-user-dropdown-menu',
  templateUrl: './user-dropdown-menu.component.html',
  styleUrls: ['./user-dropdown-menu.component.scss'],
})
export class UserDropdownMenuComponent implements OnInit {
  @ViewChild('dropdownMenu', { static: false }) dropdownMenu;

  public user;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private appService: AppService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private authService: AuthService
  ) {}

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.hideDropdownMenu();
    }
  }

  ngOnInit(): void {
    this.user = this.appService.user;
  }

  toggleDropdownMenu() {
    if (this.dropdownMenu.nativeElement.classList.contains('show')) {
      this.hideDropdownMenu();
    } else {
      this.showDropdownMenu();
    }
  }

  showDropdownMenu() {
    this.renderer.addClass(this.dropdownMenu.nativeElement, 'show');
  }

  hideDropdownMenu() {
    this.renderer.removeClass(this.dropdownMenu.nativeElement, 'show');
  }

  logout() {
    this.tokenStorageService.signOut();
    this.authService.userLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
