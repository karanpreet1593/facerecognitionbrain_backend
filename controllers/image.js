
const clarifai = require('clarifai');
const app = new Clarifai.App({
 apiKey: '1c4d5de79c1345888636a9d5f6482257'
});
const handleApiCall =(req,res)=>{
	app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      req.body.input)
    .then(data=> {
    	res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImagePut = (req,res,db)=>{
	const {id}= req.body;
	db('users').where('id', '=', id)
	.increment('enteries',1)
	.returning('enteries')
	.then(enteries =>{
		res.json(enteries[0]);
	})
	.catch(err => res.status(400).json('unable to get enteries'))
}
module.exports={
	handleImagePut:handleImagePut,
	handleApiCall:handleApiCall
}