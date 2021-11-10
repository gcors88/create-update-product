const products = [
    { id: 1, name: 'Colher', price: '2,55' },
    { id: 2, name: 'Urso de Pelúcia', price: '35,00' },
    { id: 3, name: 'Jarra de água', price: '10,00' }
];

module.exports.handle = (event, context, callback) => {
    console.log('------------Check Exists--------------');

    const index = products.findIndex(product => product.name === event.name)

    callback(null, Object.assign(event,{
        index,
        products
    }))
}