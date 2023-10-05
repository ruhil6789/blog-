import { Request,Response,NextFunction } from "express";

export const RESPONSES = {
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NOCONTENT: 204,
    BADREQUEST: 400,
    UN_AUTHORIZED: 401,
    INVALID_REQ: 422,
    FORBIDDEN: 403,
    NOTFOUND: 404,
    TIMEOUT: 408,
    TOOMANYREQ: 429,
    INTERNALSERVER: 500,
    BADGATEWAYS: 502,
    SERVICEUNAVILABLE: 503,
    GATEWAYTIMEOUT: 504,
};

export const RES_MSG = {
    USER: {
        CREATED: "User Created Successfully",
        UPDATED: "User Updated Successfully",
        ALREADY: "User Already Exist",
    },
    NO_DATA: "No data found",
    BADREQUEST: "Bad Request",
    INTERNAL_SERVER_ERROR: "Internal Server Error",
    TXN: {
        GET_ERROR: "Error while fetching token transactions list",
        GET_SUCCESS: "Transaction list fetched successfully",
        TOKEN_TOTAL_ERROR: "Unable to fetch details, Something went wrong",
    },
    EMAIL: {
        SUCCESS: "Email send successfully, will get in touch soon.",
        SUBSCRIBE_SUCCESS: "Thank you for subscribing.",
        ERROR: "Something went wrong, please try again later",
    },
    NOMICS: {
        NOT_FOUND: "Something went wrong, please try again later",
        GET_PRICE_ERROR: "Error while fetching token price from nomics service",
        GET_PRICE_SUCCESS: "Token price fetched successfully",
    },
    REGISTER: {
        SUCCESS: "User Registered Successfully, Please Verify your email now",
        AGAINSUCCESS:
            "Please Verify your email using the link send to your registered email",
        NOUSER: "No user found",
        ALREADY: "Already Registered",
        ALREADYEMAIL:
            "This email is already registered with another wallet, Please connect with different wallet",
        ALREADYWALLET: "Wallet Address already Registered with different email",
    },
    ADMIN: {
        SUCCESS: "Admin Registered Successfully , Please Login to continue",
        DUPLICATE: "Already Registered",
        LOGIN: "Admin login Successfully.",
    },
    LOGIN: {
        SUCCESS: "User login Successfully",
        ADMIN_SUCCESS: "User login Successfully",
        INVALIDUSER: "Invalid User",
        INVALID_EMAIL: "Email not recognised, please try another Email address",
        INVALID_WALLET:
            "Wallet Address not recognised, please try another Wallet Address",
        EMAILVERIFY: "Your Email has not been verified , Please verify your Email",
        INVALIPASSWORD: "Invalid Password",
        EMAIL_VERIFY_FIRST: "Please verify your email first",
    },
    SUCCESS_MESSAGE: "Success",
    STACK_ERROR: "Something went wrong",
    INVALID_ADDRESS: "Invalid Address",
    INVALID_CLAIM: "Cannot Claim at the moment, Please try again Later",
    REWARDS_UPDATED: "Rewards Updated",
    PASSWORD_CHANGES: "Password successfully changed",
    PASSWORD_ERROR: "Incorrect Password",
    LOG_OUT: "successfully Log Out",
    CLAIM_TOKEN: "Claim Done, will be notified soon",
    JWTERROR: "Unauthorize Request",
    INVALID_LINK: "The link is invalid",
    VERIFY_EMAIL: "Please Verify your account using link send to mail",
    EMAIL_VERIFY_SUCCESS: "Your email has been verified successfully!",
    ERROR_WRONG: "Something went wrong , Please try again.",
    USER_NOT_FOUND: "User not found.",
    ALREADY_VERIFIED: "Already Verified",
    VERIFY_EMAIL_NOT: "Email not verified , Please verify your email.",
    ADMIN_ALREADY: "Admin Already logged in",
    ALREADY_SUBSCRIBED: "Already Subscribed",
    AGENT_CREATE: "Agent Created Successfully",
    AGENT_UPDATE: "Agent Updated Successfully",
    AGENT_ALREADY_CREATE: "Agent already Created",
    TOKEN: {
        ALREADY: "Token is already Added",
        ALREADYSUBSCRIBED: "Investor already subscribed to this token",
        SUBSCRIBEDSUCCESS: "Token Subscribed Successsfully",
        SUCCESS: "Token added Successfully",
        UPDATE: "Token updated Successfully",
    },
    INVESTOR: {
        APPROVED: "Investor Approved Successfully",
        ALREADY_APPROVED: "Investor already approved for this token",
        WHITELIST: "Investor Whitelisted Successfully",
        ALREADY_WHITELISTED: "Investor already whitelisted for this token",
    },
    DATA_SUCCESS: "Data fetched successfully",
    VERIFIED: "successfully verified",
    INVALIDTOKEN: "Invalid token",
    ISSUERUPDATE: "Details updated",
    REQUEST_UPDATE: "Thank you for your request .",
    AGENT: {
        ALREADY: "Tokenization agent already exist",
        REP_ALREADY: "Tokenization agent already exist",
        CREATED: "Agent created successfully",
        UPDATED: "Agent status updated successfully",
    },
    ORDER: {
        SUCCESS: "Order created successfully",
        UPDATED: "Order updated successfully",
        ERROR: "Error in order creating"
    },
    REPRESENTATIVES: {
        ALREADY: "Representative already exist",
    },
    WALLET: {
        WALLET_WHITELIST: "wallet whiteListed",
    },
};


export default function errorHandler(
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {
    const errors = err.errors || [{ message: err.message }];
    res.status(err.status || 500).json({ errors });
}
