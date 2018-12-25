// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    nodeA: {
      host: '127.0.0.1',
      port: 22000, 
      network_id: '*',
      gasPrice: 0,
      gas: 4500000
    },
    nodeB: {
      host: '127.0.0.1',
      port: 22001, 
      network_id: '*',
      gasPrice: 0,
      gas: 4500000
    },
    nodeC: {
      host: '127.0.0.1',
      port: 22002, 
      network_id: '*',
      gasPrice: 0,
      gas: 4500000
    },
    node4: {
      host: '127.0.0.1',
      port: 22003, 
      network_id: '*',
      gasPrice: 0,
      gas: 4500000
    }
  }
}
