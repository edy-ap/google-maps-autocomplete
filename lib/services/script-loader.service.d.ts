import * as i0 from "@angular/core";
export declare class ScriptLoaderService {
    private loadedScripts;
    private scriptPromises;
    loadScript(src: string): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScriptLoaderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ScriptLoaderService>;
}
