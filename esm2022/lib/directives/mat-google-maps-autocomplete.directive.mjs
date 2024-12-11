import { Directive, EventEmitter, forwardRef, HostListener, Inject, Input, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { NG_VALIDATORS, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { ApiKeyToken } from "../tokens";
import * as i0 from "@angular/core";
import * as i1 from "../services/script-loader.service";
export class MatGoogleMapsAutocompleteDirective {
    platformId;
    apiKey;
    elemRef;
    cf;
    loaderService;
    ngZone;
    inputField;
    autocomplete;
    address;
    country;
    placeIdOnly;
    strictBounds;
    types;
    type;
    autoCompleteOptions = {};
    onChange = new EventEmitter();
    onAutocompleteSelected = new EventEmitter();
    onGermanAddressMapped = new EventEmitter();
    onLocationSelected = new EventEmitter();
    disabled;
    _value;
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
        this.propagateChange(this.value);
        this.cf.markForCheck();
    }
    onNewPlaceResult = new EventEmitter();
    propagateChange = (_) => {
    };
    constructor(platformId, apiKey, elemRef, cf, loaderService, ngZone) {
        this.platformId = platformId;
        this.apiKey = apiKey;
        this.elemRef = elemRef;
        this.cf = cf;
        this.loaderService = loaderService;
        this.ngZone = ngZone;
    }
    ngOnDestroy() {
        if (this.autocomplete) {
            google.maps.event.clearInstanceListeners(this.autocomplete);
        }
    }
    ngAfterViewInit() {
        this.loadMap();
    }
    ngOnInit() {
    }
    validate(fc) {
        return fc.hasValidator(Validators.required) ? !!fc?.value : true;
    }
    onChangeInputValue() {
        const value = this.elemRef.nativeElement?.value;
        this.value = value;
    }
    initGoogleMapsAutocomplete() {
        const autocomplete = new google.maps.places.Autocomplete(this.elemRef.nativeElement, this.autoCompleteOptions);
        autocomplete.addListener('place_changed', () => {
            this.ngZone.run(() => {
                // get the place result
                const place = autocomplete.getPlace();
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
                this.onGermanAddressMapped.emit(germanAddress);
                this.value = place.formatted_address;
                this.address = place.formatted_address;
                this.onAutocompleteSelected.emit(place);
                this.onLocationSelected.emit({
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng()
                });
            });
        });
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn) {
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    writeValue(obj) {
        if (obj) {
            this.value = obj;
        }
    }
    loadMap() {
        this.loaderService.loadScript(`https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=places`)
            .then(() => {
            this.initMap();
        })
            .catch(error => console.error('Google Maps loading failed: ', error));
    }
    initMap() {
        if (isPlatformBrowser(this.platformId)) {
            console.log("on after view init --> ", this.elemRef.nativeElement);
            this.autocomplete = new google.maps.places.Autocomplete(this.elemRef.nativeElement);
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
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: MatGoogleMapsAutocompleteDirective, deps: [{ token: PLATFORM_ID }, { token: ApiKeyToken }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1.ScriptLoaderService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.2", type: MatGoogleMapsAutocompleteDirective, selector: "[matGoogleMapsAutocomplete]", inputs: { address: "address", country: "country", placeIdOnly: "placeIdOnly", strictBounds: "strictBounds", types: "types", type: "type", autoCompleteOptions: "autoCompleteOptions", value: "value" }, outputs: { onChange: "onChange", onAutocompleteSelected: "onAutocompleteSelected", onGermanAddressMapped: "onGermanAddressMapped", onLocationSelected: "onLocationSelected" }, host: { listeners: { "change": "onChangeInputValue()" } }, providers: [
            {
                provide: NG_VALIDATORS,
                useExisting: forwardRef(() => MatGoogleMapsAutocompleteDirective),
                multi: true
            }
        ], viewQueries: [{ propertyName: "inputField", first: true, predicate: ["inputField"], descendants: true }], exportAs: ["matGoogleMapsAutocomplete"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: MatGoogleMapsAutocompleteDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matGoogleMapsAutocomplete]',
                    exportAs: 'matGoogleMapsAutocomplete',
                    providers: [
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef(() => MatGoogleMapsAutocompleteDirective),
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [ApiKeyToken]
                }] }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.ScriptLoaderService }, { type: i0.NgZone }]; }, propDecorators: { inputField: [{
                type: ViewChild,
                args: ['inputField']
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
            }], value: [{
                type: Input
            }], onChangeInputValue: [{
                type: HostListener,
                args: ['change']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LWdvb2dsZS1tYXBzLWF1dG9jb21wbGV0ZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLW1hdGVyaWFsLWV4dGVuc2lvbnMvZ29vZ2xlLW1hcHMtYXV0b2NvbXBsZXRlL3NyYy9saWIvZGlyZWN0aXZlcy9tYXQtZ29vZ2xlLW1hcHMtYXV0b2NvbXBsZXRlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0wsU0FBUyxFQUVULFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBSUwsTUFBTSxFQUNOLFdBQVcsRUFDWCxTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFvQyxhQUFhLEVBQUUsVUFBVSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFNUYsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFbEQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLFdBQVcsQ0FBQzs7O0FBZXRDLE1BQU0sT0FBTyxrQ0FBa0M7SUE0REw7SUFFckI7SUFDQTtJQUNDO0lBQ0E7SUFDQTtJQS9EcEIsVUFBVSxDQUFjO0lBRXhCLFlBQVksQ0FBOEM7SUFHMUQsT0FBTyxDQUF1QjtJQUc5QixPQUFPLENBQW9CO0lBRzNCLFdBQVcsQ0FBVztJQUd0QixZQUFZLENBQVc7SUFHdkIsS0FBSyxDQUFZO0lBR2pCLElBQUksQ0FBVTtJQUdkLG1CQUFtQixHQUF3QixFQUFFLENBQUM7SUFHOUMsUUFBUSxHQUE4QyxJQUFJLFlBQVksRUFBK0IsQ0FBQztJQUd0RyxzQkFBc0IsR0FBOEIsSUFBSSxZQUFZLEVBQWUsQ0FBQztJQUdwRixxQkFBcUIsR0FBZ0MsSUFBSSxZQUFZLEVBQWlCLENBQUM7SUFHdkYsa0JBQWtCLEdBQTJCLElBQUksWUFBWSxFQUFZLENBQUM7SUFFMUUsUUFB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OzJCQUFDLFdBQVc7NEpBMUQvQixVQUFVO3NCQURULFNBQVM7dUJBQUMsWUFBWTtnQkFNdkIsT0FBTztzQkFETixLQUFLO2dCQUlOLE9BQU87c0JBRE4sS0FBSztnQkFJTixXQUFXO3NCQURWLEtBQUs7Z0JBSU4sWUFBWTtzQkFEWCxLQUFLO2dCQUlOLEtBQUs7c0JBREosS0FBSztnQkFJTixJQUFJO3NCQURILEtBQUs7Z0JBSU4sbUJBQW1CO3NCQURsQixLQUFLO2dCQUlOLFFBQVE7c0JBRFAsTUFBTTtnQkFJUCxzQkFBc0I7c0JBRHJCLE1BQU07Z0JBSVAscUJBQXFCO3NCQURwQixNQUFNO2dCQUlQLGtCQUFrQjtzQkFEakIsTUFBTTtnQkFZSCxLQUFLO3NCQURSLEtBQUs7Z0JBdUNOLGtCQUFrQjtzQkFEakIsWUFBWTt1QkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUExBVEZPUk1fSUQsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIEZvcm1Db250cm9sLCBOR19WQUxJREFUT1JTLCBWYWxpZGF0b3JzfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0dlcm1hbkFkZHJlc3MsIExvY2F0aW9ufSBmcm9tICcuLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7aXNQbGF0Zm9ybUJyb3dzZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1NjcmlwdExvYWRlclNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9zY3JpcHQtbG9hZGVyLnNlcnZpY2VcIjtcbmltcG9ydCB7QXBpS2V5VG9rZW59IGZyb20gXCIuLi90b2tlbnNcIjtcbmltcG9ydCBQbGFjZVJlc3VsdCA9IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZVJlc3VsdDtcbmltcG9ydCBBdXRvY29tcGxldGVPcHRpb25zID0gZ29vZ2xlLm1hcHMucGxhY2VzLkF1dG9jb21wbGV0ZU9wdGlvbnM7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRHb29nbGVNYXBzQXV0b2NvbXBsZXRlXScsXG4gIGV4cG9ydEFzOiAnbWF0R29vZ2xlTWFwc0F1dG9jb21wbGV0ZScsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNYXRHb29nbGVNYXBzQXV0b2NvbXBsZXRlRGlyZWN0aXZlKSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE1hdEdvb2dsZU1hcHNBdXRvY29tcGxldGVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIEBWaWV3Q2hpbGQoJ2lucHV0RmllbGQnKVxuICBpbnB1dEZpZWxkITogRWxlbWVudFJlZjtcblxuICBhdXRvY29tcGxldGU6IGdvb2dsZS5tYXBzLnBsYWNlcy5BdXRvY29tcGxldGUgfCB1bmRlZmluZWQ7XG5cbiAgQElucHV0KClcbiAgYWRkcmVzczogUGxhY2VSZXN1bHQgfCBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgY291bnRyeTogc3RyaW5nIHwgc3RyaW5nW107XG5cbiAgQElucHV0KClcbiAgcGxhY2VJZE9ubHk/OiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIHN0cmljdEJvdW5kcz86IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgdHlwZXM/OiBzdHJpbmdbXTtcblxuICBASW5wdXQoKVxuICB0eXBlPzogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGF1dG9Db21wbGV0ZU9wdGlvbnM6IEF1dG9jb21wbGV0ZU9wdGlvbnMgPSB7fTtcblxuICBAT3V0cHV0KClcbiAgb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxQbGFjZVJlc3VsdCB8IHN0cmluZyB8IG51bGw+ID0gbmV3IEV2ZW50RW1pdHRlcjxQbGFjZVJlc3VsdCB8IHN0cmluZyB8IG51bGw+KCk7XG5cbiAgQE91dHB1dCgpXG4gIG9uQXV0b2NvbXBsZXRlU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxQbGFjZVJlc3VsdD4gPSBuZXcgRXZlbnRFbWl0dGVyPFBsYWNlUmVzdWx0PigpO1xuXG4gIEBPdXRwdXQoKVxuICBvbkdlcm1hbkFkZHJlc3NNYXBwZWQ6IEV2ZW50RW1pdHRlcjxHZXJtYW5BZGRyZXNzPiA9IG5ldyBFdmVudEVtaXR0ZXI8R2VybWFuQWRkcmVzcz4oKTtcblxuICBAT3V0cHV0KClcbiAgb25Mb2NhdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8TG9jYXRpb24+ID0gbmV3IEV2ZW50RW1pdHRlcjxMb2NhdGlvbj4oKTtcblxuICBkaXNhYmxlZDogYm9vbGVhblxuXG4gIF92YWx1ZTogc3RyaW5nO1xuXG4gIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICB0aGlzLmNmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBvbk5ld1BsYWNlUmVzdWx0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcm9wYWdhdGVDaGFuZ2UgPSAoXzogYW55KSA9PiB7XG4gIH07XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChQTEFURk9STV9JRCkgcHVibGljIHBsYXRmb3JtSWQ6IHN0cmluZyxcbiAgICAgICAgICAgICAgQEluamVjdChBcGlLZXlUb2tlbilcbiAgICAgICAgICAgICAgcHVibGljIGFwaUtleTogc3RyaW5nLFxuICAgICAgICAgICAgICBwdWJsaWMgZWxlbVJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgbG9hZGVyU2VydmljZTogU2NyaXB0TG9hZGVyU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSkge1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYXV0b2NvbXBsZXRlKSB7XG4gICAgICBnb29nbGUubWFwcy5ldmVudC5jbGVhckluc3RhbmNlTGlzdGVuZXJzKHRoaXMuYXV0b2NvbXBsZXRlKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5sb2FkTWFwKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgfVxuXG4gIHZhbGlkYXRlKGZjOiBGb3JtQ29udHJvbCkge1xuICAgIHJldHVybiBmYy5oYXNWYWxpZGF0b3IoVmFsaWRhdG9ycy5yZXF1aXJlZCkgPyAhIWZjPy52YWx1ZSA6IHRydWU7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjaGFuZ2UnKVxuICBvbkNoYW5nZUlucHV0VmFsdWUoKTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWUgPSAodGhpcy5lbGVtUmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTElucHV0RWxlbWVudCk/LnZhbHVlO1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBpbml0R29vZ2xlTWFwc0F1dG9jb21wbGV0ZSgpIHtcbiAgICBjb25zdCBhdXRvY29tcGxldGUgPSBuZXcgZ29vZ2xlLm1hcHMucGxhY2VzLkF1dG9jb21wbGV0ZSh0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudCwgdGhpcy5hdXRvQ29tcGxldGVPcHRpb25zKTtcbiAgICBhdXRvY29tcGxldGUuYWRkTGlzdGVuZXIoJ3BsYWNlX2NoYW5nZWQnLCAoKSA9PiB7XG4gICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAvLyBnZXQgdGhlIHBsYWNlIHJlc3VsdFxuICAgICAgICBjb25zdCBwbGFjZTogUGxhY2VSZXN1bHQgPSBhdXRvY29tcGxldGUuZ2V0UGxhY2UoKTtcblxuICAgICAgICBjb25zdCBnZXJtYW5BZGRyZXNzOiBHZXJtYW5BZGRyZXNzID0ge1xuICAgICAgICAgIGdtSUQ6IHBsYWNlLmlkLFxuICAgICAgICAgIGljb246IHBsYWNlLmljb24sXG4gICAgICAgICAgdXJsOiBwbGFjZS51cmwsXG4gICAgICAgICAgcGxhY2VJRDogcGxhY2UucGxhY2VfaWQsXG4gICAgICAgICAgZGlzcGxheUFkZHJlc3M6IHBsYWNlLmZvcm1hdHRlZF9hZGRyZXNzLFxuICAgICAgICAgIG5hbWU6IHBsYWNlLm5hbWUsXG4gICAgICAgICAgdmljaW5pdHk6IHBsYWNlLnZpY2luaXR5LFxuICAgICAgICAgIGxvY2FsaXR5OiB7fSxcbiAgICAgICAgICBzdGF0ZToge30sXG4gICAgICAgICAgY291bnRyeToge30sXG4gICAgICAgICAgZ2VvTG9jYXRpb246IHtsYXRpdHVkZTogLTEsIGxvbmdpdHVkZTogLTF9LFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChwbGFjZS5nZW9tZXRyeSAmJiBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbikge1xuICAgICAgICAgIGdlcm1hbkFkZHJlc3MuZ2VvTG9jYXRpb24ubGF0aXR1ZGUgPSBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbi5sYXQoKTtcbiAgICAgICAgICBnZXJtYW5BZGRyZXNzLmdlb0xvY2F0aW9uLmxvbmdpdHVkZSA9IHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uLmxuZygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHMgLS0+IFwiLCBwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHMpO1xuICAgICAgICBwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHMuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICAgICAgaWYgKHZhbHVlLnR5cGVzLmluZGV4T2YoJ3N0cmVldF9udW1iZXInKSA+IC0xKSB7XG4gICAgICAgICAgICBnZXJtYW5BZGRyZXNzLnN0cmVldE51bWJlciA9IHZhbHVlLnNob3J0X25hbWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh2YWx1ZS50eXBlcy5pbmRleE9mKCdyb3V0ZScpID4gLTEpIHtcbiAgICAgICAgICAgIGdlcm1hbkFkZHJlc3Muc3RyZWV0TmFtZSA9IHZhbHVlLmxvbmdfbmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHZhbHVlLnR5cGVzLmluZGV4T2YoJ3Bvc3RhbF9jb2RlJykgPiAtMSkge1xuICAgICAgICAgICAgZ2VybWFuQWRkcmVzcy5wb3N0YWxDb2RlID0gdmFsdWUuc2hvcnRfbmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHZhbHVlLnR5cGVzLmluZGV4T2YoJ3N1YmxvY2FsaXR5JykgPiAtMSkge1xuICAgICAgICAgICAgZ2VybWFuQWRkcmVzcy5zdWJsb2NhbGl0eSA9IHZhbHVlLmxvbmdfbmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHZhbHVlLnR5cGVzLmluZGV4T2YoJ2xvY2FsaXR5JykgPiAtMSkge1xuICAgICAgICAgICAgZ2VybWFuQWRkcmVzcy5sb2NhbGl0eS5sb25nID0gdmFsdWUubG9uZ19uYW1lO1xuICAgICAgICAgICAgZ2VybWFuQWRkcmVzcy5sb2NhbGl0eS5zaG9ydCA9IHZhbHVlLnNob3J0X25hbWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh2YWx1ZS50eXBlcy5pbmRleE9mKCdhZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzEnKSA+IC0xKSB7XG4gICAgICAgICAgICBnZXJtYW5BZGRyZXNzLnN0YXRlLmxvbmcgPSB2YWx1ZS5sb25nX25hbWU7XG4gICAgICAgICAgICBnZXJtYW5BZGRyZXNzLnN0YXRlLnNob3J0ID0gdmFsdWUuc2hvcnRfbmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHZhbHVlLnR5cGVzLmluZGV4T2YoJ2NvdW50cnknKSA+IC0xKSB7XG4gICAgICAgICAgICBnZXJtYW5BZGRyZXNzLmNvdW50cnkubG9uZyA9IHZhbHVlLmxvbmdfbmFtZTtcbiAgICAgICAgICAgIGdlcm1hbkFkZHJlc3MuY291bnRyeS5zaG9ydCA9IHZhbHVlLnNob3J0X25hbWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh2YWx1ZS50eXBlcy5pbmRleE9mKCdhZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzMnKSA+IC0xKSB7XG4gICAgICAgICAgICBnZXJtYW5BZGRyZXNzLmxvY2FsaXR5LnNob3J0ID0gdmFsdWUuc2hvcnRfbmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub25HZXJtYW5BZGRyZXNzTWFwcGVkLmVtaXQoZ2VybWFuQWRkcmVzcyk7XG5cbiAgICAgICAgdGhpcy52YWx1ZSA9IHBsYWNlLmZvcm1hdHRlZF9hZGRyZXNzO1xuICAgICAgICB0aGlzLmFkZHJlc3MgPSBwbGFjZS5mb3JtYXR0ZWRfYWRkcmVzcztcbiAgICAgICAgdGhpcy5vbkF1dG9jb21wbGV0ZVNlbGVjdGVkLmVtaXQocGxhY2UpO1xuICAgICAgICB0aGlzLm9uTG9jYXRpb25TZWxlY3RlZC5lbWl0KFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxhdGl0dWRlOiBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbi5sYXQoKSxcbiAgICAgICAgICAgIGxvbmdpdHVkZTogcGxhY2UuZ2VvbWV0cnkubG9jYXRpb24ubG5nKClcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICB9XG5cbiAgd3JpdGVWYWx1ZShvYmo6IGFueSk6IHZvaWQge1xuICAgIGlmIChvYmopIHtcbiAgICAgIHRoaXMudmFsdWUgPSBvYmo7XG4gICAgfVxuICB9XG5cbiAgbG9hZE1hcCgpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWRlclNlcnZpY2UubG9hZFNjcmlwdChgaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2pzP2tleT0ke3RoaXMuYXBpS2V5fSZsaWJyYXJpZXM9cGxhY2VzYClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5pbml0TWFwKCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoJ0dvb2dsZSBNYXBzIGxvYWRpbmcgZmFpbGVkOiAnLCBlcnJvcikpO1xuICB9XG5cbiAgaW5pdE1hcCgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuXG4gICAgICBjb25zb2xlLmxvZyhcIm9uIGFmdGVyIHZpZXcgaW5pdCAtLT4gXCIsIHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50KVxuXG4gICAgICB0aGlzLmF1dG9jb21wbGV0ZSA9IG5ldyBnb29nbGUubWFwcy5wbGFjZXMuQXV0b2NvbXBsZXRlKFxuICAgICAgICB0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudFxuICAgICAgKTtcblxuICAgICAgY29uc3Qgb3B0aW9uczogQXV0b2NvbXBsZXRlT3B0aW9ucyA9IHtcbiAgICAgICAgLy8gdHlwZXM6IFsnYWRkcmVzcyddLFxuICAgICAgICAvLyBjb21wb25lbnRSZXN0cmljdGlvbnM6IHtjb3VudHJ5OiB0aGlzLmNvdW50cnl9LFxuICAgICAgICBwbGFjZUlkT25seTogdGhpcy5wbGFjZUlkT25seSxcbiAgICAgICAgc3RyaWN0Qm91bmRzOiB0aGlzLnN0cmljdEJvdW5kcyxcbiAgICAgICAgLy8gdHlwZXM6IHRoaXMudHlwZXMsXG4gICAgICAgIHR5cGU6IHRoaXMudHlwZVxuICAgICAgfTtcblxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVudXNlZC1leHByZXNzaW9uXG4gICAgICB0aGlzLmNvdW50cnkgPyBvcHRpb25zLmNvbXBvbmVudFJlc3RyaWN0aW9ucyA9IHtjb3VudHJ5OiB0aGlzLmNvdW50cnl9IDogbnVsbDtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bnVzZWQtZXhwcmVzc2lvblxuICAgICAgdGhpcy5jb3VudHJ5ID8gb3B0aW9ucy50eXBlcyA9IHRoaXMudHlwZXMgOiBudWxsO1xuXG4gICAgICB0aGlzLmF1dG9Db21wbGV0ZU9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHRoaXMuYXV0b0NvbXBsZXRlT3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICB0aGlzLmluaXRHb29nbGVNYXBzQXV0b2NvbXBsZXRlKCk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==