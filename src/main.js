import { Command } from 'commander';

const genDiff = () => {
  const program = new Command();
  program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.');

  program.parse();
};

export default genDiff;
