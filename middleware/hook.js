const UserResolver = require('../graphql/resolvers/User') 
const hook = (data) => {
	console.log('recivehook')
	console.log(data)
	if(data.data.object === 'charge'){
		console.log(data.data.status)
		var params = {paymentId:data.data.id,status:data.data.status}
        UserResolver.updateOrder(params)
        return res.status(200).send('ok');
    }
    res.status(401).json({error: 'Please provide an user'});
}

module.exports = hook;