import Investors from '../../model/investors'


export const getInvestors = async ( req, res ) => {
    try{
        const count = await Investors.countDocuments({})
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 100;
        const skipIndex = (page -1) * limit;

        const investors = await Investors.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skipIndex)
        .exec();

        if(!investors.length) return res.status(404).send('Investors not found');
        else return res.status(200).json({ status: 200, investors, count, message: 'Success'})

    } catch( e ){
        console.log(e);
        return res.status(500).send("Something went wrong")
    }
}
