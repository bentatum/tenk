import yargs from "yargs";

const argv = (processArgv: string[]): [number] => {
  const args = yargs(processArgv.slice(2)).argv as any;
  const size = Number(args._[0] || 10000);
  return [size];
};

export default argv;
