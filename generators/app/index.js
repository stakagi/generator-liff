var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // Prompt to user for required input.
    prompting() {
        var prompts = [];

        if (this.framework === undefined) {
            prompts.push({
                type: 'list',
                name: 'framework',
                message: 'Select framework',
                choices: ['vuetify'],
                default: 'vuetify'
            });
        }

        return this.prompt(prompts).then((answers) => {
            if (answers.framework !== undefined) {
                this.framework = answers.framework
            }
        });
    }

    // constructor
    constructor(args, opts) {
        super(args, opts);

        // supported arguments. Nothing mandatory at this point
        this.argument('appname', { type: String, required: true, description: "Specify your application name" });

        // options for language.
        this.option('vuetify', { desc: 'Vuetify', require: false, description: "Use vuetify as framework" });

        // Set framework depending on option
        if (this.options.vuetify) {
            this.framework = "vuetify";
        }

        // Set other local variables.
        if (this.options.appname) {
            this.appname = this.options.appname;
        }
    }

    // Scaffolding
    writing() {
        if (this.framework === "vuetify") {
            this.fs.copy(
                this.templatePath('vuetify/**/*'),
                this.destinationPath(`${this.appname}`)
            );
        }
    }

    // Install dependencies
    install() {
    }
};

Generator.prototype.welcome