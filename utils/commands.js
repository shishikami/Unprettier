import { Command } from 'commander';
const program = new Command();

export function showCommands(){
  program
    .name("unprettier")
    .usage("<input> <output>")
    .option('-f, --force', 'Irreversibly overwrite the output file even it exists')

  program.parse(process.argv);
  let force = program.opts().force;
  let [input, output] = program.args;

  return {force, input, output}
}