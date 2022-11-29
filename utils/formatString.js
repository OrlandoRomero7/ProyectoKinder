const encodeId = (str) => `group_${str.replace("-", "")}`.toLowerCase();
const decodeId = (str) => str?.split("_")[1].split("").join("-").toUpperCase();

export { encodeId, decodeId };
