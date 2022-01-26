const { callStepFunction } = require('./helpers/helpers');

module.exports.handle = async (event, context, callback) => {
    console.log('--------------Process Notification-----------------');
    // Test 123
    const snsRecord = event.Records[0];
    const { Sns: { Message } } = snsRecord;

    console.log(Message);

    await callStepFunction({
        stateMachineArn: 'arn:aws:states:us-east-2:268769556228:stateMachine:CreateUpdateProduct',
        input: Message
    });

    callback(null, 'Sucess!');
}
