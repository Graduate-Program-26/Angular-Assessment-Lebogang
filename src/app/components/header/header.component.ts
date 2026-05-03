import { Component, inject, OnInit, HostListener, NgZone, ChangeDetectorRef } from "@angular/core";
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Router, RouterModule } from "@angular/router";
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DialogModule } from 'primeng/dialog';
import { MenuItem } from "primeng/api";
import { MusicService } from "../../services/music.services";
import { FormsModule } from "@angular/forms";
import { AutoCompleteCompleteEvent } from "primeng/autocomplete";

@Component({
    selector: 'header-bar',
    standalone: true,
    imports: [AutoCompleteModule, BreadcrumbModule, FormsModule, RouterModule, DialogModule],
    styles: `
    .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
            background-color: #ffffff;
            border-bottom: 1px solid #ebebeb;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .header-left {
            display: flex;
            align-items: center;
            gap: 2rem;
        }

        .header h1 {
            margin: 0;
            font-size: 1.25rem;
            font-weight: 600;
            color: #37352f;
            letter-spacing: -0.02em;
        }

        /* PrimeNG customization using global styles */
        .breadcrumb,
        .p-breadcrumb {
            background: transparent !important;
            border: none !important;
            padding: 0 !important;
        }

        .p-breadcrumb .p-menuitem-text {
            color: #37352f;
            font-size: 0.875rem;
        }

        .p-breadcrumb .p-breadcrumb-chevron {
            color: rgba(55, 53, 47, 0.4);
        }

        .notion-search {
            width: 280px;
        }

        .p-autocomplete {
            width: 100%;
        }

        .p-autocomplete-input {
            width: 100% !important;
            border-radius: 6px !important;
            border: 1px solid #e0e0e0 !important;
            background: #fbfbfa !important;
            padding: 0.375rem 0.75rem !important;
            font-size: 0.875rem !important;
            color: #37352f !important;
            transition: all 0.2s ease !important;
        }

        .p-autocomplete-input:focus {
            border-color: #37352f !important;
            box-shadow: 0 0 0 2px rgba(55, 53, 47, 0.1) !important;
        }
    
    `,
    template: `
        <div class="header">
            <div class="header-left">
                <h1>Crescendo</h1>
                <p-breadcrumb  [model]="breadCrumbItems"  [home]="home" class="breadcrumb"/>
            </div>  

        
            <div class="search">
                <p-autocomplete [(ngModel)]="selectedSearchItem" 
                    [suggestions]="searchSugesstions" 
                    (completeMethod)="search($event)" 
                    (onSelect)="onSelectSUgesstions($event)"
                    placeholder="Search Workspace (⌘+K)" />
            </div>


            <p-dialog header="Calendar Command Palette" [(visible)]="showCommandPaletteDialog" appendTo="body" [modal]="true" [closable]="true" [style]="{width: '50vw', height: '30vh'}">
                <p-autocomplete 
                    #searchQuery
                    [(ngModel)]="selectedSearchItem" 
                    [suggestions]="searchSugesstions" 
                    (completeMethod)="search($event)"
                    optionLabel="label"
                    (onSelect)="onSelectSUgesstions($event)"
                    placeholder="Type a command or search events..."
                    [style]="{'width':'100%'}"
                    [inputStyle]="{'width':'100%'}">
                    
                    <ng-template let-item pTemplate="item">
                        <div class="flex align-items-center justify-content-between w-full">
                            <div>
                                <i [className]="'pi ' + item.icon + ' mr-2'"></i>
                                <span>{{ item.label }}</span>
                            </div>
                            <small class="text-secondary" style="font-size: 0.7rem; text-transform: uppercase;">
                                {{ item.category }}
                            </small>
                        </div>
                    </ng-template>
                </p-autocomplete>
            </p-dialog>
        </div>
    `
})
export class TopHeader implements OnInit {
    private musicService = inject(MusicService);
    private cdr = inject(ChangeDetectorRef);
    private zone = inject(NgZone);

    showCommandPaletteDialog : boolean = false;

    breadCrumbItems: MenuItem[] | undefined;
    home: MenuItem | undefined;

    searchSugesstions: string[] = [];
    selectedSearchItem: unknown;


    ngOnInit() {
        this.home = {
            icon: 'pi pi-home',
            routerLink: ['/home']
        };

        this.breadCrumbItems = [
            { label: 'Artist', routerLink: '/artist' },
            { label: 'Album', routerLink: '/album' },
            { label: 'Playlist', routerLink: '/playlist' }
        ]
    }

    search(evemt: AutoCompleteCompleteEvent) {
        const query = evemt.query.toLowerCase();


        //debounce fetch from music api
        this.searchSugesstions = [
            'some song',
            'some artist etc'
        ].filter(item => item.toLowerCase().includes(query))
    }

    onSelectSUgesstions(evemt: unknown) {
        // if suggesstion is clciked, navigate to that route
    }


    @HostListener('window:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        const isKPressed = event.key.toLowerCase() === 'k';
        const isIPressed = event.key.toLowerCase() === 'i';
        const isModifierPressed = event.metaKey || event.ctrlKey;

        if (isModifierPressed && isIPressed) {
            event.preventDefault();
            this.zone.run(() => {

            });
        }

        if (isModifierPressed && isKPressed) {
            event.preventDefault(); // Prevents browser-level search bar from popping up
            this.showCommandPaletteDialog = true;

        }

        if (event.key === 'Escape' && this.showCommandPaletteDialog) {

            this.cdr.markForCheck();
        }
    }

}   