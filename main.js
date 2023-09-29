const { readFile } = require("fs");

const filePath = "C:/Users/lgarcia/Desktop/bst200ct.bin";

readFile(filePath, (_, data) =>
  console.log(
    "{ " +
      [...data]
        .map((intByte) => intByte.toString(16).padStart(2, "0"))
        .join(" ")
        .replace(/.*(1b 69 55 77 01)/i, "$1")
        .split(" ")
        .slice(0, 5 + 127)
        .map((hexByte) => "0x" + hexByte)
        .join(", ") +
      " }"
  )
);
