// NIKOS: Eparkei ayto gia message logging? Na evaza kanena Winston?

const logMessage = (message: string, item?: any) =>
  console.log(`Logger: ${message}`, item);

export default logMessage;
