const express = require('express');
const Errors = require('../Constants/Errors');
const { validationResult } = require('express-validator');

module.exports = (view , options = {}) =>{
    return async (req , res , next) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            return next();
        }
        
        const errorCode = await errors.array()[0].msg;
        const knowError = await Object.values(Errors).find(
            err => err.code === errorCode
        );

        if (knowError) {
            return res.status(knowError.status).render(view , {
                message : knowError.message , 
                ...options
            });
        }

        return res.status(Errors.VALIDATION_ERROR.status).render(view , {
            message : Errors.VALIDATION_ERROR.message , 
            ...options
        });
    };
};
    