const AWS = require('aws-sdk')
const SES = new AWS.SES()

module.exports.handle = async (event, context, callback) => {
    console.log('------------------SEND EMAIL---------------------')
    console.log(event)
    
    const payload = event[0] ? event[0] : event[1]
    let productsNormalize = '';
    let body = '';

    payload.products.map(product => {
        productsNormalize += `
            <p> Id do produto: ${ product.id } </p>
            <p> Nome do produto: ${product.name} </p>
            <p> Preço do produto: ${product.price} </p>
            <p> --------------------------------------------------- </p>
        `
    });

    console.log('-------------------- Payload -----------------')
    console.log(payload)
    if( payload.index === -1 ) {
        console.log('CREATE BODY')
        body = `
            <h1> Produto criado com sucesso! </h1>
            <h3> Segue informações de cadastro: </h3>
            <p> Id do produto: ${ payload.products[payload.products.length-1].id } </p>
            <p> Nome do produto: ${payload.name} </p>
            <p> Preço do produto: ${payload.price} </p>
            <h3>Lista de Produtos:</h3>
            ${productsNormalize}
        `
    } else {
        body = `
            <h1> O produto ja existia e foi alterado com sucesso! </h1>
            <h3> Segue informações de cadastro: </h3>
            <p> Id do produto: ${ payload.products[payload.index].id } </p>
            <p> Nome do produto: ${payload.name} </p>
            <p> Preço do produto: ${payload.price} </p>
            <h3>Lista de Produtos:</h3>
            ${productsNormalize}
        `
    }

    const params = {
        Destination: {
            ToAddresses: [payload.to.toLowerCase()],
        },
        Message: {
            Body: {
            Html: {
                Charset: 'UTF-8',
                Data: `<html>
                            <body>
                                ${body}
                            </body>
                        </html>
                `,
            },
            },
            Subject: {
            Data: `Produto ${payload.name} criado com sucesso!`,
            },
        },
        Source: `glauber17230@gmail.com`,
    };

    await SES.sendEmail(params).promise();
    callback(null, null);
}