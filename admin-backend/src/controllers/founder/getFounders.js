import Founders from '../../model/founders'


export const getFounders = async (req, res) => {

    try {
        // get pagination parameters from query
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 100;
        const skipIndex = (page - 1) * limit;

        const count = await Founders.countDocuments({})

        const aggregateFound = await Founders.aggregate([
            { $match: { role: "Founder" } },
            { $limit: limit },
            { $skip: skipIndex },
            {
                "$lookup": {
                    "from": "subscriptions",
                    "localField": "_id",
                    "foreignField": "userId",
                    "as": "Subscription"
                }
            },
            {
                $project: {
                    "userId": 1, "planId": 1, "name": 1, "email": 1,
                    "industryType": 1, "established": 1, "officeAddress": 1,
                    "coolInfo": 1, "stage": 1, "ticketRaised": 1,
                    "ticketToRaise": 1, "deckLink": 1, "website": 1,
                    "companyEmail": 1, "problemStatement": 1, "companySolution": 1,
                    "whyOurCompany": 1, "myCompetitors": 1, "fundAllocation": 1,
                    "milestones": 1,  "num0fCoFounders": 1, "plan": 1,
                    "approvedBy": 1, "refererType": 1, "referred": 1,
                    "email": 1, "password": 1, "role": 1,
                    "createdAt": 1, "updatedAt": 1, "subscriptionId": "$Subscription.planId",                    
                }
            },
            {
                "$lookup": {
                    "from": "paymentplans",
                    "localField": "subscriptionId",
                    "foreignField": "_id",
                    "as": "paymentPlan"
                },
            },
            { "$addFields": { "planName": "$paymentPlan.package" } },
            {
                $project: {
                    "userId": 1, "planId": 1, "name": 1, "email": 1,
                    "industryType": 1, "established": 1, "officeAddress": 1,
                    "coolInfo": 1, "stage": 1, "ticketRaised": 1,
                    "ticketToRaise": 1, "deckLink": 1, "website": 1,
                    "companyEmail": 1, "problemStatement": 1, "companySolution": 1,
                    "whyOurCompany": 1, "myCompetitors": 1, "fundAllocation": 1,
                    "milestones": 1, "num0fCoFounders": 1, "plan": 1,
                    "approvedBy": 1, "refererType": 1, "referred": 1,
                    "email": 1, "password": 1, "role": 1,
                    "createdAt": 1, "updatedAt": 1, "subscriptionId": 1,
                    "planName": 1, 
                }
            },
        ])

        console.log(aggregateFound)

        //Return founders if they exist else return message
        if (!aggregateFound.length) return res.status(404).json({ status: 404, message: 'Founders not found' });
        else return res.status(200).json({
            count,
            founders: aggregateFound,
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({ status: 500, message: "Something went wrong" })
    }
}