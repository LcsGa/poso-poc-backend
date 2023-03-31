import { findByIds, OutEndpoint } from "usb";
import Encoder from "@manhnd/esc-pos-encoder";

const device = findByIds(0x4f9, 0x2057);

if (!device) {
  console.error("Imprimante non trouvée");
  process.exit(1);
}

device.open();

const printerInterface = device.interface(0);
if (printerInterface.isKernelDriverActive()) {
  try {
    printerInterface.detachKernelDriver();
  } catch (error) {
    console.error("Impossible de détacher le pilote du noyau :", error);
    process.exit(1);
  }
}

printerInterface.claim();

const endpoint = printerInterface.endpoints[1] as OutEndpoint;

const buffer = Buffer.from(new Encoder().text("The quick brown fox jumps over the lazy dog").encode());

endpoint.transfer(buffer, (error) => {
  if (error) {
    console.error("Erreur lors de l'envoi des données à l'imprimante :", error);
  } else {
    console.log("Impression réussie");
  }

  printerInterface.release(true, (error) => {
    if (error) {
      console.error("Erreur lors de la libération de l'interface :", error);
    }
    device.close();
  });
});
