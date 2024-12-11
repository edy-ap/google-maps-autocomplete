import * as i0 from '@angular/core';
import { InjectionToken, Injectable, forwardRef, Directive, EventEmitter, Component, Inject, ViewChild, Input, Output, PLATFORM_ID, HostListener, NgModule } from '@angular/core';
import * as i1 from '@angular/forms';
import { NG_VALIDATORS, UntypedFormControl, Validators, NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i2 from '@angular/common';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import * as i4 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import * as i5 from '@angular/material/form-field';
import { animation, style, animate, trigger, transition, useAnimation, state, query, stagger, animateChild } from '@angular/animations';
import { distinctUntilChanged, debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as i3 from '@angular/flex-layout/flex';
import * as i6 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

function parseGermanAddress(placeResult) {
    const germanAddress = {
        gmID: placeResult.id,
        icon: placeResult.icon,
        url: placeResult.url,
        placeID: placeResult.place_id,
        displayAddress: placeResult.formatted_address,
        name: placeResult.name,
        vicinity: placeResult.vicinity,
        locality: {},
        state: {},
        country: {},
        geoLocation: { latitude: -1, longitude: -1 },
    };
    if (placeResult.geometry && placeResult.geometry.location) {
        germanAddress.geoLocation.latitude = placeResult.geometry.location.lat();
        germanAddress.geoLocation.longitude = placeResult.geometry.location.lng();
    }
    if (placeResult.address_components && placeResult.address_components.length > 0) {
        placeResult.address_components.forEach(value => {
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
    return germanAddress;
}

const ApiKeyToken = new InjectionToken('apiKey');

class ScriptLoaderService {
    loadedScripts = {};
    scriptPromises = {}; // Neu
    loadScript(src) {
        // Wenn das Skript bereits erfolgreich geladen wurde, sofort auflösen
        if (this.loadedScripts[src]) {
            return Promise.resolve();
        }
        // Wenn ein Ladevorgang für dieses Skript bereits im Gange ist, das vorhandene Promise zurückgeben
        if (this.scriptPromises[src]) {
            return this.scriptPromises[src];
        }
        // Ein neues Promise für das Skript-Laden erstellen und speichern
        this.scriptPromises[src] = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true; // Empfohlen für externe Skripte
            script.onload = () => {
                this.loadedScripts[src] = true; // Markiere das Skript als geladen
                resolve();
            };
            script.onerror = (error) => {
                this.scriptPromises[src] = null; // Bei Fehler, entferne das Promise, damit erneute Versuche möglich sind
                reject(error);
            };
            document.body.appendChild(script);
        });
        return this.scriptPromises[src];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: ScriptLoaderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: ScriptLoaderService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: ScriptLoaderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

// https://github.com/angular/angular/blob/master/packages/forms/src/directives/validators.ts
class MatValidateAddressDirective {
    subscription;
    _address;
    constructor() {
    }
    validate() {
        return (control) => {
            return this.address ? null : {
                validateAddress: {
                    valid: false
                }
            };
        };
    }
    subscribe(eventEmitter) {
        this.subscription = eventEmitter.subscribe((address) => {
            this.address = address;
        });
    }
    unsubscribe() {
        this.subscription.unsubscribe();
    }
    get address() {
        return this._address;
    }
    set address(value) {
        this._address = value;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: MatValidateAddressDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.2", type: MatValidateAddressDirective, selector: "[mat-address-validate][formControlName],[MatValidateAddress][formControl],[MatValidateAddress][ngModel]", providers: [
            { provide: NG_VALIDATORS, useExisting: forwardRef(() => MatValidateAddressDirective), multi: true }
        ], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: MatValidateAddressDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mat-address-validate][formControlName],[MatValidateAddress][formControl],[MatValidateAddress][ngModel]',
                    providers: [
                        { provide: NG_VALIDATORS, useExisting: forwardRef(() => MatValidateAddressDirective), multi: true }
                    ]
                }]
        }], ctorParameters: function () { return []; } });

