"use client";
import React from "react";

export default function Button({ text, className, onClick, ...props }) {
    return (
        <button {...props} className={className} onClick={onClick}>
            {text}
        </button>
    );
}
