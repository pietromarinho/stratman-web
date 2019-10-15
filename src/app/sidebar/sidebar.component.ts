import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [
    {
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard'
    },
    {
        path: '/#',
        title: 'Simular cenários',
        type: 'link',
        icontype: 'blur_on'
    },
    {
        path: '/#',
        title: 'Analizar modelos',
        type: 'link',
        icontype: 'border_all'
    },
    {
        path: '/#',
        title: 'Manipular layouts',
        type: 'link',
        icontype: 'category'
    },
    {
        path: '/#',
        title: 'Históricos',
        type: 'link',
        icontype: 'folder'
    },
    {
        path: '/#',
        title: 'Parametrizar valores',
        type: 'link',
        icontype: 'tune'
    }
];
@Component({
    selector: 'app-sidebar-cmp',
    styleUrls: ['sidebar.component.css'],
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    updatePS(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            let ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
}
