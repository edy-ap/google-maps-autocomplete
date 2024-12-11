import { Component, EventEmitter, forwardRef, Inject, Input, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, UntypedFormControl, Validators } from '@angular/forms';
import { MatValidateAddressDirective } from '../directives/address-validator/mat-address-validator.directive';
import { ApiKeyToken } from "../tokens";
import * as i0 from "@angular/core";
import * as i1 from "../services/script-loader.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "@angular/material/input";
import * as i5 from "@angular/material/form-field";
import * as i6 from "../directives/address-validator/mat-address-validator.directive";
export var Appearance;
(function (Appearance) {
    Appearance["STANDARD"] = "standard";
    Appearance["FILL"] = "fill";
    Appearance["OUTLINE"] = "outline";
    Appearance["LEGACY"] = "legacy";
})(Appearance || (Appearance = {}));
export class MatGoogleMapsAutocompleteComponent {
    ngZone;
    apiKey;
    loaderService;
    autocomplete;
    searchElementRef;
    addressLabelText = 'Address';
    placeholderText = 'Please enter the address';
    requiredErrorText = 'The address is required';
    invalidErrorText = 'The address is not valid';
    appearance = Appearance.STANDARD;
    value;
    address;
    country;
    placeIdOnly;
    strictBounds;
    types;
    // types: string[] = ['address'];
    type;
    autoCompleteOptions = {};
    onChange = new EventEmitter();
    onAutocompleteSelected = new EventEmitter();
    onGermanAddressMapped = new EventEmitter();
    onLocationSelected = new EventEmitter();
    onNewPlaceResult = new EventEmitter();
    addressValidator = new MatValidateAddressDirective();
    addressSearchControl = new UntypedFormControl({ value: null }, Validators.compose([
        Validators.required,
        this.addressValidator.validate()
    ]));
    propagateChange = (_) => {
    };
    constructor(ngZone, apiKey, loaderService) {
        this.ngZone = ngZone;
        this.apiKey = apiKey;
        this.loaderService = loaderService;
    }
    ngOnInit() {
        this.addressValidator.subscribe(this.onNewPlaceResult);
        const options = {
            // types: ['address'],
            // componentRestrictions: {country: this.country},
            placeIdOnly: this.placeIdOnly,
            strictBounds: this.strictBounds,
            // types: this.types,
            type: this.type
        };
        // tslint:disable-next-line:no-unused-expression
        this.country ? options.componentRestrictions = { country: this.country } : null;
        // tslint:disable-next-line:no-unused-expression
        this.country ? options.types = this.types : null;
        this.autoCompleteOptions = Object.assign(this.autoCompleteOptions, options);
        this.initGoogleMapsAutocomplete();
    }
    ngOnDestroy() {
        if (this.autocomplete) {
            google.maps.event.clearInstanceListeners(this.autocomplete);
        }
    }
    initGoogleMapsAutocomplete() {
        this.loaderService
            .loadScript(`https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=places`)
            .then(() => {
            this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, this.autoCompleteOptions);
            this.autocomplete.addListener('place_changed', () => {
                this.ngZone.run(() => {
                    // get the place result
                    const place = this.autocomplete.getPlace();
                    const germanAddress = {
                        gmID: place.id,
                        icon: place.icon,
                        url: place.url,
                        placeID: place.place_id,
                        displayAddress: place.formatted_address,
                        name: place.name,
                        vicinity: place.vicinity,
                        locality: {},
                        state: {},
                        country: {},
                        geoLocation: { latitude: -1, longitude: -1 },
                    };
                    if (place.geometry && place.geometry.location) {
                        germanAddress.geoLocation.latitude = place.geometry.location.lat();
                        germanAddress.geoLocation.longitude = place.geometry.location.lng();
                    }
                    if (place.address_components) {
                        // console.log("place.address_components --> ", place.address_components);
                        place.address_components.forEach(value => {
                            if (value.types.indexOf('street_number') > -1) {
                                germanAddress.streetNumber = value.short_name;
                            }
                            if (value.types.indexOf('route') > -1) {
                                germanAddress.streetName = value.long_name;
                            }
                            if (value.types.indexOf('postal_code') > -1) {
                                germanAddress.postalCode = value.short_name;
                            }
                            if (value.types.indexOf('sublocality') > -1) {
                                germanAddress.sublocality = value.long_name;
                            }
                            if (value.types.indexOf('locality') > -1) {
                                germanAddress.locality.long = value.long_name;
                                germanAddress.locality.short = value.short_name;
                            }
                            if (value.types.indexOf('administrative_area_level_1') > -1) {
                                germanAddress.state.long = value.long_name;
                                germanAddress.state.short = value.short_name;
                            }
                            if (value.types.indexOf('country') > -1) {
                                germanAddress.country.long = value.long_name;
                                germanAddress.country.short = value.short_name;
                            }
                            if (value.types.indexOf('administrative_area_level_3') > -1) {
                                germanAddress.locality.short = value.short_name;
                            }
                        });
                    }
                    this.onGermanAddressMapped.emit(germanAddress);
                    if (!place.place_id || place.geometry === undefined || place.geometry === null) {
                        // place result is not valid
                        return;
                    }
                    else {
                        // show dialog to select a address from the input
                        // emit failed event
                        this.value = place;
                        this.propagateChange(this.value);
                    }
                    this.address = place.formatted_address;
                    this.onAutocompleteSelected.emit(place);
                    this.onLocationSelected.emit({
                        latitude: place.geometry.location.lat(),
                        longitude: place.geometry.location.lng()
                    });
                });
            });
        })
            .catch((err) => console.log(err));
    }
    onQuery(event) {
        this.onChange.emit(this.address);
    }
    resetAddress() {
        this.address = null;
        this.addressSearchControl.updateValueAndValidity();
    }
    writeValue(obj) {
        if (obj) {
            this.value = obj;
        }
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn) {
        throw new Error('Method not implemented.');
    }
    setDisabledState(isDisabled) {
        throw new Error('Method not implemented.');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: MatGoogleMapsAutocompleteComponent, deps: [{ token: i0.NgZone }, { token: ApiKeyToken }, { token: i1.ScriptLoaderService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.2", type: MatGoogleMapsAutocompleteComponent, selector: "mat-google-maps-autocomplete", inputs: { addressLabelText: "addressLabelText", placeholderText: "placeholderText", requiredErrorText: "requiredErrorText", invalidErrorText: "invalidErrorText", appearance: "appearance", value: "value", address: "address", country: "country", placeIdOnly: "placeIdOnly", strictBounds: "strictBounds", types: "types", type: "type", autoCompleteOptions: "autoCompleteOptions" }, outputs: { onChange: "onChange", onAutocompleteSelected: "onAutocompleteSelected", onGermanAddressMapped: "onGermanAddressMapped", onLocationSelected: "onLocationSelected" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => MatGoogleMapsAutocompleteComponent),
                multi: true
            }
        ], viewQueries: [{ propertyName: "searchElementRef", first: true, predicate: ["search"], descendants: true }], exportAs: ["matGoogleMapsAutocomplete"], ngImport: i0, template: "<mat-form-field class=\"full-width\" [appearance]=\"appearance\">\n  <mat-label>{{addressLabelText}}</mat-label>\n  <input matInput\n         [(ngModel)]=\"address\"\n         (change)=\"onQuery($event)\"\n         placeholder=\"{{placeholderText}}\"\n         class=\"form-control\"\n         #search\n         MatValidateAddress\n         required>\n  <mat-error *ngIf=\"addressSearchControl.hasError('required')\">\n    {{requiredErrorText}}\n  </mat-error>\n  <mat-error *ngIf=\"addressSearchControl.hasError('validateAddress')\">\n    {{invalidErrorText}}\n  </mat-error>\n</mat-form-field>\n", styles: [".full-width{width:100%}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i4.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "component", type: i5.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i5.MatLabel, selector: "mat-label" }, { kind: "directive", type: i5.MatError, selector: "mat-error, [matError]", inputs: ["id"] }, { kind: "directive", type: i6.MatValidateAddressDirective, selector: "[mat-address-validate][formControlName],[MatValidateAddress][formControl],[MatValidateAddress][ngModel]" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: MatGoogleMapsAutocompleteComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mat-google-maps-autocomplete', exportAs: 'matGoogleMapsAutocomplete', providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => MatGoogleMapsAutocompleteComponent),
                            multi: true
                        }
                    ], template: "<mat-form-field class=\"full-width\" [appearance]=\"appearance\">\n  <mat-label>{{addressLabelText}}</mat-label>\n  <input matInput\n         [(ngModel)]=\"address\"\n         (change)=\"onQuery($event)\"\n         placeholder=\"{{placeholderText}}\"\n         class=\"form-control\"\n         #search\n         MatValidateAddress\n         required>\n  <mat-error *ngIf=\"addressSearchControl.hasError('required')\">\n    {{requiredErrorText}}\n  </mat-error>\n  <mat-error *ngIf=\"addressSearchControl.hasError('validateAddress')\">\n    {{invalidErrorText}}\n  </mat-error>\n</mat-form-field>\n", styles: [".full-width{width:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [ApiKeyToken]
                }] }, { type: i1.ScriptLoaderService }]; }, propDecorators: { searchElementRef: [{
                type: ViewChild,
                args: ['search']
            }], addressLabelText: [{
                type: Input
            }], placeholderText: [{
                type: Input
            }], requiredErrorText: [{
                type: Input
            }], invalidErrorText: [{
                type: Input
            }], appearance: [{
                type: Input
            }], value: [{
                type: Input
            }], address: [{
                type: Input
            }], country: [{
                type: Input
            }], placeIdOnly: [{
                type: Input
            }], strictBounds: [{
                type: Input
            }], types: [{
                type: Input
            }], type: [{
                type: Input
            }], autoCompleteOptions: [{
                type: Input
            }], onChange: [{
                type: Output
            }], onAutocompleteSelected: [{
                type: Output
            }], onGermanAddressMapped: [{
                type: Output
            }], onLocationSelected: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LWdvb2dsZS1tYXBzLWF1dG9jb21wbGV0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLW1hdGVyaWFsLWV4dGVuc2lvbnMvZ29vZ2xlLW1hcHMtYXV0b2NvbXBsZXRlL3NyYy9saWIvY29tcG9uZW50L21hdC1nb29nbGUtbWFwcy1hdXRvY29tcGxldGUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1tYXRlcmlhbC1leHRlbnNpb25zL2dvb2dsZS1tYXBzLWF1dG9jb21wbGV0ZS9zcmMvbGliL2NvbXBvbmVudC9tYXQtZ29vZ2xlLW1hcHMtYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUlMLE1BQU0sRUFDTixTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF1QixpQkFBaUIsRUFBRSxrQkFBa0IsRUFBRSxVQUFVLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RyxPQUFPLEVBQUMsMkJBQTJCLEVBQUMsTUFBTSxpRUFBaUUsQ0FBQztBQUk1RyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sV0FBVyxDQUFDOzs7Ozs7OztBQUl0QyxNQUFNLENBQU4sSUFBWSxVQUtYO0FBTEQsV0FBWSxVQUFVO0lBQ3BCLG1DQUFxQixDQUFBO0lBQ3JCLDJCQUFhLENBQUE7SUFDYixpQ0FBbUIsQ0FBQTtJQUNuQiwrQkFBaUIsQ0FBQTtBQUNuQixDQUFDLEVBTFcsVUFBVSxLQUFWLFVBQVUsUUFLckI7QUFlRCxNQUFNLE9BQU8sa0NBQWtDO0lBdUV6QjtJQUVEO0lBQ0M7SUF4RXBCLFlBQVksQ0FBOEM7SUFHbkQsZ0JBQWdCLENBQWE7SUFHcEMsZ0JBQWdCLEdB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bEJBaUJBOzsyRkR5QmEsa0NBQWtDO2tCQWI5QyxTQUFTOytCQUNFLDhCQUE4QixZQUM5QiwyQkFBMkIsYUFHMUI7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsbUNBQW1DLENBQUM7NEJBQ2pFLEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGOzswQkEwRVksTUFBTTsyQkFBQyxXQUFXOzhFQW5FeEIsZ0JBQWdCO3NCQUR0QixTQUFTO3VCQUFDLFFBQVE7Z0JBSW5CLGdCQUFnQjtzQkFEZixLQUFLO2dCQUlOLGVBQWU7c0JBRGQsS0FBSztnQkFJTixpQkFBaUI7c0JBRGhCLEtBQUs7Z0JBSU4sZ0JBQWdCO3NCQURmLEtBQUs7Z0JBSU4sVUFBVTtzQkFEVCxLQUFLO2dCQUlOLEtBQUs7c0JBREosS0FBSztnQkFJTixPQUFPO3NCQUROLEtBQUs7Z0JBSU4sT0FBTztzQkFETixLQUFLO2dCQUlOLFdBQVc7c0JBRFYsS0FBSztnQkFJTixZQUFZO3NCQURYLEtBQUs7Z0JBSU4sS0FBSztzQkFESixLQUFLO2dCQUtOLElBQUk7c0JBREgsS0FBSztnQkFJTixtQkFBbUI7c0JBRGxCLEtBQUs7Z0JBSU4sUUFBUTtzQkFEUCxNQUFNO2dCQUlQLHNCQUFzQjtzQkFEckIsTUFBTTtnQkFJUCxxQkFBcUI7c0JBRHBCLE1BQU07Z0JBSVAsa0JBQWtCO3NCQURqQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IsIFVudHlwZWRGb3JtQ29udHJvbCwgVmFsaWRhdG9yc30gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtNYXRWYWxpZGF0ZUFkZHJlc3NEaXJlY3RpdmV9IGZyb20gJy4uL2RpcmVjdGl2ZXMvYWRkcmVzcy12YWxpZGF0b3IvbWF0LWFkZHJlc3MtdmFsaWRhdG9yLmRpcmVjdGl2ZSc7XG5pbXBvcnQge0xvY2F0aW9ufSBmcm9tICcuLi9pbnRlcmZhY2VzL2xvY2F0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQge0dlcm1hbkFkZHJlc3N9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHtTY3JpcHRMb2FkZXJTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvc2NyaXB0LWxvYWRlci5zZXJ2aWNlXCI7XG5pbXBvcnQge0FwaUtleVRva2VufSBmcm9tIFwiLi4vdG9rZW5zXCI7XG5pbXBvcnQgUGxhY2VSZXN1bHQgPSBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VSZXN1bHQ7XG5pbXBvcnQgQXV0b2NvbXBsZXRlT3B0aW9ucyA9IGdvb2dsZS5tYXBzLnBsYWNlcy5BdXRvY29tcGxldGVPcHRpb25zO1xuXG5leHBvcnQgZW51bSBBcHBlYXJhbmNlIHtcbiAgU1RBTkRBUkQgPSAnc3RhbmRhcmQnLFxuICBGSUxMID0gJ2ZpbGwnLFxuICBPVVRMSU5FID0gJ291dGxpbmUnLFxuICBMRUdBQ1kgPSAnbGVnYWN5Jyxcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWdvb2dsZS1tYXBzLWF1dG9jb21wbGV0ZScsXG4gIGV4cG9ydEFzOiAnbWF0R29vZ2xlTWFwc0F1dG9jb21wbGV0ZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9tYXQtZ29vZ2xlLW1hcHMtYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWF0LWdvb2dsZS1tYXBzLWF1dG9jb21wbGV0ZS5jb21wb25lbnQuc2NzcyddLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1hdEdvb2dsZU1hcHNBdXRvY29tcGxldGVDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTWF0R29vZ2xlTWFwc0F1dG9jb21wbGV0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgYXV0b2NvbXBsZXRlOiBnb29nbGUubWFwcy5wbGFjZXMuQXV0b2NvbXBsZXRlIHwgdW5kZWZpbmVkO1xuXG4gIEBWaWV3Q2hpbGQoJ3NlYXJjaCcpXG4gIHB1YmxpYyBzZWFyY2hFbGVtZW50UmVmOiBFbGVtZW50UmVmO1xuXG4gIEBJbnB1dCgpXG4gIGFkZHJlc3NMYWJlbFRleHQgPSAnQWRkcmVzcyc7XG5cbiAgQElucHV0KClcbiAgcGxhY2Vob2xkZXJUZXh0ID0gJ1BsZWFzZSBlbnRlciB0aGUgYWRkcmVzcyc7XG5cbiAgQElucHV0KClcbiAgcmVxdWlyZWRFcnJvclRleHQgPSAnVGhlIGFkZHJlc3MgaXMgcmVxdWlyZWQnO1xuXG4gIEBJbnB1dCgpXG4gIGludmFsaWRFcnJvclRleHQgPSAnVGhlIGFkZHJlc3MgaXMgbm90IHZhbGlkJztcblxuICBASW5wdXQoKVxuICBhcHBlYXJhbmNlOiBzdHJpbmcgfCBBcHBlYXJhbmNlID0gQXBwZWFyYW5jZS5TVEFOREFSRDtcblxuICBASW5wdXQoKVxuICB2YWx1ZTogUGxhY2VSZXN1bHQ7XG5cbiAgQElucHV0KClcbiAgYWRkcmVzczogUGxhY2VSZXN1bHQgfCBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgY291bnRyeTogc3RyaW5nIHwgc3RyaW5nW107XG5cbiAgQElucHV0KClcbiAgcGxhY2VJZE9ubHk/OiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIHN0cmljdEJvdW5kcz86IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgdHlwZXM/OiBzdHJpbmdbXTtcbiAgLy8gdHlwZXM6IHN0cmluZ1tdID0gWydhZGRyZXNzJ107XG5cbiAgQElucHV0KClcbiAgdHlwZT86IHN0cmluZztcblxuICBASW5wdXQoKVxuICBhdXRvQ29tcGxldGVPcHRpb25zOiBBdXRvY29tcGxldGVPcHRpb25zID0ge307XG5cbiAgQE91dHB1dCgpXG4gIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8UGxhY2VSZXN1bHQgfCBzdHJpbmcgfCBudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXI8UGxhY2VSZXN1bHQgfCBzdHJpbmcgfCBudWxsPigpO1xuXG4gIEBPdXRwdXQoKVxuICBvbkF1dG9jb21wbGV0ZVNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8UGxhY2VSZXN1bHQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQbGFjZVJlc3VsdD4oKTtcblxuICBAT3V0cHV0KClcbiAgb25HZXJtYW5BZGRyZXNzTWFwcGVkOiBFdmVudEVtaXR0ZXI8R2VybWFuQWRkcmVzcz4gPSBuZXcgRXZlbnRFbWl0dGVyPEdlcm1hbkFkZHJlc3M+KCk7XG5cbiAgQE91dHB1dCgpXG4gIG9uTG9jYXRpb25TZWxlY3RlZDogRXZlbnRFbWl0dGVyPExvY2F0aW9uPiA9IG5ldyBFdmVudEVtaXR0ZXI8TG9jYXRpb24+KCk7XG5cblxuICBwcml2YXRlIG9uTmV3UGxhY2VSZXN1bHQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwcml2YXRlIGFkZHJlc3NWYWxpZGF0b3I6IE1hdFZhbGlkYXRlQWRkcmVzc0RpcmVjdGl2ZSA9IG5ldyBNYXRWYWxpZGF0ZUFkZHJlc3NEaXJlY3RpdmUoKTtcblxuICBwdWJsaWMgYWRkcmVzc1NlYXJjaENvbnRyb2w6IFVudHlwZWRGb3JtQ29udHJvbCA9IG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woe3ZhbHVlOiBudWxsfSwgVmFsaWRhdG9ycy5jb21wb3NlKFtcbiAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgIHRoaXMuYWRkcmVzc1ZhbGlkYXRvci52YWxpZGF0ZSgpXSlcbiAgKTtcblxuICBwcm9wYWdhdGVDaGFuZ2UgPSAoXzogYW55KSA9PiB7XG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgQEluamVjdChBcGlLZXlUb2tlbilcbiAgICAgICAgICAgICAgcHVibGljIGFwaUtleTogc3RyaW5nLFxuICAgICAgICAgICAgICBwcml2YXRlIGxvYWRlclNlcnZpY2U6IFNjcmlwdExvYWRlclNlcnZpY2UsKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmFkZHJlc3NWYWxpZGF0b3Iuc3Vic2NyaWJlKHRoaXMub25OZXdQbGFjZVJlc3VsdCk7XG5cbiAgICBjb25zdCBvcHRpb25zOiBBdXRvY29tcGxldGVPcHRpb25zID0ge1xuICAgICAgLy8gdHlwZXM6IFsnYWRkcmVzcyddLFxuICAgICAgLy8gY29tcG9uZW50UmVzdHJpY3Rpb25zOiB7Y291bnRyeTogdGhpcy5jb3VudHJ5fSxcbiAgICAgIHBsYWNlSWRPbmx5OiB0aGlzLnBsYWNlSWRPbmx5LFxuICAgICAgc3RyaWN0Qm91bmRzOiB0aGlzLnN0cmljdEJvdW5kcyxcbiAgICAgIC8vIHR5cGVzOiB0aGlzLnR5cGVzLFxuICAgICAgdHlwZTogdGhpcy50eXBlXG4gICAgfTtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bnVzZWQtZXhwcmVzc2lvblxuICAgIHRoaXMuY291bnRyeSA/IG9wdGlvbnMuY29tcG9uZW50UmVzdHJpY3Rpb25zID0ge2NvdW50cnk6IHRoaXMuY291bnRyeX0gOiBudWxsO1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bnVzZWQtZXhwcmVzc2lvblxuICAgIHRoaXMuY291bnRyeSA/IG9wdGlvbnMudHlwZXMgPSB0aGlzLnR5cGVzIDogbnVsbDtcblxuICAgIHRoaXMuYXV0b0NvbXBsZXRlT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24odGhpcy5hdXRvQ29tcGxldGVPcHRpb25zLCBvcHRpb25zKTtcbiAgICB0aGlzLmluaXRHb29nbGVNYXBzQXV0b2NvbXBsZXRlKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hdXRvY29tcGxldGUpIHtcbiAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmNsZWFySW5zdGFuY2VMaXN0ZW5lcnModGhpcy5hdXRvY29tcGxldGUpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpbml0R29vZ2xlTWFwc0F1dG9jb21wbGV0ZSgpIHtcbiAgICB0aGlzLmxvYWRlclNlcnZpY2VcbiAgICAgIC5sb2FkU2NyaXB0KGBodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvanM/a2V5PSR7dGhpcy5hcGlLZXl9JmxpYnJhcmllcz1wbGFjZXNgKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZSA9IG5ldyBnb29nbGUubWFwcy5wbGFjZXMuQXV0b2NvbXBsZXRlKHRoaXMuc2VhcmNoRWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLmF1dG9Db21wbGV0ZU9wdGlvbnMpO1xuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5hZGRMaXN0ZW5lcigncGxhY2VfY2hhbmdlZCcsICgpID0+IHtcbiAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgLy8gZ2V0IHRoZSBwbGFjZSByZXN1bHRcbiAgICAgICAgICAgIGNvbnN0IHBsYWNlOiBQbGFjZVJlc3VsdCA9IHRoaXMuYXV0b2NvbXBsZXRlLmdldFBsYWNlKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGdlcm1hbkFkZHJlc3M6IEdlcm1hbkFkZHJlc3MgPSB7XG4gICAgICAgICAgICAgIGdtSUQ6IHBsYWNlLmlkLFxuICAgICAgICAgICAgICBpY29uOiBwbGFjZS5pY29uLFxuICAgICAgICAgICAgICB1cmw6IHBsYWNlLnVybCxcbiAgICAgICAgICAgICAgcGxhY2VJRDogcGxhY2UucGxhY2VfaWQsXG4gICAgICAgICAgICAgIGRpc3BsYXlBZGRyZXNzOiBwbGFjZS5mb3JtYXR0ZWRfYWRkcmVzcyxcbiAgICAgICAgICAgICAgbmFtZTogcGxhY2UubmFtZSxcbiAgICAgICAgICAgICAgdmljaW5pdHk6IHBsYWNlLnZpY2luaXR5LFxuICAgICAgICAgICAgICBsb2NhbGl0eToge30sXG4gICAgICAgICAgICAgIHN0YXRlOiB7fSxcbiAgICAgICAgICAgICAgY291bnRyeToge30sXG4gICAgICAgICAgICAgIGdlb0xvY2F0aW9uOiB7bGF0aXR1ZGU6IC0xLCBsb25naXR1ZGU6IC0xfSxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChwbGFjZS5nZW9tZXRyeSAmJiBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbikge1xuICAgICAgICAgICAgICBnZXJtYW5BZGRyZXNzLmdlb0xvY2F0aW9uLmxhdGl0dWRlID0gcGxhY2UuZ2VvbWV0cnkubG9jYXRpb24ubGF0KCk7XG4gICAgICAgICAgICAgIGdlcm1hbkFkZHJlc3MuZ2VvTG9jYXRpb24ubG9uZ2l0dWRlID0gcGxhY2UuZ2VvbWV0cnkubG9jYXRpb24ubG5nKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHMpIHtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHMgLS0+IFwiLCBwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHMpO1xuICAgICAgICAgICAgICBwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHMuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLnR5cGVzLmluZGV4T2YoJ3N0cmVldF9udW1iZXInKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICBnZXJtYW5BZGRyZXNzLnN0cmVldE51bWJlciA9IHZhbHVlLnNob3J0X25hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS50eXBlcy5pbmRleE9mKCdyb3V0ZScpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgIGdlcm1hbkFkZHJlc3Muc3RyZWV0TmFtZSA9IHZhbHVlLmxvbmdfbmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLnR5cGVzLmluZGV4T2YoJ3Bvc3RhbF9jb2RlJykgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgZ2VybWFuQWRkcmVzcy5wb3N0YWxDb2RlID0gdmFsdWUuc2hvcnRfbmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLnR5cGVzLmluZGV4T2YoJ3N1YmxvY2FsaXR5JykgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgZ2VybWFuQWRkcmVzcy5zdWJsb2NhbGl0eSA9IHZhbHVlLmxvbmdfbmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLnR5cGVzLmluZGV4T2YoJ2xvY2FsaXR5JykgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgZ2VybWFuQWRkcmVzcy5sb2NhbGl0eS5sb25nID0gdmFsdWUubG9uZ19uYW1lO1xuICAgICAgICAgICAgICAgICAgZ2VybWFuQWRkcmVzcy5sb2NhbGl0eS5zaG9ydCA9IHZhbHVlLnNob3J0X25hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS50eXBlcy5pbmRleE9mKCdhZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzEnKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICBnZXJtYW5BZGRyZXNzLnN0YXRlLmxvbmcgPSB2YWx1ZS5sb25nX25hbWU7XG4gICAgICAgICAgICAgICAgICBnZXJtYW5BZGRyZXNzLnN0YXRlLnNob3J0ID0gdmFsdWUuc2hvcnRfbmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLnR5cGVzLmluZGV4T2YoJ2NvdW50cnknKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICBnZXJtYW5BZGRyZXNzLmNvdW50cnkubG9uZyA9IHZhbHVlLmxvbmdfbmFtZTtcbiAgICAgICAgICAgICAgICAgIGdlcm1hbkFkZHJlc3MuY291bnRyeS5zaG9ydCA9IHZhbHVlLnNob3J0X25hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS50eXBlcy5pbmRleE9mKCdhZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzMnKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICBnZXJtYW5BZGRyZXNzLmxvY2FsaXR5LnNob3J0ID0gdmFsdWUuc2hvcnRfbmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9uR2VybWFuQWRkcmVzc01hcHBlZC5lbWl0KGdlcm1hbkFkZHJlc3MpO1xuXG4gICAgICAgICAgICBpZiAoIXBsYWNlLnBsYWNlX2lkIHx8IHBsYWNlLmdlb21ldHJ5ID09PSB1bmRlZmluZWQgfHwgcGxhY2UuZ2VvbWV0cnkgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgLy8gcGxhY2UgcmVzdWx0IGlzIG5vdCB2YWxpZFxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBzaG93IGRpYWxvZyB0byBzZWxlY3QgYSBhZGRyZXNzIGZyb20gdGhlIGlucHV0XG4gICAgICAgICAgICAgIC8vIGVtaXQgZmFpbGVkIGV2ZW50XG4gICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBwbGFjZTtcbiAgICAgICAgICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UodGhpcy52YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYWRkcmVzcyA9IHBsYWNlLmZvcm1hdHRlZF9hZGRyZXNzO1xuICAgICAgICAgICAgdGhpcy5vbkF1dG9jb21wbGV0ZVNlbGVjdGVkLmVtaXQocGxhY2UpO1xuICAgICAgICAgICAgdGhpcy5vbkxvY2F0aW9uU2VsZWN0ZWQuZW1pdChcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhdGl0dWRlOiBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbi5sYXQoKSxcbiAgICAgICAgICAgICAgICBsb25naXR1ZGU6IHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uLmxuZygpXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coZXJyKSk7XG4gIH1cblxuICBwdWJsaWMgb25RdWVyeShldmVudDogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZS5lbWl0KHRoaXMuYWRkcmVzcyk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0QWRkcmVzcygpIHtcbiAgICB0aGlzLmFkZHJlc3MgPSBudWxsO1xuICAgIHRoaXMuYWRkcmVzc1NlYXJjaENvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZShvYmo6IGFueSk6IHZvaWQge1xuICAgIGlmIChvYmopIHtcbiAgICAgIHRoaXMudmFsdWUgPSBvYmo7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01ldGhvZCBub3QgaW1wbGVtZW50ZWQuJyk7XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlPyhpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNZXRob2Qgbm90IGltcGxlbWVudGVkLicpO1xuICB9XG5cbn1cbiIsIjxtYXQtZm9ybS1maWVsZCBjbGFzcz1cImZ1bGwtd2lkdGhcIiBbYXBwZWFyYW5jZV09XCJhcHBlYXJhbmNlXCI+XG4gIDxtYXQtbGFiZWw+e3thZGRyZXNzTGFiZWxUZXh0fX08L21hdC1sYWJlbD5cbiAgPGlucHV0IG1hdElucHV0XG4gICAgICAgICBbKG5nTW9kZWwpXT1cImFkZHJlc3NcIlxuICAgICAgICAgKGNoYW5nZSk9XCJvblF1ZXJ5KCRldmVudClcIlxuICAgICAgICAgcGxhY2Vob2xkZXI9XCJ7e3BsYWNlaG9sZGVyVGV4dH19XCJcbiAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICNzZWFyY2hcbiAgICAgICAgIE1hdFZhbGlkYXRlQWRkcmVzc1xuICAgICAgICAgcmVxdWlyZWQ+XG4gIDxtYXQtZXJyb3IgKm5nSWY9XCJhZGRyZXNzU2VhcmNoQ29udHJvbC5oYXNFcnJvcigncmVxdWlyZWQnKVwiPlxuICAgIHt7cmVxdWlyZWRFcnJvclRleHR9fVxuICA8L21hdC1lcnJvcj5cbiAgPG1hdC1lcnJvciAqbmdJZj1cImFkZHJlc3NTZWFyY2hDb250cm9sLmhhc0Vycm9yKCd2YWxpZGF0ZUFkZHJlc3MnKVwiPlxuICAgIHt7aW52YWxpZEVycm9yVGV4dH19XG4gIDwvbWF0LWVycm9yPlxuPC9tYXQtZm9ybS1maWVsZD5cbiJdfQ==