#!/usr/bin/env node

const { Command } = require('commander');
const axios = require('axios');

// Création du programme CLI
const program = new Command();

// Fonction pour créer un véhicule
const createVehicle = async (shortcode, battery, longitude, latitude) => {
  try {
    const address = 'http://localhost:8080';

    const response = await axios.post(`${address}/vehicles`, {
      shortcode,
      battery,
      longitude,
      latitude,
    });

    console.log(`Created vehicle \`${shortcode}\`, with ID \`${response.data.vehicle.id}\``);
  } catch (error) {
    if (error.response) {
      const errorData = error.response.data;
      console.error('Error creating vehicle:', errorData.error.message);

      if (errorData.error.violations) {
        console.log('Validation errors:');
        errorData.error.violations.forEach((violation) => {
          console.log(`- ${violation}`);
        });
      }
    } else {
      console.error('Error creating vehicle:', error.message);
    }
  }
};

// Fonction pour lister les véhicules
const listVehicles = async (address) => {
  try {
    const response = await axios.get(`${address}/vehicles`);
    const vehicles = response.data.vehicles;

    if (vehicles.length === 0) {
      console.log('No vehicles found.');
    } else {
      console.log('List of vehicles:');
      vehicles.forEach((vehicle) => {
        console.log(
          `- ID: ${vehicle.id}, Shortcode: ${vehicle.shortcode}, Battery: ${vehicle.battery}, Location: (${vehicle.longitude}, ${vehicle.latitude})`
        );
      });
    }
  } catch (error) {
    if (error.response) {
      console.error('Error fetching vehicles:', error.response.data.error.message);
    } else {
      console.error('Error fetching vehicles:', error.message);
    }
  }
};

// Commande pour créer un véhicule
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
    const battery = parseInt(cmd.battery);
    const longitude = parseFloat(cmd.longitude);
    const latitude = parseFloat(cmd.latitude);

    if (isNaN(battery) || isNaN(longitude) || isNaN(latitude)) {
      console.error('Invalid input: Battery, longitude, and latitude must be numeric.');
      process.exit(1);
    }

    createVehicle(cmd.shortcode, battery, longitude, latitude);
  });

// Commande pour lister les véhicules
program
  .command('list-vehicles')
  .description('List all vehicles')
  .requiredOption('--address <address>', 'Server address (e.g., http://localhost:8080)')
  .action((cmd) => {
    listVehicles(cmd.address);
  });

// Lancer le programme CLI
program.parse(process.argv);
