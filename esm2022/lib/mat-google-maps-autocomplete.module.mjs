import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatGoogleMapsAutocompleteDirective } from './directives/mat-google-maps-autocomplete.directive';
import { MatValidateAddressDirective } from './directives/address-validator/mat-address-validator.directive';
// tslint:disable-next-line:max-line-length
import { MatGoogleMapsAutocompleteComponent, MatSearchGoogleMapsAutocompleteComponent } from './component';
import { MatInputModule } from '@angular/material/input';
import { ApiKeyToken } from "./tokens";
import * as i0 from "@angular/core";
export class MatGoogleMapsAutocompleteModule {
    constructor() {
    }
    static forRoot(apiKey) {
        return {
            ngModule: MatGoogleMapsAutocompleteModule,
            providers: [
                {
                    provide: ApiKeyToken,
                    useValue: apiKey
                },
            ]
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: MatGoogleMapsAutocompleteModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.2", ngImport: i0, type: MatGoogleMapsAutocompleteModule, declarations: [MatGoogleMapsAutocompleteComponent,
            MatGoogleMapsAutocompleteDirective,
            MatValidateAddressDirective,
            MatSearchGoogleMapsAutocompleteComponent], imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            FlexLayoutModule,
            MatInputModule,
            MatIconModule], exports: [MatGoogleMapsAutocompleteComponent,
            MatGoogleMapsAutocompleteDirective,
            MatValidateAddressDirective,
            MatSearchGoogleMapsAutocompleteComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: MatGoogleMapsAutocompleteModule, imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            FlexLayoutModule,
            MatInputModule,
            MatIconModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: MatGoogleMapsAutocompleteModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        FlexLayoutModule,
                        MatInputModule,
                        MatIconModule
                    ],
                    exports: [
                        MatGoogleMapsAutocompleteComponent,
                        MatGoogleMapsAutocompleteDirective,
                        MatValidateAddressDirective,
                        MatSearchGoogleMapsAutocompleteComponent,
                    ],
                    declarations: [
                        MatGoogleMapsAutocompleteComponent,
                        MatGoogleMapsAutocompleteDirective,
                        MatValidateAddressDirective,
                        MatSearchGoogleMapsAutocompleteComponent
                    ],
                    providers: [
                    // {
                    //   provide: NG_VALUE_ACCESSOR,
                    //   useExisting: forwardRef(() => MatGoogleMapsAutocompleteDirective),
                    //   multi: true
                    // }
                    ]
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LWdvb2dsZS1tYXBzLWF1dG9jb21wbGV0ZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLW1hdGVyaWFsLWV4dGVuc2lvbnMvZ29vZ2xlLW1hcHMtYXV0b2NvbXBsZXRlL3NyYy9saWIvbWF0LWdvb2dsZS1tYXBzLWF1dG9jb21wbGV0ZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxXQUFXLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFDLGtDQUFrQyxFQUFDLE1BQU0scURBQXFELENBQUM7QUFDdkcsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sZ0VBQWdFLENBQUM7QUFDM0csMkNBQTJDO0FBQzNDLE9BQU8sRUFBQyxrQ0FBa0MsRUFBRSx3Q0FBd0MsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN6RyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLFVBQVUsQ0FBQzs7QUFrQ3JDLE1BQU0sT0FBTywrQkFBK0I7SUFFMUM7SUFDQSxDQUFDO0lBRUQsTUFBTSxDQUFDLE9BQU8sQ0FDWixNQUFjO1FBR2QsT0FBTztZQUNMLFFBQVEsRUFBRSwrQkFBK0I7WUFDekMsU0FBUyxFQUNQO2dCQUNFO29CQUNFLE9BQU8sRUFBRSxXQUFXO29CQUNwQixRQUFRLEVBQUUsTUFBTTtpQkFDakI7YUFDRjtTQUNKLENBQUM7SUFDSixDQUFDO3VHQW5CVSwrQkFBK0I7d0dBQS9CLCtCQUErQixpQkFieEMsa0NBQWtDO1lBQ2xDLGtDQUFrQztZQUNsQywyQkFBMkI7WUFDM0Isd0NBQXdDLGFBakJ0QyxZQUFZO1lBQ1osV0FBVztZQUNYLG1CQUFtQjtZQUNuQixnQkFBZ0I7WUFDaEIsY0FBYztZQUNkLGFBQWEsYUFHZixrQ0FBa0M7WUFDbEMsa0NBQWtDO1lBQ2xDLDJCQUEyQjtZQUMzQix3Q0FBd0M7d0dBZ0IvQiwrQkFBK0IsWUEzQnRDLFlBQVk7WUFDWixXQUFXO1lBQ1gsbUJBQW1CO1lBQ25CLGdCQUFnQjtZQUNoQixjQUFjO1lBQ2QsYUFBYTs7MkZBc0JOLCtCQUErQjtrQkE5QjNDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUNMO3dCQUNFLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLGdCQUFnQjt3QkFDaEIsY0FBYzt3QkFDZCxhQUFhO3FCQUNkO29CQUNILE9BQU8sRUFBRTt3QkFDUCxrQ0FBa0M7d0JBQ2xDLGtDQUFrQzt3QkFDbEMsMkJBQTJCO3dCQUMzQix3Q0FBd0M7cUJBQ3pDO29CQUNELFlBQVksRUFBRTt3QkFDWixrQ0FBa0M7d0JBQ2xDLGtDQUFrQzt3QkFDbEMsMkJBQTJCO3dCQUMzQix3Q0FBd0M7cUJBQ3pDO29CQUNELFNBQVMsRUFBRTtvQkFDVCxJQUFJO29CQUNKLGdDQUFnQztvQkFDaEMsdUVBQXVFO29CQUN2RSxnQkFBZ0I7b0JBQ2hCLElBQUk7cUJBQ0w7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGbGV4TGF5b3V0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQge0Zvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge01hdEljb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHtNYXRHb29nbGVNYXBzQXV0b2NvbXBsZXRlRGlyZWN0aXZlfSBmcm9tICcuL2RpcmVjdGl2ZXMvbWF0LWdvb2dsZS1tYXBzLWF1dG9jb21wbGV0ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHtNYXRWYWxpZGF0ZUFkZHJlc3NEaXJlY3RpdmV9IGZyb20gJy4vZGlyZWN0aXZlcy9hZGRyZXNzLXZhbGlkYXRvci9tYXQtYWRkcmVzcy12YWxpZGF0b3IuZGlyZWN0aXZlJztcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbmltcG9ydCB7TWF0R29vZ2xlTWFwc0F1dG9jb21wbGV0ZUNvbXBvbmVudCwgTWF0U2VhcmNoR29vZ2xlTWFwc0F1dG9jb21wbGV0ZUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnQnO1xuaW1wb3J0IHtNYXRJbnB1dE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xuaW1wb3J0IHtBcGlLZXlUb2tlbn0gZnJvbSBcIi4vdG9rZW5zXCI7XG5pbXBvcnQge1NjcmlwdExvYWRlclNlcnZpY2V9IGZyb20gXCIuL3NlcnZpY2VzL3NjcmlwdC1sb2FkZXIuc2VydmljZVwiO1xuXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6XG4gICAgW1xuICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgRmxleExheW91dE1vZHVsZSxcbiAgICAgIE1hdElucHV0TW9kdWxlLFxuICAgICAgTWF0SWNvbk1vZHVsZVxuICAgIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBNYXRHb29nbGVNYXBzQXV0b2NvbXBsZXRlQ29tcG9uZW50LFxuICAgIE1hdEdvb2dsZU1hcHNBdXRvY29tcGxldGVEaXJlY3RpdmUsXG4gICAgTWF0VmFsaWRhdGVBZGRyZXNzRGlyZWN0aXZlLFxuICAgIE1hdFNlYXJjaEdvb2dsZU1hcHNBdXRvY29tcGxldGVDb21wb25lbnQsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1hdEdvb2dsZU1hcHNBdXRvY29tcGxldGVDb21wb25lbnQsXG4gICAgTWF0R29vZ2xlTWFwc0F1dG9jb21wbGV0ZURpcmVjdGl2ZSxcbiAgICBNYXRWYWxpZGF0ZUFkZHJlc3NEaXJlY3RpdmUsXG4gICAgTWF0U2VhcmNoR29vZ2xlTWFwc0F1dG9jb21wbGV0ZUNvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICAvLyB7XG4gICAgLy8gICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAvLyAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1hdEdvb2dsZU1hcHNBdXRvY29tcGxldGVEaXJlY3RpdmUpLFxuICAgIC8vICAgbXVsdGk6IHRydWVcbiAgICAvLyB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTWF0R29vZ2xlTWFwc0F1dG9jb21wbGV0ZU1vZHVsZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBzdGF0aWMgZm9yUm9vdChcbiAgICBhcGlLZXk6IHN0cmluZyxcbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxNYXRHb29nbGVNYXBzQXV0b2NvbXBsZXRlTW9kdWxlPiB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE1hdEdvb2dsZU1hcHNBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6XG4gICAgICAgIFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBBcGlLZXlUb2tlbixcbiAgICAgICAgICAgIHVzZVZhbHVlOiBhcGlLZXlcbiAgICAgICAgICB9LFxuICAgICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19