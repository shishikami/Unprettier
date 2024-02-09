import yargs from 'yargs';

export function showCommands(){
  const argv = yargs(process.argv.slice(2))
    .command({
      command: 'uglify <input> <output>',
      desc: 'Disfigure your code',
    })
    .option('force', {
      alias: 'f',
      describe: 'Irreversibly overwrite the output file even it exists',
      type:'boolean'
    })
    .demandCommand()
    .wrap(90)
    .help()
    .parse();

  let {
    _: command,
    force: force,
    input,
    output
  } = argv

  command = command.shift();

  return {command, force, input, output}
}