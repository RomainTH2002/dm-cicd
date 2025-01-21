const axios = require('axios');
const { createVehicle } = require('./vehicle-cli.js');
const MockAdapter = require('axios-mock-adapter');

// Création d'un mock d'axios
const mock = new MockAdapter(axios);

describe('createVehicle', () => {
const address = 'http://localhost:3000'; // Exemple d'URL
const shortcode = 'veh123';
const battery = 80;
const longitude = 2.3522;
const latitude = 48.8566;

afterEach(() => {
mock.reset();
});

it('should create a vehicle successfully', async () => {
// Réponse simulée réussie
mock.onPost(`${address}/vehicles`).reply(200, {
vehicle: { id: '12345' },
});

const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

await createVehicle(shortcode, battery, longitude, latitude, address);

expect(consoleSpy).toHaveBeenCalledWith(
'Created vehicle `veh123`, with ID `12345`'
);

consoleSpy.mockRestore();
});
});