var Appearance;
(function (Appearance) {
    Appearance["STANDARD"] = "standard";
    Appearance["FILL"] = "fill";
    Appearance["OUTLINE"] = "outline";
    Appearance["LEGACY"] = "legacy";
})(Appearance || (Appearance = {}));
class MatGoogleMapsAutocompleteComponent {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: MatGoogleMapsAutocompleteComponent, deps: [{ token: i0.NgZone }, { token: ApiKeyToken }, { token: ScriptLoaderService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.2", type: MatGoogleMapsAutocompleteComponent, selector: "mat-google-maps-autocomplete", inputs: { addressLabelText: "addressLabelText", placeholderText: "placeholderText", requiredErrorText: "requiredErrorText", invalidErrorText: "invalidErrorText", appearance: "appearance", value: "value", address: "address", country: "country", placeIdOnly: "placeIdOnly", strictBounds: "strictBounds", types: "types", type: "type", autoCompleteOptions: "autoCompleteOptions" }, outputs: { onChange: "onChange", onAutocompleteSelected: "onAutocompleteSelected", onGermanAddressMapped: "onGermanAddressMapped", onLocationSelected: "onLocationSelected" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => MatGoogleMapsAutocompleteComponent),
                multi: true
            }
        ], viewQueries: [{ propertyName: "searchElementRef", first: true, predicate: ["search"], descendants: true }], exportAs: ["matGoogleMapsAutocomplete"], ngImport: i0, template: "<mat-form-field class=\"full-width\" [appearance]=\"appearance\">\n  <mat-label>{{addressLabelText}}</mat-label>\n  <input matInput\n         [(ngModel)]=\"address\"\n         (change)=\"onQuery($event)\"\n         placeholder=\"{{placeholderText}}\"\n         class=\"form-control\"\n         #search\n         MatValidateAddress\n         required>\n  <mat-error *ngIf=\"addressSearchControl.hasError('required')\">\n    {{requiredErrorText}}\n  </mat-error>\n  <mat-error *ngIf=\"addressSearchControl.hasError('validateAddress')\">\n    {{invalidErrorText}}\n  </mat-error>\n</mat-form-field>\n", styles: [".full-width{width:100%}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i4.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "component", type: i5.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i5.MatLabel, selector: "mat-label" }, { kind: "directive", type: i5.MatError, selector: "mat-error, [matError]", inputs: ["id"] }, { kind: "directive", type: MatValidateAddressDirective, selector: "[mat-address-validate][formControlName],[MatValidateAddress][formControl],[MatValidateAddress][ngModel]" }] });
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
                }] }, { type: ScriptLoaderService }]; }, propDecorators: { searchElementRef: [{
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

const customAnimation = animation([
    style({
        opacity: '{{opacity}}',
        transform: 'scale({{scale}}) translate3d({{x}}, {{y}}, {{z}})'
    }),
    animate('{{duration}} {{delay}} cubic-bezier(0.0, 0.0, 0.2, 1)', style('*'))
], {
    params: {
        duration: '200ms',
        delay: '0ms',
        opacity: '0',
        scale: '1',
        x: '0',
        y: '0',
        z: '0'
    }
});
const InputAnimations = [
    trigger('animate', [transition('void => *', [useAnimation(customAnimation)])]),
    trigger('animateStagger', [
        state('50', style('*')),
        state('100', style('*')),
        state('200', style('*')),
        transition('void => 50', query('@*', [stagger('50ms', [animateChild()])], { optional: true })),
        transition('void => 100', query('@*', [stagger('100ms', [animateChild()])], { optional: true })),
        transition('void => 200', query('@*', [stagger('200ms', [animateChild()])], { optional: true }))
    ]),
];

class MatGoogleMapsAutocompleteDirective {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: MatGoogleMapsAutocompleteDirective, deps: [{ token: PLATFORM_ID }, { token: ApiKeyToken }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: ScriptLoaderService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
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
                }] }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: ScriptLoaderService }, { type: i0.NgZone }]; }, propDecorators: { inputField: [{
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

class MatSearchGoogleMapsAutocompleteComponent {
    formBuilder;
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    searchBarAppearance;
    appearance = Appearance.STANDARD;
    searchAddressLabel = 'Search Address';
    streetNameLabel = 'Street';
    streetNumberLabel = 'Nr.';
    postalCodeLabel = 'PLZ';
    localityLabel = 'Locality';
    vicinityLabel = 'Vicinity';
    showVicinity;
    country;
    placeIdOnly;
    strictBounds;
    types;
    // types: string[] = ['address'];
    type;
    readonly;
    disableSearch;
    _value;
    onGermanAddressMapped = new EventEmitter();
    germanAddress;
    addressFormGroup;
    firstInit = true;
    // Private
    _unsubscribeAll;
    propagateChange = (_) => {
    };
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
        this.propagateChange(this.value);
    }
    ngOnInit() {
        this.createAddressFormGroup();
        this.enableCustomInput();
    }
    createAddressFormGroup() {
        this.addressFormGroup = this.formBuilder.group({
            streetName: [this.value && this.value.streetName ? this.value.streetName : null, Validators.required],
            streetNumber: [this.value && this.value.streetNumber ? this.value.streetNumber : null, Validators.required],
            postalCode: [this.value && this.value.postalCode ? this.value.postalCode : null, Validators.required],
            vicinity: [this.value && this.value.vicinity ? this.value.vicinity : null],
            locality: this.formBuilder.group({
                long: [this.value && this.value.locality && this.value.locality.long ? this.value.locality.long : null, Validators.required],
            }),
        });
    }
    enableCustomInput() {
        this.addressFormGroup
            .get('streetName')
            .valueChanges
            .pipe(distinctUntilChanged(), debounceTime(400), takeUntil(this._unsubscribeAll))
            .subscribe(streetName => {
            !this.value ? this.value = { streetName } : this.value.streetName = streetName;
            this.value.displayAddress = this.parseDisplayAddress();
            this.propagateChange(this.value);
        });
        this.addressFormGroup
            .get('streetNumber')
            .valueChanges
            .pipe(distinctUntilChanged(), debounceTime(400), takeUntil(this._unsubscribeAll))
            .subscribe(streetNumber => {
            !this.value ? this.value = { streetNumber } : this.value.streetNumber = streetNumber;
            this.value.displayAddress = this.parseDisplayAddress();
            this.propagateChange(this.value);
        });
        this.addressFormGroup
            .get('postalCode')
            .valueChanges
            .pipe(distinctUntilChanged(), debounceTime(400), takeUntil(this._unsubscribeAll))
            .subscribe(postalCode => {
            !this.value ? this.value = { postalCode } : this.value.postalCode = postalCode;
            this.value.displayAddress = this.parseDisplayAddress();
            this.propagateChange(this.value);
        });
        this.addressFormGroup
            .get('vicinity')
            .valueChanges
            .pipe(distinctUntilChanged(), debounceTime(400), takeUntil(this._unsubscribeAll))
            .subscribe(vicinity => {
            !this.value ? this.value = { vicinity } : this.value.vicinity = vicinity;
            this.value.displayAddress = this.parseDisplayAddress();
            this.propagateChange(this.value);
        });
        this.addressFormGroup
            .get('locality')
            .valueChanges
            .pipe(distinctUntilChanged(), debounceTime(400), takeUntil(this._unsubscribeAll))
            .subscribe(locality => {
            !this.value ? this.value = { locality } : this.value.locality = locality;
            this.value.displayAddress = this.parseDisplayAddress();
            this.propagateChange(this.value);
        });
    }
    parseDisplayAddress() {
        return `${this.value?.streetName ? this.value?.streetName : ''} ${this.value?.streetNumber ? this.value?.streetNumber : ''}${this.value?.postalCode || this.value?.locality?.long ? ', ' : ''}${this.value?.postalCode ? this.value?.postalCode : ''} ${this.value?.locality?.long ? this.value?.locality?.long : ''}`;
    }
    syncAutoComplete($event) {
        if (this.germanAddress) {
            this.addressFormGroup.reset();
        }
        const germanAddress = parseGermanAddress($event);
        this.germanAddress = germanAddress;
        if (germanAddress.vicinity) {
            this.addressFormGroup.get('vicinity').patchValue(germanAddress.vicinity, { emitEvent: false, onlySelf: true });
        }
        if (germanAddress.streetName) {
            this.addressFormGroup.get('streetName').patchValue(germanAddress.streetName, { emitEvent: false, onlySelf: true });
        }
        if (germanAddress.streetNumber) {
            this.addressFormGroup.get('streetNumber').patchValue(germanAddress.streetNumber.toString(), {
                emitEvent: false,
                onlySelf: true
            });
        }
        if (germanAddress.postalCode) {
            this.addressFormGroup.get('postalCode').patchValue(germanAddress.postalCode, { emitEvent: false, onlySelf: true });
        }
        if (germanAddress.locality && germanAddress.locality.long) {
            this.addressFormGroup.get('locality.long').patchValue(germanAddress.locality.long, {
                emitEvent: false,
                onlySelf: true
            });
        }
        this.value = germanAddress;
        this.onGermanAddressMapped.emit(germanAddress);
    }
    writeValue(obj) {
        let shouldRecreateFG = false;
        if (obj) {
            if (!this.value && this.firstInit) {
                shouldRecreateFG = true;
            }
            this.value = obj;
            if (shouldRecreateFG) {
                this.createAddressFormGroup();
                this.firstInit = false;
            }
        }
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn) {
    }
    setDisabledState(isDisabled) {
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: MatSearchGoogleMapsAutocompleteComponent, deps: [{ token: i1.UntypedFormBuilder }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.2", type: MatSearchGoogleMapsAutocompleteComponent, selector: "mat-search-google-maps-autocomplete", inputs: { searchBarAppearance: "searchBarAppearance", appearance: "appearance", searchAddressLabel: "searchAddressLabel", streetNameLabel: "streetNameLabel", streetNumberLabel: "streetNumberLabel", postalCodeLabel: "postalCodeLabel", localityLabel: "localityLabel", vicinityLabel: "vicinityLabel", showVicinity: "showVicinity", country: "country", placeIdOnly: "placeIdOnly", strictBounds: "strictBounds", types: "types", type: "type", readonly: "readonly", disableSearch: "disableSearch", _value: "_value", value: "value" }, outputs: { onGermanAddressMapped: "onGermanAddressMapped" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => MatSearchGoogleMapsAutocompleteComponent),
                multi: true
            }
        ], ngImport: i0, template: "<div fxLayout=\"column\">\n  <div *ngIf=\"!disableSearch\" fxFlex=\"100\">\n    <!--search address-->\n    <mat-form-field fxFlex=\"auto\" [appearance]=\"searchBarAppearance\" [@animate]=\"{ value: '*', params: { y: '100%' } }\">\n      <mat-label>{{searchAddressLabel}}</mat-label>\n      <input\n        (onAutocompleteSelected)=\"syncAutoComplete($event)\"\n        [country]=\"country\"\n        [placeIdOnly]=\"placeIdOnly\"\n        [strictBounds]=\"strictBounds\"\n        [types]=\"types\"\n        [type]=\"type\"\n        matGoogleMapsAutocomplete\n        matInput\n        required\n      />\n      <mat-icon color=\"primary\" matSuffix>search</mat-icon>\n      <!--    <mat-error>{{ 'msa.contactData.currentAddress.error' | translate }}</mat-error>-->\n    </mat-form-field>\n  </div>\n\n  <form [formGroup]=\"addressFormGroup\" fxFlex fxLayoutGap=\"10px\">\n    <div fxLayout=\"row\" fxLayoutGap=\"10px\">\n      <mat-form-field fxFlex=\"80\"\n                      [appearance]=\"appearance\"\n                      [@animate]=\"{ value: '*', params: { y: '100%' } }\">\n        <mat-label>{{streetNameLabel}}</mat-label>\n        <input\n          [readonly]=\"readonly\"\n          formControlName=\"streetName\"\n          matInput\n          required\n        />\n        <!--        <mat-icon color=\"primary\" matSuffix>add_location</mat-icon>-->\n        <!--    <mat-error>{{ 'msa.contactData.currentAddress.error' | translate }}</mat-error>-->\n      </mat-form-field>\n      <mat-form-field fxFlex=\"20\" [appearance]=\"appearance\" [@animate]=\"{ value: '*', params: { y: '100%' } }\">\n        <mat-label>{{streetNumberLabel}}</mat-label>\n        <input\n          [readonly]=\"readonly\"\n          formControlName=\"streetNumber\"\n          matInput\n          required\n        />\n        <!--        <mat-icon color=\"primary\" matSuffix>add_location</mat-icon>-->\n        <!--    <mat-error>{{ 'msa.contactData.currentAddress.error' | translate }}</mat-error>-->\n      </mat-form-field>\n    </div>\n    <div fxLayout=\"row\" fxLayoutGap=\"10px\">\n      <mat-form-field fxFlex=\"20\" [appearance]=\"appearance\" [@animate]=\"{ value: '*', params: { y: '100%' } }\">\n        <mat-label>{{postalCodeLabel}}</mat-label>\n        <input\n          [readonly]=\"readonly\"\n          formControlName=\"postalCode\"\n          type=\"number\"\n          matInput\n          required\n        />\n        <!--        <mat-icon color=\"primary\" matSuffix>add_location</mat-icon>-->\n        <!--    <mat-error>{{ 'msa.contactData.currentAddress.error' | translate }}</mat-error>-->\n      </mat-form-field>\n      <mat-form-field *ngIf=\"showVicinity\" fxFlex=\"auto\"\n                      [appearance]=\"appearance\"\n                      [@animate]=\"{ value: '*', params: { y: '100%' } }\">\n        <mat-label>{{vicinityLabel}}</mat-label>\n        <input\n          [readonly]=\"readonly\"\n          matInput\n          formControlName=\"vicinity\"\n        />\n      </mat-form-field>\n      <div formGroupName=\"locality\" fxFlex=\"auto\">\n        <mat-form-field fxFlex=\"auto\" [appearance]=\"appearance\" [@animate]=\"{ value: '*', params: { y: '100%' } }\">\n          <mat-label>{{localityLabel}}</mat-label>\n          <input\n            [readonly]=\"readonly\"\n            formControlName=\"long\"\n            matInput\n            required\n          />\n          <mat-icon color=\"primary\" matSuffix>add_location</mat-icon>\n          <!--    <mat-error>{{ 'msa.contactData.currentAddress.error' | translate }}</mat-error>-->\n        </mat-form-field>\n      </div>\n    </div>\n  </form>\n</div>\n", styles: [""], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NumberValueAccessor, selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i1.FormGroupName, selector: "[formGroupName]", inputs: ["formGroupName"] }, { kind: "directive", type: i3.DefaultLayoutDirective, selector: "  [fxLayout], [fxLayout.xs], [fxLayout.sm], [fxLayout.md],  [fxLayout.lg], [fxLayout.xl], [fxLayout.lt-sm], [fxLayout.lt-md],  [fxLayout.lt-lg], [fxLayout.lt-xl], [fxLayout.gt-xs], [fxLayout.gt-sm],  [fxLayout.gt-md], [fxLayout.gt-lg]", inputs: ["fxLayout", "fxLayout.xs", "fxLayout.sm", "fxLayout.md", "fxLayout.lg", "fxLayout.xl", "fxLayout.lt-sm", "fxLayout.lt-md", "fxLayout.lt-lg", "fxLayout.lt-xl", "fxLayout.gt-xs", "fxLayout.gt-sm", "fxLayout.gt-md", "fxLayout.gt-lg"] }, { kind: "directive", type: i3.DefaultLayoutGapDirective, selector: "  [fxLayoutGap], [fxLayoutGap.xs], [fxLayoutGap.sm], [fxLayoutGap.md],  [fxLayoutGap.lg], [fxLayoutGap.xl], [fxLayoutGap.lt-sm], [fxLayoutGap.lt-md],  [fxLayoutGap.lt-lg], [fxLayoutGap.lt-xl], [fxLayoutGap.gt-xs], [fxLayoutGap.gt-sm],  [fxLayoutGap.gt-md], [fxLayoutGap.gt-lg]", inputs: ["fxLayoutGap", "fxLayoutGap.xs", "fxLayoutGap.sm", "fxLayoutGap.md", "fxLayoutGap.lg", "fxLayoutGap.xl", "fxLayoutGap.lt-sm", "fxLayoutGap.lt-md", "fxLayoutGap.lt-lg", "fxLayoutGap.lt-xl", "fxLayoutGap.gt-xs", "fxLayoutGap.gt-sm", "fxLayoutGap.gt-md", "fxLayoutGap.gt-lg"] }, { kind: "directive", type: i3.DefaultFlexDirective, selector: "  [fxFlex], [fxFlex.xs], [fxFlex.sm], [fxFlex.md],  [fxFlex.lg], [fxFlex.xl], [fxFlex.lt-sm], [fxFlex.lt-md],  [fxFlex.lt-lg], [fxFlex.lt-xl], [fxFlex.gt-xs], [fxFlex.gt-sm],  [fxFlex.gt-md], [fxFlex.gt-lg]", inputs: ["fxFlex", "fxFlex.xs", "fxFlex.sm", "fxFlex.md", "fxFlex.lg", "fxFlex.xl", "fxFlex.lt-sm", "fxFlex.lt-md", "fxFlex.lt-lg", "fxFlex.lt-xl", "fxFlex.gt-xs", "fxFlex.gt-sm", "fxFlex.gt-md", "fxFlex.gt-lg"] }, { kind: "directive", type: i4.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "component", type: i5.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i5.MatLabel, selector: "mat-label" }, { kind: "directive", type: i5.MatSuffix, selector: "[matSuffix], [matIconSuffix], [matTextSuffix]", inputs: ["matTextSuffix"] }, { kind: "component", type: i6.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: MatGoogleMapsAutocompleteDirective, selector: "[matGoogleMapsAutocomplete]", inputs: ["address", "country", "placeIdOnly", "strictBounds", "types", "type", "autoCompleteOptions", "value"], outputs: ["onChange", "onAutocompleteSelected", "onGermanAddressMapped", "onLocationSelected"], exportAs: ["matGoogleMapsAutocomplete"] }], animations: InputAnimations });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: MatSearchGoogleMapsAutocompleteComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mat-search-google-maps-autocomplete', animations: InputAnimations, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => MatSearchGoogleMapsAutocompleteComponent),
                            multi: true
                        }
                    ], template: "<div fxLayout=\"column\">\n  <div *ngIf=\"!disableSearch\" fxFlex=\"100\">\n    <!--search address-->\n    <mat-form-field fxFlex=\"auto\" [appearance]=\"searchBarAppearance\" [@animate]=\"{ value: '*', params: { y: '100%' } }\">\n      <mat-label>{{searchAddressLabel}}</mat-label>\n      <input\n        (onAutocompleteSelected)=\"syncAutoComplete($event)\"\n        [country]=\"country\"\n        [placeIdOnly]=\"placeIdOnly\"\n        [strictBounds]=\"strictBounds\"\n        [types]=\"types\"\n        [type]=\"type\"\n        matGoogleMapsAutocomplete\n        matInput\n        required\n      />\n      <mat-icon color=\"primary\" matSuffix>search</mat-icon>\n      <!--    <mat-error>{{ 'msa.contactData.currentAddress.error' | translate }}</mat-error>-->\n    </mat-form-field>\n  </div>\n\n  <form [formGroup]=\"addressFormGroup\" fxFlex fxLayoutGap=\"10px\">\n    <div fxLayout=\"row\" fxLayoutGap=\"10px\">\n      <mat-form-field fxFlex=\"80\"\n                      [appearance]=\"appearance\"\n                      [@animate]=\"{ value: '*', params: { y: '100%' } }\">\n        <mat-label>{{streetNameLabel}}</mat-label>\n        <input\n          [readonly]=\"readonly\"\n          formControlName=\"streetName\"\n          matInput\n          required\n        />\n        <!--        <mat-icon color=\"primary\" matSuffix>add_location</mat-icon>-->\n        <!--    <mat-error>{{ 'msa.contactData.currentAddress.error' | translate }}</mat-error>-->\n      </mat-form-field>\n      <mat-form-field fxFlex=\"20\" [appearance]=\"appearance\" [@animate]=\"{ value: '*', params: { y: '100%' } }\">\n        <mat-label>{{streetNumberLabel}}</mat-label>\n        <input\n          [readonly]=\"readonly\"\n          formControlName=\"streetNumber\"\n          matInput\n          required\n        />\n        <!--        <mat-icon color=\"primary\" matSuffix>add_location</mat-icon>-->\n        <!--    <mat-error>{{ 'msa.contactData.currentAddress.error' | translate }}</mat-error>-->\n      </mat-form-field>\n    </div>\n    <div fxLayout=\"row\" fxLayoutGap=\"10px\">\n      <mat-form-field fxFlex=\"20\" [appearance]=\"appearance\" [@animate]=\"{ value: '*', params: { y: '100%' } }\">\n        <mat-label>{{postalCodeLabel}}</mat-label>\n        <input\n          [readonly]=\"readonly\"\n          formControlName=\"postalCode\"\n          type=\"number\"\n          matInput\n          required\n        />\n        <!--        <mat-icon color=\"primary\" matSuffix>add_location</mat-icon>-->\n        <!--    <mat-error>{{ 'msa.contactData.currentAddress.error' | translate }}</mat-error>-->\n      </mat-form-field>\n      <mat-form-field *ngIf=\"showVicinity\" fxFlex=\"auto\"\n                      [appearance]=\"appearance\"\n                      [@animate]=\"{ value: '*', params: { y: '100%' } }\">\n        <mat-label>{{vicinityLabel}}</mat-label>\n        <input\n          [readonly]=\"readonly\"\n          matInput\n          formControlName=\"vicinity\"\n        />\n      </mat-form-field>\n      <div formGroupName=\"locality\" fxFlex=\"auto\">\n        <mat-form-field fxFlex=\"auto\" [appearance]=\"appearance\" [@animate]=\"{ value: '*', params: { y: '100%' } }\">\n          <mat-label>{{localityLabel}}</mat-label>\n          <input\n            [readonly]=\"readonly\"\n            formControlName=\"long\"\n            matInput\n            required\n          />\n          <mat-icon color=\"primary\" matSuffix>add_location</mat-icon>\n          <!--    <mat-error>{{ 'msa.contactData.currentAddress.error' | translate }}</mat-error>-->\n        </mat-form-field>\n      </div>\n    </div>\n  </form>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.UntypedFormBuilder }]; }, propDecorators: { searchBarAppearance: [{
                type: Input
            }], appearance: [{
                type: Input
            }], searchAddressLabel: [{
                type: Input
            }], streetNameLabel: [{
                type: Input
            }], streetNumberLabel: [{
                type: Input
            }], postalCodeLabel: [{
                type: Input
            }], localityLabel: [{
                type: Input
            }], vicinityLabel: [{
                type: Input
            }], showVicinity: [{
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
            }], readonly: [{
                type: Input
            }], disableSearch: [{
                type: Input
            }], _value: [{
                type: Input
            }], onGermanAddressMapped: [{
                type: Output
            }], value: [{
                type: Input
            }] } });

class MatGoogleMapsAutocompleteModule {
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

/*
 * Public API Surface of google-maps-autocomplete
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ApiKeyToken, Appearance, MatGoogleMapsAutocompleteComponent, MatGoogleMapsAutocompleteDirective, MatGoogleMapsAutocompleteModule, MatSearchGoogleMapsAutocompleteComponent, MatValidateAddressDirective, ScriptLoaderService, parseGermanAddress };
//# sourceMappingURL=angular-material-extensions-google-maps-autocomplete.mjs.map
