/// <reference types="googlemaps" />
/// <reference types="googlemaps" />
import { ElementRef, EventEmitter, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, UntypedFormControl } from '@angular/forms';
import { Location } from '../interfaces/location.interface';
import { GermanAddress } from '../interfaces';
import { ScriptLoaderService } from "../services/script-loader.service";
import PlaceResult = google.maps.places.PlaceResult;
import AutocompleteOptions = google.maps.places.AutocompleteOptions;
import * as i0 from "@angular/core";
export declare enum Appearance {
    STANDARD = "standard",
    FILL = "fill",
    OUTLINE = "outline",
    LEGACY = "legacy"
}
export declare class MatGoogleMapsAutocompleteComponent implements OnInit, OnDestroy, ControlValueAccessor {
    private ngZone;
    apiKey: string;
    private loaderService;
    autocomplete: google.maps.places.Autocomplete | undefined;
    searchElementRef: ElementRef;
    addressLabelText: string;
    placeholderText: string;
    requiredErrorText: string;
    invalidErrorText: string;
    appearance: string | Appearance;
    value: PlaceResult;
    address: PlaceResult | string;
    country: string | string[];
    placeIdOnly?: boolean;
    strictBounds?: boolean;
    types?: string[];
    type?: string;
    autoCompleteOptions: AutocompleteOptions;
    onChange: EventEmitter<PlaceResult | string | null>;
    onAutocompleteSelected: EventEmitter<PlaceResult>;
    onGermanAddressMapped: EventEmitter<GermanAddress>;
    onLocationSelected: EventEmitter<Location>;
    private onNewPlaceResult;
    private addressValidator;
    addressSearchControl: UntypedFormControl;
    propagateChange: (_: any) => void;
    constructor(ngZone: NgZone, apiKey: string, loaderService: ScriptLoaderService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    initGoogleMapsAutocomplete(): void;
    onQuery(event: any): void;
    private resetAddress;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState?(isDisabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatGoogleMapsAutocompleteComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatGoogleMapsAutocompleteComponent, "mat-google-maps-autocomplete", ["matGoogleMapsAutocomplete"], { "addressLabelText": { "alias": "addressLabelText"; "required": false; }; "placeholderText": { "alias": "placeholderText"; "required": false; }; "requiredErrorText": { "alias": "requiredErrorText"; "required": false; }; "invalidErrorText": { "alias": "invalidErrorText"; "required": false; }; "appearance": { "alias": "appearance"; "required": false; }; "value": { "alias": "value"; "required": false; }; "address": { "alias": "address"; "required": false; }; "country": { "alias": "country"; "required": false; }; "placeIdOnly": { "alias": "placeIdOnly"; "required": false; }; "strictBounds": { "alias": "strictBounds"; "required": false; }; "types": { "alias": "types"; "required": false; }; "type": { "alias": "type"; "required": false; }; "autoCompleteOptions": { "alias": "autoCompleteOptions"; "required": false; }; }, { "onChange": "onChange"; "onAutocompleteSelected": "onAutocompleteSelected"; "onGermanAddressMapped": "onGermanAddressMapped"; "onLocationSelected": "onLocationSelected"; }, never, never, false, never>;
}
