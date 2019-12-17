const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.props = {};
  }

  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'title',
        message:
          'Enter a title (ie. Data Table) - A user-friendly title displayed in the documentation'
      }
    ])
      .then(answers => {
        this.props.title = answers.title;

        return this.prompt([
          {
            type: 'input',
            name: 'name',
            message: "Enter a component name - Used for filenames and React's displayName",
            default: this.props.title.replace(/\s/, '')
          }
        ]);
      })
      .then(answers => {
        this.props.name = answers.name;

        return this.prompt([
          {
            type: 'input',
            name: 'slug',
            message: 'Enter a slug - Used for the CSS class name and the documentation URL',
            default: this.props.name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
          },
          {
            type: 'confirm',
            name: 'react',
            message: 'Generate React files too? - this will create a .jsx starter file',
            default: true
          }
        ]);
      })
      .then(answers => {
        this.props.slug = answers.slug;
        this.props.react = answers.react;

        return this.prompt([
          {
            type: 'input',
            name: 'package',
            message: 'Enter the package the component should be added to',
            default: 'core'
          }
        ]);
      })
      .then(answers => {
        this.props.package = answers.package;
      });
  }

  writing() {
    const dir = `packages/${this.props.package}/src/components/${this.props.name}/`;

    this.fs.copyTpl(
      this.templatePath('index.example.html'),
      this.destinationPath(`${dir}${this.props.name}.example.html`),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('index.scss'),
      this.destinationPath(`${dir}${this.props.name}.scss`),
      this.props
    );

    if (this.props.react) {
      this.fs.copyTpl(this.templatePath('**/*.jsx'), this.destinationPath(dir), this.props);

      ['', '.example', '.test'].forEach(prefix => {
        this.fs.move(
          this.destinationPath(`${dir}index${prefix}.jsx`),
          this.destinationPath(`${dir}${this.props.name}${prefix}.jsx`)
        );
      });
    }
  }
};
