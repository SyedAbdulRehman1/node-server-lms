"use strict";
function validateRegisterDto(dto) {
    const errors = [];
    if (!dto.email || !/\S+@\S+\.\S+/.test(dto.email)) {
        errors.push("Invalid email");
    }
    if (!dto.password || dto.password.length < 6) {
        errors.push("Password must be at least 6 characters long");
    }
    return errors;
}
