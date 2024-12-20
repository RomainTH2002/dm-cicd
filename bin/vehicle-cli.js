#!/usr/bin/env node

const { Command } = require('commander');
const axios = require('axios');

// Création du programme CLI
const program = new Command();

// Fonction pour créer un véhicule
const createVehicle = async (shortcode, battery, longitude, latitude) => {
  try {
    // Adresse fixe du serveur
    const address = 'http://localhost:8080'; // Assurez-vous que l'URL commence avec http://

    // Appel API pour créer un véhicule
    const response = await axios.post(`${address}/vehicles`, {
      shortcode: shortcode,
      battery: battery,
      longitude: longitude,
      latitude: latitude
    });

    // Affichage du résultat
    console.log(`Created vehicle \`${shortcode}\`, with ID \`${response.data.vehicle.id}\``);
  } catch (error) {
    if (error.response) {
      // L'API a renvoyé une erreur, afficher les détails
      const errorData = error.response.data;
      console.error('Error creating vehicle:', errorData.error.message);

      if (errorData.error.violations) {
        // Si des violations de validation existent, les afficher
        console.log('Validation errors:');
        errorData.error.violations.forEach((violation) => {
          console.log(`- ${violation}`);
        });
      }
    } else {
      // Erreur autre que côté serveur (par exemple, réseau)
      console.error('Error creating vehicle:', error.message);
    }
  }
};

// Configuration de la commande
program
  .version('1.0.0')
  .description('Vehicle CLI to manage vehicles')
  .command('create-vehicle')
  .description('Create a new vehicle')
  .requiredOption('--shortcode <shortcode>', 'Shortcode of the vehicle')
  .requiredOption('--battery <battery>', 'Battery level of the vehicle')
  .requiredOption('--longitude <longitude>', 'Longitude of the vehicle')
  .requiredOption('--latitude <latitude>', 'Latitude of the vehicle')
  .action((cmd) => {
    // Convertir les options en valeurs numériques si nécessaire (par exemple, pour battery, longitude, latitude)
    const battery = parseInt(cmd.battery);
    const longitude = parseFloat(cmd.longitude);
    const latitude = parseFloat(cmd.latitude);

    // Vérification rapide des données avant d'envoyer la requête
    if (isNaN(battery) || isNaN(longitude) || isNaN(latitude)) {
      console.error('Invalid input: Battery, longitude, and latitude must be numeric.');
      process.exit(1);
    }

    // Appel à la fonction de création de véhicule avec les options passées en CLI
    createVehicle(cmd.shortcode, battery, longitude, latitude);
  });

// Lancer le programme CLI
program.parse(process.argv);
