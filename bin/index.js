#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');
const {getFunctionalComponent,getComponentName,getFunctionalComponentCustomHook} = require('./getComponents')

let componentName;

const program = require('commander')
    .version('0.1.6')
    .arguments('<component-directory>')
    .action( (name)=> {
        componentName = name;
    })
    .option('-h, --hooks', 'Create Function with hooks')
    // eslint-disable-next-line no-undef
    .parse(process.argv)

createComponent(componentName);

function createComponent(name) {
    const root = path.resolve(name);
    const options = program._optionValues

    if (!fs.existsSync(root)) {
        fs.mkdirSync(root);
    }

    const componentName = getComponentName(name);

    fs.writeFileSync(
        path.join(root, `${componentName}.jsx`),
        getFunctionalComponent(componentName,options.hooks)
    )
    if(options.hooks){
        fs.writeFileSync(
            path.join(root, `use${componentName}.js`),
            getFunctionalComponentCustomHook(`use${componentName}`)
        )
    }


}