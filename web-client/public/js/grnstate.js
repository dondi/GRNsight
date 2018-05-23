let currentNetwork = null;

export const grnState = {
    name: null,

    newNetwork: false,

    get network() {
        return currentNetwork;
    },

    set network(network) {
        currentNetwork = network;
        this.newNetwork = true;
    },

    dashedLine: false,
};
