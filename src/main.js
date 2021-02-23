import { Command } from 'commander';

const program = new Command();

const genDiff = () => {
  program
    .version('0.0.1')
    .arguments('<filepath1> <filepath2>')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format');

  program.parse();
};

export default genDiff;
