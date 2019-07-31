const UserResolver = require('../graphql/resolvers/User') 
const hook = (data,res) => {
	console.log('recivehook')
	console.log(data)
	if(data.data.object === 'charge'){
		console.log(data.data.status)
		let status = ""
		if (data.data.status === "successful") status = "successful"
		var params = {paymentId:data.data.id,status:status,id:data.data.metadata.order_id}
        UserResolver.updateCharge(params,res)
        //return res.status(200).send('ok');
	}
	else{
		res.status(401).json({error: 'Please provide an user'});
	}
    
}

module.exports = hook;