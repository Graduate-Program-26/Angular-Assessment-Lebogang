import { Injectable , inject} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MenuItem } from "primeng/api";
@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);

    getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: MenuItem[] = []): MenuItem[] {
        const children: ActivatedRoute[] = route.children;

        if (children.length === 0) return breadcrumbs;

        for (const child of children) {
            const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
            if (routeURL !== '') url += `/${routeURL}`;

            const label = child.snapshot.data['breadcrumb'];
            if (label) {
                breadcrumbs.push({ label, routerLink: url });
            }

            return this.getBreadcrumbs(child, url, breadcrumbs);
        }
        return breadcrumbs;
    }
}