import Events from '../model/events';
import { Notification } from '../model/notification';
import User from '../model/adminUsers';
import {emailTemplates} from "../utils/email-templates/emails";
import { sendMail } from '../utils/mail';

/**
 * Class for Admin/Employee related operations such View Events, Create Event and others
 */

class eventController {

    static async createEvents(req, res) {
        //  props from req.body
        const {
            name,
            desc,
            availability,
            registrationLink,
            videoLink,
            category,
            to,
            from,
            hostName,
            specialization,
            workPlace,
            country,
            state,
            venue,
        } = req.body;

        try {
            // create new events
            const data = {
                avatar: req.file.location,
                avatarAwsDetails: req.file,
            };
            const newEvent = await Events.create({
                name,
                desc,
                availability,
                createdBy: req.user.id,
                category,
                date: {from, to,},
                registrationLink,
                videoLink,
                hosts: { hostName, specialization, workPlace,},
                address: { country, state, venue,},
                resource: { image: data.avatar, avatarAwsDetails: data.avatarAwsDetails
                },
            });

            // get sender role , name and id
            const getSendersRoleAndName = await User.findOne({ _id: req.user.id }, [
                'role',
                'name',
                '_id',
            ]);
            //message to sent to the users mail
            const message = `A new Event have been posted on your muonClub account by muonClub team
    check the event <a href='https://muon.club/event/${newEvent._id}'/></a>  for details and other notice.`;


            // find users that are inactive to send them a mail
            const inActiveUser = await User.find({ isActive: false }, ['_id', 'email']);

            const templateId = emailTemplates.DYNAMIC_TEMPLATE;
            const dynamicTemplateData = {
                dynamicBody: message,
            };

            inActiveUser.forEach(async ({ email }) => {
                await sendMail(
                    email,
                    'New Event Notification',
                    templateId,
                    dynamicTemplateData
                );
            });

            // create new notification
            await Notification.create({
                sender: {
                    Id: req.user._id,
                    fullName: req.user.name,
                    role: req.user.role,
                },
                receiverId: 'all',
                message: message,
                type: 'EVENT_NOTIFICATION',
                mailed: true,
            });

            // send a success message to the client
            return res.status(200).json({
                message: 'You have successfully created an event.',
                success: true,
            });
        } catch (e) {
        // watch errors
        return res.status(500).json({ status: 500, message: "Server Error, Try again later.."});
    }}


    static async getEvents(req, res) {

        try {
            //set Pagination Parameters
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 100;
                const skipIndex = (page -1) * limit;
                const count = await Events.countDocuments({})
                // Get all Events
                const getAllEvent = await Events.find()
                    .sort({ createdAt: -1 })
                    .limit(limit)
                    .skip(skipIndex)
                    .exec();
                // send a success message to the client
                return res.status(200).json(
                    {
                        status: 200,
                        count,
                        getAllEvent
                    }
                );
        } catch (e) {
            // watch errors
            return res.status(500).json({ status: 500, message: "Server Error, Try again later.."});
        }}

    static async getOneEvents(req, res) {
            const { id } = req.params
            try {
                //find One Event by id
                const Event = await Events.findOne({_id: id})
                if(!Event) return res.status(404).json({status: 404, message: "Invalid Blog"})
                // send a success message to the client
                return res.status(200).json(
                    {
                        status: 200,
                        Event
                    }
                );
        } catch (e) {
            // watch errors
            return res.status(500).json({ status: 500, message: "Server Error, Try again later.."});
        }}

    static async deleteEvents(req, res) {
        try {
            const investor = await Events.findByIdAndDelete(req.params.id)
            if(!investor) return res.status(404).send('Event not found');
            return res.status(200).json({
                "status": 200,
                'message': "Event deleted successfully"
            })
        } catch (e) {
            return res.status(500).json({ status: 500, message: "Server Error, Try again later.."});
        }
    }
}

export default eventController;

