import { Component, inject, OnInit, HostListener, NgZone, ChangeDetectorRef } from "@angular/core";
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DialogModule } from 'primeng/dialog';
import { MenuItem } from "primeng/api";
import { FormsModule } from "@angular/forms";
import { AutoCompleteCompleteEvent } from "primeng/autocomplete";
import { BreadcrumbService } from "../../directives/breadCrumb";
import { filter, Subject, debounceTime, distinctUntilChanged, switchMap, takeUntil, of } from "rxjs";
import { NavigationEnd } from "@angular/router";
import { SearchService } from "../../services/search.service";
import { TagModule } from 'primeng/tag'; @Component({
    selector: 'header-bar',
    standalone: true,
    imports: [AutoCompleteModule, BreadcrumbModule, FormsModule, RouterModule, DialogModule, TagModule],
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

        .search {
            width: 250px;
        }

        .p-autocomplete {
            width: 100%;
        }


    
    `,
    template: `
        <div class="header">
            <div class="header-left">
                <h1>Crescendo</h1>
                <p-breadcrumb  [model]="breadCrumbItems"  [home]="home" class="breadcrumb"/>
            </div>  

        
            <div class="search">
                <p-autocomplete 
                    [(ngModel)]="selectedSearchItem" 
                    [suggestions]="searchSugesstions" 
                    (completeMethod)="search($event)" 
                    [scrollHeight]="'450px'" 
                    [appendTo]="'body'"
                    class="custom-search"
                    placeholder="Search Workspace (⌘+K)">
                    <ng-template let-item #item>
                        <div class="flex align-items-center justify-content-between w-full py-2">
                            <div class="flex align-items-center gap-2">
                                @if (item.image) {
                                    <img [src]="item.image" style="width: 24px; height: 24px; border-radius: 4px;" />
                                } @else {
                                    <i [className]="'pi ' + item.icon"></i>
                                }
                                <span class="font-medium">{{ item.label }}</span>
                            </div>
                            <p-tag [value]="item.category" [severity]="getSeverity(item.type)"></p-tag>
                        </div>
                    </ng-template>
                </p-autocomplete>
            </div>


            <p-dialog header="Search  Command Palette" [(visible)]="showCommandPaletteDialog" appendTo="body" [modal]="true" [closable]="true" [style]="{width: '50vw', height: '30vh'}">
                <p-autocomplete 
                    #searchQuery
                    [(ngModel)]="selectedSearchItem" 
                    [suggestions]="searchSugesstions" 
                    (completeMethod)="search($event)"
                    optionLabel="label"
                    (onSelect)="onSelectSugesstions($event)"
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
    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);
    private cdr = inject(ChangeDetectorRef);
    private zone = inject(NgZone);
    private searchSubject = new Subject<string>();
    breadCrumb = inject(BreadcrumbService);
    searchService = inject(SearchService);

    showCommandPaletteDialog: boolean = false;

    breadCrumbItems: MenuItem[] = [];
    home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

    searchSugesstions: any[] = [];
    selectedSearchItem: any;


    ngOnInit() {
        this.home = {
            icon: 'pi pi-home',
            routerLink: ['/home']
        };

        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {

            this.breadCrumbItems = this.breadCrumb.getBreadcrumbs(this.activatedRoute.root);
        });
    }

    constructor() {
        this.searchSubject.pipe(
            debounceTime(300),
            distinctUntilChanged(),     // Only if query changed
            switchMap(query => {
                if (query.length < 2) return of([]);

                return this.searchService.searchAll(query);
            }),
            //  takeUntilDestroyed()        // Auto-cleanup on component destroy
        ).subscribe((results: any) => {
            this.searchSugesstions = results;
            this.cdr.markForCheck();    // Ensure UI updates
        });
    }

    search(evemt: AutoCompleteCompleteEvent) {
        const query = evemt.query.toLowerCase();

        if (query.trim().length > 2) {
            this.searchSubject.next(query);
        }
    }

    onSelectSugesstions(event: any) {
        const item = event.value;

        this.showCommandPaletteDialog = false;

        if (item.type === 'artist') {
            this.router.navigate(['/artists', item.id]);
        } else if (item.type === 'album') {
            this.router.navigate(['/albums', item.id]);
        } else if (item.type === 'track') {
            this.router.navigate(['/tracks', item.id]);
        }

        this.selectedSearchItem = null;
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

    getSeverity(type: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' {
        switch (type.toLowerCase()) {
            case 'artist':
                return 'success';   
            case 'album':
                return 'info';   
            case 'track':
                return 'warn';   
            default:
                return 'secondary'; 
        }
    }
}   