function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports.getComponentName = (name)=>{
    const newName = name.split('-').map(namePart=>{
        return capitalizeFirstLetter(namePart)
    }).join('')

    return newName
}


module.exports.getFunctionalComponent = (newName,hooks)=> {

    const component = `import React from 'react';
${hooks?"import { use${newName} } from './use${newName}":''}
    
const ${newName} = ()=>{
    ${hooks? `const hooks = use${newName}()`:''}
    return <>${newName}</>
}

export default ${newName}`;

    return component
}

module.exports.getFunctionalComponentCustomHook = (name)=>{
    const component = `export const ${name} = ()=>{
    return {}
}`

    return component
}