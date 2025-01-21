# Guide d'utilisation des commandes

## Prérequis
Assurez-vous d'avoir Node.js installé sur votre machine. Si ce n'est pas le cas, téléchargez-le et installez-le depuis [le site officiel de Node.js](https://nodejs.org/).

## Installation des dépendances
Exécutez la commande suivante pour installer toutes les dépendances nécessaires :

```bash
npm ci
```

## Démarrer le projet
1. Lancez la base de données avec la commande :

```bash
npm run start-db
```

2. Lancez l'application avec la commande :

```bash
npm run start
```

## Gestion des véhicules

### Créer un véhicule
Pour créer un nouveau véhicule, utilisez la commande suivante :

```bash
vehicle-cli create vehicle \
  --shortcode <shortcode> \
  --battery <battery> \
  --longitude <longitude> \
  --latitude <latitude>
```

#### Options obligatoires :
- `--shortcode <shortcode>` : Identifiant court du véhicule.
- `--battery <battery>` : Niveau de batterie du véhicule (en pourcentage).
- `--longitude <longitude>` : Longitude du véhicule.
- `--latitude <latitude>` : Latitude du véhicule.

#### Exemple :
```bash
vehicle-cli create vehicle \
  --shortcode V123 \
  --battery 85 \
  --longitude 2.3522 \
  --latitude 48.8566
```

### Lister les véhicules
Pour afficher la liste de tous les véhicules, utilisez la commande suivante :

```bash
vehicle-cli list-vehicles
```

Cette commande retournera une liste des véhicules enregistrés avec leurs informations.

