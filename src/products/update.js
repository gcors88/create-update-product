
module.exports.handle = (event, context, callback) => {
    console.log('-------------Create Product-----------')
    const payload = event;
    if(payload.index !== -1 ) {
        payload.products[payload.index].name = payload.name
        payload.products[payload.index].price = payload.price

        callback(null, payload);
    }
}