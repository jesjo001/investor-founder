import mongoose from 'mongoose';
import {
    INDUSTRY_TYPE,
    TICKET_SIZE,
    FOUNDER_STAGE,
    PENDING_FOUNDER_STATE
} from '../utils/constants.js';

const founderSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
        },
        email: {
            type: String,
        },
        startUpName: {
            type: String,
        },
        established: {
            type: Date,
        },
        aboutUs: {
            type: String,
        },
        website: {
            type: String,
        },
        companyEmail: {
            type: String,
            unique: true,
        },
        companyAddress: {
            type: String,
        },
        numOfCoFounders: {
            type: Number,
        },
        companyStage: {
            type: String,
            enum: FOUNDER_STAGE,
        },
        state: {
            type: String,
            enum: PENDING_FOUNDER_STATE,
        },
        industryType: {
            type: String,
            enum: INDUSTRY_TYPE,
        },
        problemStatement: {
            type: String
        },
        companySolution: {
            type: String
        },
        whyOurCompany: {
            type: String
        },
        source: {
            type: String
        },
        myCompetitors: {
            type: String
        },
        burnRate: {
            type: String
        },
        madeProfit: {
            type: String
        },
        amountRaised: {
            type: String,
            enum: TICKET_SIZE,
        },
        amountToRaise: {
            type: String,
            enum: TICKET_SIZE,
        },
        fundAllocation: {
            type: String
        },
        isApproved: {
            type: Boolean,
            default: false,
        },
        milestones: {
            type: String
        },
        pitchDeckLink: {
            type: String
        }
    },{ timestamps: true }
);

const FounderTemp =  mongoose.model('FounderTemp', founderSchema);
export default FounderTemp;
