import { Component, OnInit, inject } from "@angular/core";
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from "primeng/api";
import { RouterModule } from "@angular/router";
@Component({
    selector: 'sidebar',
    imports: [PanelMenuModule, RouterModule],
    template: `
        <div class="sidebar">
            <div class="sidebar-brand">
                <span>Crescendo music-space</span>
            </div>

            <p-panelMenu [model]="panalMenuItems" />
        </div>
    `,
    styles: `
        .sidebar {
            width: 260px;
            height: 100vh;
            background-color: #f7f6f3;
            border-right: 1px solid rgba(55, 53, 47, 0.08);
            padding: 1.5rem 0.75rem;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .sidebar-brand {
            padding: 0 0.75rem;
            font-size: 1rem;
            font-weight: 600;
            color: #37352f;
        }

        .p-panelmenu {
            border: none;
            background: transparent;
        }

        .p-panelmenu .p-panelmenu-panel {
            border: none;
            background: transparent;
        }

        .p-panelmenu .p-panelmenu-header .p-panelmenu-header-link {
            background: transparent;
            border: none;
            color: rgba(55, 53, 47, 0.8);
            padding: 0.5rem 0.75rem;
            border-radius: 4px;
            font-size: 0.875rem;
            font-weight: 500;
            transition: background 0.1s ease;
        }

        .p-panelmenu .p-panelmenu-header .p-panelmenu-header-link:hover {
            background: rgba(55, 53, 47, 0.08);
            color: #37352f;
        }

        .p-panelmenu .p-submenu-list {
            background: transparent;
            padding-left: 0.75rem;
            border: none;
        }

        .p-panelmenu .p-submenu-list .p-menuitem-link {
            padding: 0.375rem 0.75rem;
            color: rgba(55, 53, 47, 0.6);
            border-radius: 4px;
            font-size: 0.85rem;
            margin: 2px 0;
        }

        .p-panelmenu .p-submenu-list .p-menuitem-link:hover {
            background: rgba(55, 53, 47, 0.06);
            color: #37352f;
        }
    `,
    standalone: true
})
export class SidebarComponent implements OnInit {
    panalMenuItems: MenuItem[] = [];

    ngOnInit() {
        this.panalMenuItems = [ // would be. dynamic
            {
                label: 'Home',
                icon: 'pi pi-home',
                routerLink: ['/home']
            },
            {
                label: 'Workspace Databases',
                icon: 'pi pi-folder',
                items: [
                    {
                        label: 'Artists',
                        icon: 'pi pi-user',
                        routerLink: ['/artist']
                    },
                    {
                        label: 'Albums',
                        icon: 'pi pi-book',
                        routerLink: ['/albums/1'] // Links to collection view
                    },
                    {
                        label: 'Tracks',
                        icon: 'pi pi-volume-up',
                        routerLink: ['/track/1']
                    }
                ]
            },
            {
                label: 'Playlists',
                icon: 'pi pi-list',
                routerLink: ['/playlists']
            }
        ];
    }

}