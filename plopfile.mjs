export default function (plop) {
    // create your generators here
    plop.setGenerator('basics', {
        description: 'application controller logic',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'Add a name for this new component please',
            validate: (input) => {
                if (!input || input === '') return 'The name cannot be empty'
                // TODO: add more validation like not accepting numbers
                return true
            }
        }],
        actions: (input) => {
            input.name = plop.getHelper('pascalCase')(input.name)
            return [{
                type: 'addMany',
                destination: 'src/components/{{name}}/',
                templateFiles: '.plopfile/*.hbs'
            }]
        }
    });
};