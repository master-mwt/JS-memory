let memory = function (tableDimension) {

    console.log('Hello from memory.js');

    console.log('Table dim: ' + tableDimension);

    let context = document.getElementById('context');
    context.addEventListener('click',function () {
        console.log('Click on context');
    },false);

};

export default memory;