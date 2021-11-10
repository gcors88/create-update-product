
module.exports.handle = (event, context, callback) => {
    console.log('-------------Create Product-----------')
    const payload = event;
    if(payload.index === -1 ) {
        payload.products.push({
            id: payload.products[payload.products.length-1].id + 1,
            name: payload.name,
            price: payload.price 
        });

        callback(null, payload);
    }
}