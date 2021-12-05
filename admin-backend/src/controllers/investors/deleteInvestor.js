import Investors from '../../model/investors'


export const deleteInvestors = async ( req, res ) => {

    try{
        const investor = await Investors.findByIdAndDelete(req.params.id)
        if(!investor) return res.status(404).send('Investor not found');
        return res.status(200).send(investor)

    } catch( e ){
        console.log(e);
        return res.status(500).send("Something went wrong")
    }
}
