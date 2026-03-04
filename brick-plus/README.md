# BrickPlus

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# Lancer la PWA

```bash
# 1. Build en mode production
ng build

# 2. Servir le build (pas ng serve)
npx http-server -p 8080 -c-1 dist/brick-plus/browser
```

Puis ouvrir :
[http://localhost:8080](http://localhost:8080)

## Vérifier que ça fonctionne

### Dans les DevTools (F12)

1. **Application → Service Workers**
   - Le Service Worker doit être **activé**

2. **Application → Manifest**
   - Les informations de l’application (nom, icônes, couleurs) doivent apparaître

3. **Network → Activer Offline**
   - Recharger la page
   - L’application doit toujours fonctionner

4. **Console**
   - Message attendu :
     ```
     Vérification des mises à jour effectuée
     ```

### Sur téléphone

```bash
# Pour partager le réseaux entre le PC et le téléphone
ng serve --host 0.0.0.0 --port 4200
```
