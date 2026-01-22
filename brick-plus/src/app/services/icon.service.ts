import { Injectable } from '@angular/core';

interface IconManifest {
  icons: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class IconService {
  private manifest: Record<string, string> = {};
  private loaded = false;

  constructor() {
    void this.loadManifest();
  }

  private async loadManifest(): Promise<void> {
    try {
      const res = await fetch('/icons/manifest.json');
      if (!res.ok) return;
      const json = (await res.json()) as IconManifest;
      this.manifest = json.icons || {};
      this.loaded = true;
    } catch (e) {
      // Ne pas casser l'app si manifest indisponible
      // console.warn('IconService: impossible de charger manifest.json', e);
    }
  }

  getIconPath(name: string): string {
    if (this.manifest && this.manifest[name]) return this.manifest[name];
    return `/icons/${name}.svg`;
  }

  async ensureLoaded(): Promise<void> {
    if (this.loaded) return;
    await this.loadManifest();
  }
}
