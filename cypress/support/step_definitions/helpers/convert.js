const stringToJson = data => JSON.parse(data.replaceAll("'", '"'));

export {stringToJson};
