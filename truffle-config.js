module.exports = {
  networks: {
     development: {
      host: "127.0.0.1",
      network_id: 5777,
      port: 9545,
      defaultEtherBalance: 500
     }
  },

  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
}
