import yargs from "yargs";

const argv = (processArgv: string[]): [number, string?] => {
  const args = yargs(processArgv.slice(2)).argv as any;
  const size = Number(args._[0] || 10000);
  const formats = args._[1];
  return [size, formats];
};

export default argv;
