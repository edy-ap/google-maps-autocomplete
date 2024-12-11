/// <reference types="googlemaps" />
import { EventEmitter } from '@angular/core';
import { Validator, ValidatorFn } from '@angular/forms';
import PlaceResult = google.maps.places.PlaceResult;
import * as i0 from "@angular/core";
export declare class MatValidateAddressDirective implements Validator {
    subscription: any;
    private _address;
    constructor();
    validate(): ValidatorFn;
    subscribe(eventEmitter: EventEmitter<any>): void;
    unsubscribe(): void;
    get address(): PlaceResult;
    set address(value: PlaceResult);
    static ɵfac: i0.ɵɵFactoryDeclaration<MatValidateAddressDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatValidateAddressDirective, "[mat-address-validate][formControlName],[MatValidateAddress][formControl],[MatValidateAddress][ngModel]", never, {}, {}, never, never, false, never>;
}
