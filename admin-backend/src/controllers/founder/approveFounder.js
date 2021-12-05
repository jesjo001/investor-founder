import { nanoid } from 'nanoid'
import bcrypt from 'bcryptjs';
import User from '../../model/user'
import { emailTemplates } from '../../utils/email-templates/emails';
import { sendMail } from '../../utils/mail';
const crypto = require('crypto');
import Founders from '../../model/founders'
import FounderTemp from '../../model/pendingFounder'



export const approveFounder = async (req, res) => {

    if (!req.params) {
        return res.status(409).json({ message: 'Invalid query parameters' });
    }

    //destructure the req params
    const { id } = req.params;

    try {

        const unapprovedFounder = await FounderTemp.findOne({ _id: id })

        //Check if founder exists or not
        if (!unapprovedFounder)
            return res.status(404).json({
                status: 404,
                message: 'This Founder does not exist!! '
            })

        //Check if founder is approved
        if (unapprovedFounder.isApproved)
            return res.status(409).json({
                status: 409,
                message: 'Founder has been previously approved'
            })

        //Generate Password
        const password = nanoid()
        let hashed = await bcrypt.hash(password, 8);

        //move unapprovedFounder founder to approved collection

        const {
            email,
            startupName,
            established,
            website,
            companyEmail,
            role,
            expertise,
            industryType,
            num0fCoFounders,
            problemStatement,
            companySolution,
            whyOurCompany,
            myCompetitors,
            fundAllocation,
            milestones,
            fullName,
        } = unapprovedFounder;


        const approvedFounder = {
            email,
            startupName,
            established,
            website,
            companyEmail,
            role,
            expertise,
            industryType,
            num0fCoFounders,
            problemStatement,
            companySolution,
            whyOurCompany,
            myCompetitors,
            fundAllocation,
            milestones,
            name: fullName,
            coolInfo: unapprovedFounder.aboutUs,
            officeAddress: unapprovedFounder.companyAddress,
            stage: unapprovedFounder.companyStage,
            ticketRaised: unapprovedFounder.amountRaised,
            ticketToRaise: unapprovedFounder.amountToRaise,
            deckLink: unapprovedFounder.pitchDeckLink,
            refererType: 'Founder',
            password: hashed,
            approvedBy: req.user.id
        }

        const exist = await Founders.findOne({ email: approvedFounder.email })
        if (exist) return res.status(500).json({ status: 500, message: `user with email: ${email} already exists as a founder` })

        const founder = await Founders.create({ ...approvedFounder })

        //if founder was successfully moved to approved collection, 
        // then update the state in pending founders collection
        if (founder) {
            //   generate a random token for the client
            const generatedToken = crypto.randomBytes(32);

            //   check for error
            if (!generatedToken) {
                return res.status(500).json({
                    message: 'An error occurred. Please try again later.',
                    status: 500,
                });
            }

            //   converting the token to a hexstring
            const convertTokenToHexString = generatedToken.toString('hex');
            //  set the token and expiring period for the token to the user schema
            const updateUser = {};

            updateUser.resetToken = convertTokenToHexString;
            updateUser.expireToken = Date.now() + 5400000;

            const saveToken = await User.findOneAndUpdate(
                { _id: founder._id },
                { ...updateUser },
                { new: true }
            );

            if (!saveToken) {
                return res.status(500).json({
                    status: 500,
                    message: 'An error occurred while trying to save the token',
                });
            }

            const resetPasswordUrl = `${process.env.NODE_ENV === 'development'
                    ? process.env.FRONTEND_URL_DEV
                    : process.env.FRONTEND_URL_PROD
                }/reset-password/${saveToken.email}/${saveToken.resetToken}`

            //send mail to founder
            // mailData({ receiverEmail: email, subject, text, htlmData });
            const templateId = emailTemplates.FOUNDER_APPROVAL_EMAIL;

            const dynamicTemplateData = {
                subject: 'Welcome to Muon Club',
                password: `${password}`,
                passwordResetUrl: `${resetPasswordUrl}`,
            };

            const subject = 'Welcome to Muon';
            sendMail(founder.email, subject, templateId, dynamicTemplateData)
            //approve pending founder
            const approved = await FounderTemp.findOneAndUpdate({ _id: id }, { $set: { isApproved: true } }, { new: true });

            if (approved.isApproved) return res.status(200).json({
                status: 200,
                message: 'Founder has Been Approved.',
                founder: approved
            })
        }

        return res.status(500).json({
            status: 500,
            message: "Server Error, Please try again later."
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({  message: 'Server Error, Please try again later' });
    }

}