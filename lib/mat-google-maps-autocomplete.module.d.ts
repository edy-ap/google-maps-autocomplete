import { ModuleWithProviders } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./component/mat-google-maps-autocomplete.component";
import * as i2 from "./directives/mat-google-maps-autocomplete.directive";
import * as i3 from "./directives/address-validator/mat-address-validator.directive";
import * as i4 from "./component/mat-search-google-maps-autocomplete/mat-search-google-maps-autocomplete.component";
import * as i5 from "@angular/common";
import * as i6 from "@angular/forms";
import * as i7 from "@angular/flex-layout";
import * as i8 from "@angular/material/input";
import * as i9 from "@angular/material/icon";
export declare class MatGoogleMapsAutocompleteModule {
    constructor();
    static forRoot(apiKey: string): ModuleWithProviders<MatGoogleMapsAutocompleteModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatGoogleMapsAutocompleteModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatGoogleMapsAutocompleteModule, [typeof i1.MatGoogleMapsAutocompleteComponent, typeof i2.MatGoogleMapsAutocompleteDirective, typeof i3.MatValidateAddressDirective, typeof i4.MatSearchGoogleMapsAutocompleteComponent], [typeof i5.CommonModule, typeof i6.FormsModule, typeof i6.ReactiveFormsModule, typeof i7.FlexLayoutModule, typeof i8.MatInputModule, typeof i9.MatIconModule], [typeof i1.MatGoogleMapsAutocompleteComponent, typeof i2.MatGoogleMapsAutocompleteDirective, typeof i3.MatValidateAddressDirective, typeof i4.MatSearchGoogleMapsAutocompleteComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatGoogleMapsAutocompleteModule>;
}
