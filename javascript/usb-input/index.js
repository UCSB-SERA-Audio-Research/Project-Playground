window.onload = function () {
    document.querySelectorAll("button")[0].onclick = function () {
        var device;

        navigator.usb.requestDevice({ filters: [{ vendorId: 0x2341 }] })
            .then(selectedDevice => {
                device = selectedDevice;
                return device.open(); // Begin a session.
            })
            .then(() => device.selectConfiguration(1)) // Select configuration #1 for the device.
            .then(() => device.claimInterface(2)) // Request exclusive control over interface #2.
            .then(() => device.controlTransferOut({
                requestType: 'class',
                recipient: 'interface',
                request: 0x22,
                value: 0x01,
                index: 0x02
            })).catch(error => { console.log(error); });
    }
};

/*
.then(() => device.transferIn(5, 64)).then(result => {
                let decoder = new TextDecoder();
                console.log('Received: ' + decoder.decode(result.data));
            })
            */