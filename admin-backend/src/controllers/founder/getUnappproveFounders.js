import FounderTemp from '../../model/pendingFounder'


export const getUnapproved = async ( req, res ) => {

    try{
        // get query params from request or set default
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 100;
        const skipIndex = (page -1) * limit;

        const count = await FounderTemp.countDocuments({isApproved: false, state : { $ne: "Denied" } })

        //fetch pending founders from db
        const pendingFounders = await FounderTemp.find({ isApproved: false, state : { $ne: "Denied" } })
        .sort({ createdAt: -1 })
        .select('-password')
        .limit(limit)
        .skip(skipIndex)
        .exec();

        //if no pending founders return error message else return pending founders
        if(!pendingFounders.length) return res.status(404).json({ status: 404, message: 'Oops seems there are no Unapproved Founder'});
        else return res.status(200).json({ status:200, count , pendingFounders})

    } catch( e ){
        console.log(e);
        return res.status(500).json({statusCode: 500, message: "Something went wrong"})
    }
}