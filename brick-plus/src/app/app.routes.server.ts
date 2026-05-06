import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'product/:id',
    renderMode: RenderMode.Server // ← rendu côté serveur à la demande
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
